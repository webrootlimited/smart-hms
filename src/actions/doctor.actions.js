
"use server";
import User from "@/models/user.model";
import Doctor from "@/models/doctor.model";
import Clinic from "@/models/clinic.model";
import connectToDb from "@/lib/connectToDb";
import bcrypt from "bcryptjs";
import Appointment from "@/models/appointment.model";
import { generateSlots } from "@/lib/utils";
import { generateEmployeeId } from "@/lib/utils";
import { uploadImage } from "@/lib/utils";

// Get all doctors
export async function getDoctors() {
    try {
        await connectToDb();
        const doctors = await User.find({ role: "doctor" }).populate("doctorProfile");
        console.log(doctors);

        return { success: true, doctors: JSON.parse(JSON.stringify(doctors)) };
    } catch (err) {
        console.error("❌ Get doctors error:", err);
        return { success: false, message: err.message || "Failed to get doctors" };
    }
}

// Get telehalth enabled doctors
export async function getOnlineDoctors() {
    try {
        await connectToDb();
        const doctors = await User.aggregate([
            { $match: { role: "doctor" } },
            {
                $lookup: {
                    from: "doctorprofiles", // make sure collection name is correct
                    localField: "doctorProfile",
                    foreignField: "_id",
                    as: "doctorProfile"
                }
            },
            { $unwind: "$doctorProfile" },
            { $match: { "doctorProfile.telehealthEnabled": true } }
        ]);

        console.log(doctors);


        return { success: true, doctors: JSON.parse(JSON.stringify(doctors)) };
    } catch (err) {
        console.error("❌ Get doctors error:", err);
        return { success: false, message: err.message || "Failed to get doctors" };
    }
}

//  Create basic personal information (creates the doctor/user document) - by admin
export async function saveDoctorPersonalInfo(data) {
    try {
        await connectToDb();
        console.log("data", data);
        const {
            fullName,
            email,
            phoneNumber,
            password,
            dob = null,
            gender = null,
            profilePic = null,
        } = data;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePicUrl = null;
        if (profilePic) {
            profilePicUrl = await uploadImage(profilePic);
        }

        const employeeId = generateEmployeeId("doctor");
        console.log("employeeId", employeeId);

        const doctorProfile = await Doctor.create({
            employeeId,
        });

        // Create main User document with doctor role
        const user = await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            dob,
            status: "pending",
            gender: gender ? gender.toLowerCase() : null,
            profilePic: profilePicUrl,
            role: "doctor",
            doctorProfile: doctorProfile._id,
        });

        return {
            success: true,
            userId: user._id.toString(),
            doctorId: doctorProfile._id.toString(),
            message: "Doctor personal information saved successfully",
        };
    } catch (error) {
        console.error("❌ Create doctor personal error:", error);
        return {
            success: false,
            message: error.message || "Failed to save doctor personal information",
        };
    }
}

export async function updateDoctorPersonalInfo(id, data) {
    try {
        await connectToDb();

        const {
            fullName,
            email,
            phoneNumber,
            password,
            dob = null,
            gender = null,
            profilePic = null,
            address,
            emergencyContact,
            bio,

            // Doctor fields
            yearsOfExperience,
            specialities,
            startDate,
            employmentStatus,
        } = data;

        // 1. Find user
        const user = await User.findById(id);
        if (!user) throw new Error("Doctor not found");
        if (user.role !== "doctor") throw new Error("This user is not a doctor");

        // 2. Find doctor profile 
        const doctor = await Doctor.findById(user.doctorProfile);
        if (!doctor) throw new Error("Doctor profile not found");

        // 3. Email uniqueness
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                throw new Error("Email already registered by another user");
            }
        }

        /* ---------------- USER UPDATE ---------------- */
        const userUpdateFields = {};

        if (fullName) userUpdateFields.fullName = fullName;
        if (email) userUpdateFields.email = email;
        if (phoneNumber) userUpdateFields.phoneNumber = phoneNumber;
        if (dob !== null) userUpdateFields.dob = dob;
        if (gender) userUpdateFields.gender = gender.toLowerCase();
        if (address !== undefined) userUpdateFields.address = address;
        if (emergencyContact !== undefined) userUpdateFields.emergencyContact = emergencyContact;

        if (password) {
            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters");
            }
            userUpdateFields.password = await bcrypt.hash(password, 12);
        }

        if (profilePic) {
            userUpdateFields.profilePic = await uploadImage(profilePic);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: userUpdateFields },
            { new: true, runValidators: true }
        );

        /* ---------------- DOCTOR UPDATE ---------------- */
        const doctorUpdateFields = {};

        if (yearsOfExperience !== undefined) {
            doctorUpdateFields.yearsOfExperience = yearsOfExperience;
        }

        if (specialities !== undefined) {
            doctorUpdateFields.specialities = Array.isArray(specialities)
                ? specialities
                : specialities.split(",").map(s => s.trim()).filter(Boolean);
        }
        if (bio !== undefined) doctorUpdateFields.bio = bio;
        if (startDate !== undefined) doctorUpdateFields.startDate = startDate;
        if (employmentStatus !== undefined) doctorUpdateFields.employmentStatus = employmentStatus;

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctor._id,
            { $set: doctorUpdateFields },
            { new: true, runValidators: true }
        );

        return {
            success: true,
            message: "Doctor information updated successfully",
        };

    } catch (error) {
        console.error("❌ Update doctor error:", error);
        return {
            success: false,
            message: error.message || "Failed to update doctor information",
        };
    }
}

