import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function uploadImage(image) {
    const file = image;

    if (!file) {
        return { error: 'No file uploaded' };
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to /public/uploads (or any folder)
    const filename = `${Date.now()}-${file.name}`;
    const filepath = join(process.cwd(), 'public', 'uploads', filename);
    await writeFile(filepath, buffer);

    // Return URL for display/DB
    return `/uploads/${filename}`;
}

export function generateEmployeeId(role) {
    const roleMap = {
        doctor: "DOC",
        receptionist: "REC",
        nurse: "NUR",
        billing_officer: "BIL"
    };

    const prefix = roleMap[role] || "EMP";
    const randomStr = Math.random().toString(36).substr(2, 6).toUpperCase();

    return `${prefix}-${randomStr}`;
}

export function generateSlots(schedule, slotDuration, date) {
    const slots = [];
    if (!schedule.open) return slots;

    const startParts = schedule.from.split(":").map(Number);
    const endParts = schedule.to.split(":").map(Number);

    let current = new Date(date);
    current.setHours(startParts[0], startParts[1], 0, 0);

    const end = new Date(date);
    end.setHours(endParts[0], endParts[1], 0, 0);

    const breakStart = schedule.break?.from
        ? (() => { const b = new Date(date); b.setHours(...schedule.break.from.split(":").map(Number), 0, 0); return b; })()
        : null;

    const breakEnd = schedule.break?.to
        ? (() => { const b = new Date(date); b.setHours(...schedule.break.to.split(":").map(Number), 0, 0); return b; })()
        : null;

    while (current < end) {
        const slotStart = new Date(current);
        const slotEnd = new Date(current);
        slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);

        // Skip break
        if (breakStart && breakEnd && slotStart >= breakStart && slotStart < breakEnd) {
            current = new Date(breakEnd);
            continue;
        }

        slots.push({ start: slotStart, end: slotEnd });
        current.setMinutes(current.getMinutes() + slotDuration);
    }

    return slots;
}
