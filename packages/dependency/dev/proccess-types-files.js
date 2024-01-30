import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export async function processDtsFiles(folderPath, callback) {
    try {
        await processDirectory(folderPath, callback);
    } catch (error) {
        console.error('Error al procesar los archivos:', error);
    }
}

async function processDirectory(directory, callback) {
    const files = await fs.readdir(directory, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (file.isDirectory()) {
            // Si es un directorio, procesarlo de forma recursiva
            await processDirectory(filePath, callback);
        } else if (file.isFile() && file.name.endsWith('.d.ts')) {
            // Procesar solo archivos .d.ts
            const content = await fs.readFile(filePath, 'utf8');
            const newContent = callback(content, filePath);
            await fs.writeFile(filePath, newContent);
        }
    }
}