// Update schedule with work locations
export async function updateDoctorWorkSetup(id, data) {
    try {
        await connectToDb();

        if (!id) throw new Error("User ID is required");
        if (!data || typeof data !== "object") {
            throw new Error("Invalid work setup data");
        }

        const user = await User.findById(id).populate("doctorProfile");
        if (!user) throw new Error("User profile not found");
        if (!user.doctorProfile) {
            throw new Error("Doctor profile not found for this user");
        }

        const {
            specialities,
            startDate,
            telehealthEnabled,
            workLocations
        } = data;

        /* ---------------- VALIDATE WORK LOCATIONS ---------------- */
        if (Array.isArray(workLocations)) {
            workLocations.forEach((loc, idx) => {
                if (!loc.clinic) {
                    throw new Error(`Clinic ID missing in work location ${idx + 1}`);
                }
                if (!loc.department) {
                    throw new Error(`Department missing in work location ${idx + 1}`);
                }
                if (!Array.isArray(loc.schedule)) {
                    throw new Error(`Schedule must be an array in work location ${idx + 1}`);
                }

                loc.schedule.forEach((day, dayIdx) => {
                    if (!day.day) {
                        throw new Error(
                            `Day missing in schedule item ${dayIdx + 1} of work location ${idx + 1}`
                        );
                    }

                    if (day.open === true) {
                        if (!day.from || !day.to) {
                            throw new Error(
                                `Start and end time required for ${day.day} in work location ${idx + 1}`
                            );
                        }
                    }
                });
            });
        }

        /* ---------------- BUILD SAFE UPDATE PAYLOAD ---------------- */
        const updatePayload = {};

        if (Array.isArray(specialities) && specialities.length > 0) {
            updatePayload.specialities = specialities;
        }

        if (startDate) {
            updatePayload.startDate = new Date(startDate);
        }

        if (typeof telehealthEnabled === "boolean") {
            updatePayload.telehealthEnabled = telehealthEnabled;
        }

        if (Array.isArray(workLocations) && workLocations.length > 0) {
            updatePayload.workLocations = workLocations;
        }

        if (Object.keys(updatePayload).length === 0) {
            throw new Error("No valid fields provided to update");
        }

        /* ---------------- UPDATE DOCTOR PROFILE ---------------- */
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            user.doctorProfile._id,
            { $set: updatePayload },
            { new: true, runValidators: true }
        );

        return {
            success: true,
            userId: user._id.toString(),
            doctorProfileId: updatedDoctor._id.toString(),
            message: "Doctor work setup updated successfully",
        };

    } catch (error) {
        console.error("❌ Update doctor work setup error:", error);
        return {
            success: false,
            message: error.message || "Failed to update doctor work setup",
        };
    }
}

// Update/upload credentials (documents)
export async function updateDoctorCredentials(id, credentials) {
    try {
        await connectToDb();
        console.log("Credentials data:", credentials);

        if (!id) throw new Error("User ID is required");
        if (!credentials || typeof credentials !== "object") throw new Error("Invalid credentials data");

        // Find the user to get doctorProfile ID
        const user = await User.findById(id).populate("doctorProfile");
        if (!user || !user.doctorProfile) throw new Error("Doctor profile not found");

        const doctorId = user.doctorProfile._id;
        const profile = await Doctor.findById(doctorId);
        if (!profile) throw new Error("Doctor profile document not found");

        // Helper function to handle file uploads
        const handleFile = async (file) => {
            if (!file) return undefined;
            return await uploadImage(file);
        };

        // Update Medical License
        if (credentials.medicalLicense) {
            const med = { ...credentials.medicalLicense };
            if (med.file) {
                med.documentUrl = await handleFile(med.file);
                delete med.file;
            }
            profile.medicalLicense = { ...profile.medicalLicense.toObject(), ...med };
        }

        // Update Certifications Array
        if (credentials.certifications && Array.isArray(credentials.certifications)) {
            const updatedCerts = await Promise.all(
                credentials.certifications.map(async (cert) => {
                    const newCert = { ...cert };
                    if (newCert.file) {
                        newCert.documentUrl = await handleFile(newCert.file);
                        delete newCert.file;
                    }
                    return newCert;
                })
            );
            profile.certifications = updatedCerts;
        }

        // Update DEA Certificate
        if (credentials.deaCertificate) {
            const dea = { ...credentials.deaCertificate };
            if (dea.file) {
                dea.documentUrl = await handleFile(dea.file);
                delete dea.file;
            }
            profile.deaCertificate = { ...profile.deaCertificate.toObject(), ...dea };
        }

        // Update Malpractice Insurance
        if (credentials.malpracticeInsuranceCertificate) {
            const malpractice = { ...credentials.malpracticeInsuranceCertificate };
            if (malpractice.file) {
                malpractice.documentUrl = await handleFile(malpractice.file);
                delete malpractice.file;
            }
            profile.malpracticeInsuranceCertificate = {
                ...profile.malpracticeInsuranceCertificate.toObject(),
                ...malpractice,
            };
        }

        // Update Digital Signature
        if (credentials.digitalSignature) {
            const signature = { ...credentials.digitalSignature };
            if (signature.file) {
                signature.documentUrl = await handleFile(signature.file);
                delete signature.file;
            }
            profile.digitalSignature = { ...profile.digitalSignature.toObject(), ...signature };
        }

        // Save doctor profile directly
        await profile.save();

        return {
            success: true,
            doctorId: profile._id.toString(),
            message: "Doctor credentials updated successfully",
        };
    } catch (error) {
        console.error("❌ Update doctor credentials error:", error);
        return {
            success: false,
            message: error.message || "Failed to update doctor credentials",
        };
    }
}

