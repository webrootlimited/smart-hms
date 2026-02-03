"use server";

import connectToDb from "@/lib/connectToDb";
import AppointmentType from "@/models/appointmentType.model";
import User from "@/models/user.model";

export async function saveAppointmentType(data) {
    try {
        await connectToDb();

        const appointmentType = await AppointmentType.create({
            typeName: data.typeName,
            description: data.description,
            duration: data.duration,
            requiredDocuments: data.requiredDocuments || [],
            visitType: data.visitType || "Both",
            preVisitForms: data.preVisitForms || [],
            eligibleDoctors: data.eligibleDoctors || [],
            fee: {
                currency: data.fee?.currency || "USD",
                amount: data.fee?.amount || 0,
            },
            status: data.status || "active",
        });

        return {
            success: true,
            message: "Appointment type created successfully",
            data: JSON.parse(JSON.stringify(appointmentType)),
        };
    } catch (error) {
        console.error("Save Appointment Type Error:", error);

        return {
            success: false,
            message: error.message || "Failed to create appointment type",
        };
    }
}

export async function updateAppointmentType(id, data) {
    try {
        if (!id) {
            return {
                success: false,
                message: "Appointment Type ID is required",
            };
        }

        await connectToDb();

        const updatedAppointmentType = await AppointmentType.findByIdAndUpdate(
            id,
            {
                typeName: data.typeName,
                description: data.description,
                duration: data.duration,
                requiredDocuments: data.requiredDocuments || [],
                visitType: data.visitType || "Both",
                preVisitForms: data.preVisitForms || [],
                eligibleDoctors: data.eligibleDoctors || [],
                fee: {
                    currency: data.fee?.currency || "USD",
                    amount: data.fee?.amount || 0,
                },
                status: data.status || "active",
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedAppointmentType) {
            return {
                success: false,
                message: "Appointment type not found",
            };
        }

        return {
            success: true,
            message: "Appointment type updated successfully",
            data: JSON.parse(JSON.stringify(updatedAppointmentType)),
        };
    } catch (error) {
        console.error("Update Appointment Type Error:", error);

        return {
            success: false,
            message: error.message || "Failed to update appointment type",
        };
    }
}

export async function getAppointmentTypes() {
    try {
        await connectToDb();

        const appointmentTypes = await AppointmentType.find()
            .populate({
                path: "eligibleDoctors",
            })
            .sort({ createdAt: -1 })

        return {
            success: true,
            data: JSON.parse(JSON.stringify(appointmentTypes)),
        };
    } catch (error) {
        console.error("Get Appointment Types Error:", error);

        return {
            success: false,
            message: error.message || "Failed to fetch appointment types",
        };
    }
}

export async function getAppointmentTypeDetails(id) {
    try {
        await connectToDb();

        const appointmentType = await AppointmentType.findById(id).populate({
            path: "eligibleDoctors",
            model: "User"
        });

        return {
            success: true,
            message: "Appointment type got successfully",
            data: JSON.parse(JSON.stringify(appointmentType)),
        };
    } catch (error) {
        console.error("Get Appointment Type Error:", error);

        return {
            success: false,
            message: error.message || "Failed to get appointment type",
        };
    }
}

export async function deleteAppointmentType(id) {
    try {
        await connectToDb();

        const appointmentType = await AppointmentType.findByIdAndDelete(id);

        return {
            success: true,
            message: "Appointment type deleted successfully",
            data: JSON.parse(JSON.stringify(appointmentType)),
        };
    } catch (error) {
        console.error("Delete Appointment Type Error:", error);

        return {
            success: false,
            message: error.message || "Failed to delete appointment type",
        };
    }
}
