"use server";

import Clinic from "@/models/clinic.model";
import connectToDb from "@/lib/connectToDb";
import { checkSession } from "./checkSession";


// public
export async function getClinics() {
    try {
        await connectToDb();

        const clinics = await Clinic.find({});

        return { success: true, clinics: JSON.parse(JSON.stringify(clinics)) };
    } catch (error) {
        console.error("Error getting clinics:", error);
        return { success: false, message: error.message || "Server error" };
    }
}

export async function getClinicDetails(clinicId) {
    try {
        await connectToDb();

        const clinic = await Clinic.findById(clinicId);

        return { success: true, clinic: JSON.parse(JSON.stringify(clinic)) };
    } catch (error) {
        console.error("Error getting clinic details:", error);
        return { success: false, message: error.message || "Server error" };
    }
}


// protected - admin only
export async function saveClinicBasicDetails(data) {
    try {

        const {
            clinicName,
            clinicType,
            status,
            phoneNumber,
            email,
            emergencyContact,
            country,
            city,
            area,
            postalCode,
            fullAddress,
            latitude,
            longitude
        } = data;

        // Validation
        const missingFields = [];
        if (!clinicName) missingFields.push("clinicName");
        if (!clinicType) missingFields.push("clinicType");
        if (!phoneNumber) missingFields.push("phoneNumber");
        if (!email) missingFields.push("email");
        if (!city) missingFields.push("city");
        if (!area) missingFields.push("area");
        if (!fullAddress) missingFields.push("fullAddress");

        if (missingFields.length > 0) {
            return { success: false, message: "Missing required fields", missingFields };
        }

        // connect to db
        await connectToDb();

        const res = await checkSession();
        if (!res?.success || res?.user?.role !== "admin") throw new Error("Unauthorized");

        function generateClinicCode() {
            const prefix = "CLN-";
            const randomStr = Math.random().toString(36).substr(2, 6).toUpperCase();
            return prefix + randomStr;
        }

        const clinicCode = generateClinicCode(); // e.g., "CLN-8F3D1A"


        // Save clinic
        let clinic = new Clinic({
            clinicName,
            clinicCode,
            clinicType,
            status,
            phoneNumber,
            email,
            emergencyContact,
            country,
            city,
            area,
            postalCode,
            fullAddress,
            latitude,
            longitude
        });

        clinic = await clinic.save();
        console.log(clinic);


        return { success: true, clinic: JSON.parse(JSON.stringify(clinic)) };
    } catch (error) {
        console.error("Server action error:", error);
        return { success: false, message: error.message || "Server error" };
    }
}

export async function updateClinicBasicDetails(clinicId, data) {
    try {
        const {
            clinicName,
            clinicType,
            status,
            phoneNumber,
            email,
            emergencyContact,
            country,
            city,
            area,
            postalCode,
            fullAddress,
            latitude,
            longitude
        } = data;

        // Validation
        const missingFields = [];
        if (!clinicName) missingFields.push("clinicName");
        if (!clinicType) missingFields.push("clinicType");
        if (!phoneNumber) missingFields.push("phoneNumber");
        if (!email) missingFields.push("email");
        if (!city) missingFields.push("city");
        if (!area) missingFields.push("area");
        if (!fullAddress) missingFields.push("fullAddress");

        if (missingFields.length > 0) {
            return {
                success: false,
                message: "Missing required fields",
                missingFields,
            };
        }

        await connectToDb();

        const res = await checkSession();
        if (!res?.success || res?.user?.role !== "admin") throw new Error("Unauthorized");

        const updatedClinic = await Clinic.findByIdAndUpdate(
            clinicId,
            {
                clinicName,
                clinicType,
                status,
                phoneNumber,
                email,
                emergencyContact,
                country,
                city,
                area,
                postalCode,
                fullAddress,
                latitude,
                longitude,
            },
            { new: true, runValidators: true }
        );

        if (!updatedClinic) {
            return {
                success: false,
                message: "Clinic not found",
            };
        }

        return {
            success: true,
            clinic: JSON.parse(JSON.stringify(updatedClinic)),
        };

    } catch (error) {
        console.error("Update clinic error:", error);
        return {
            success: false,
            message: error.message || "Server error",
        };
    }
}

export async function saveClinicOperatingHours(clinicId, operatingHours) {
    try {
        if (!clinicId) throw new Error('Clinic ID is required');

        // connect to db
        await connectToDb();

        const res = await checkSession();
        if (!res?.success || res?.user?.role !== "admin") throw new Error("Unauthorized");

        const updatedClinic = await Clinic.findByIdAndUpdate(
            clinicId,
            { operatingHours },
            { new: true }
        );

        if (!updatedClinic) {
            throw new Error('Clinic not found');
        }
        console.log(updatedClinic);

        return {
            success: true,
            operatingHours: JSON.parse(JSON.stringify(updatedClinic.operatingHours)),
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            message: error.message || 'Server error',
        };
    }
}

export async function saveClinicFacilitiesAndServices(clinicId, facilities, services) {
    try {
        await connectToDb();

        const res = await checkSession();
        if (!res?.success || res?.user?.role !== "admin") throw new Error("Unauthorized");

        const updatedClinic = await Clinic.findByIdAndUpdate(
            clinicId,
            {
                facilities,
                services,
            },
            { new: true }
        );

        if (!updatedClinic) {
            throw new Error('Clinic not found');
        }
        console.log(updatedClinic);

        return {
            success: true,
            message: 'Facilities and services updated successfully',
            data: JSON.parse(JSON.stringify(updatedClinic)),
        };
    } catch (error) {
        console.error('Error saving facilities:', error);
        return {
            success: false,
            message: error.message || 'Server error',
        };
    }
}

export async function saveClinicDoctors(clinicId, assignedDoctors) {
    try {
        await connectToDb();

        const res = await checkSession();
        if (!res?.success || res?.user?.role !== "admin") throw new Error("Unauthorized");

        console.log(clinicId, assignedDoctors);
        const updatedClinic = await Clinic.findByIdAndUpdate(
            clinicId,
            { assignedDoctors },
            { new: true }
        );

        if (!updatedClinic) {
            throw new Error('Clinic not found');
        }
        console.log(updatedClinic);

        return {
            success: true,
            message: 'Doctors updated successfully',
            data: JSON.parse(JSON.stringify(updatedClinic)),
        };
    } catch (error) {
        console.error('Error saving doctors:', error);
        return {
            success: false,
            message: error.message || 'Server error',
        };
    }
}

export async function deleteClinic(id) {
    try {
        await connectToDb();

        const res = await checkSession();
        if (!res?.success || res?.user?.role !== "admin") throw new Error("Unauthorized");

        await Clinic.findByIdAndDelete(id);

        return { success: true };
    } catch (error) {
        console.error("Error deleting clinic:", error);
        return { success: false, message: error.message || "Server error" };
    }
}