// update asssitants
export async function updateDoctorAssistants(userId, assistants = []) {
    try {
        await connectToDb();

        if (!userId) {
            throw new Error('User ID is required');
        }

        if (!Array.isArray(assistants)) {
            throw new Error('Assistants must be an array of IDs');
        }

        // 🔹 Find user
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.doctorProfile) {
            throw new Error('Doctor profile not found');
        }

        // 🔹 Update doctor assistants
        const doctor = await Doctor.findByIdAndUpdate(
            user.doctorProfile,
            { assistants: assistants },
            { new: true }
        );
        if (!doctor) {
            throw new Error('Doctor not found');
        }

        return {
            success: true,
            doctorId: doctor._id.toString(),
            assistants: JSON.parse(JSON.stringify(doctor.assistants)),
            message: 'Doctor assistants updated successfully',
        };
    } catch (error) {
        console.error('❌ Update doctor assistants error:', error);

        return {
            success: false,
            message: error.message || 'Failed to update doctor assistants',
        };
    }
}

// remove assistant
export async function deleteDoctorAssistant(userId, assistantId) {
    try {
        await connectToDb();

        if (!userId) throw new Error("User ID is required");
        if (!assistantId) throw new Error("Assistant ID is required");

        // 🔹 Find user
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        if (!user.doctorProfile) {
            throw new Error("Doctor profile not found");
        }

        // 🔹 Pull assistant from array
        const doctor = await Doctor.findByIdAndUpdate(
            user.doctorProfile,
            { $pull: { assistants: assistantId } },
            { new: true }
        );

        if (!doctor) throw new Error("Doctor not found");

        return {
            success: true,
            doctorId: doctor._id.toString(),
            assistants: JSON.parse(JSON.stringify(doctor.assistants)),
            message: "Assistant removed successfully",
        };
    } catch (error) {
        console.error("❌ Delete doctor assistant error:", error);

        return {
            success: false,
            message: error.message || "Failed to remove assistant",
        };
    }
}

export async function getDoctorDetailsWithSlots(userId) {
    try {
        await connectToDb();

        // Fetch user with doctor profile populated
        const user = await User.findById(userId)
            .populate({
                path: "doctorProfile",
                populate: [
                    { path: "workLocations.clinic", model: "Clinic" },
                    { path: "assistants", model: "User" }
                ],
            });

        if (!user || !user.doctorProfile) {
            return { success: false, message: "Doctor profile not found" };
        }

        const doctor = user.doctorProfile;
        const doctorWithSlots = JSON.parse(JSON.stringify(doctor)); // clone to modify

        // Generate slots for next 7 days
        const today = new Date();
        for (const loc of doctorWithSlots.workLocations) {
            loc.availableSlots = {}; // object keyed by date string

            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
                const dateKey = date.toDateString(); // e.g. "Mon Jan 27 2026"

                const schedule = loc.schedule.find(s => s.day === dayOfWeek);
                if (!schedule || !schedule.open) {
                    loc.availableSlots[dateKey] = [];
                    continue;
                }

                // Generate all potential slots
                let slots = generateSlots(schedule, doctor.slotDuration, date);

                // Fetch booked appointments for this doctor, clinic, and date
                const startOfDay = new Date(date);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(date);
                endOfDay.setHours(23, 59, 59, 999);

                const appointments = await Appointment.find({
                    doctorId: doctor._id,
                    clinicId: loc.clinic._id,
                    startTime: { $gte: startOfDay, $lt: endOfDay },
                    status: "booked",
                });

                // Remove booked slots
                slots = slots.filter(slot =>
                    !appointments.some(a => slot.start < a.endTime && slot.end > a.startTime)
                );

                loc.availableSlots[dateKey] = slots;
            }
        }

        return { success: true, doctor: doctorWithSlots };
    } catch (err) {
        console.error("❌ Get doctor details error:", err);
        return { success: false, message: err.message || "Failed to get doctor details" };
    }
};

