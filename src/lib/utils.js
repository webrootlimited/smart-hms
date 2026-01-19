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