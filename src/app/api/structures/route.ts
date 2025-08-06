import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

interface Field {
    field_name: string;
    structures_count: number;
    structures: string[];
}

interface StructuresData {
    fields: Field[];
    total_fields: number;
    total_structures: number;
}

async function getStructuresData(): Promise<StructuresData> {
    const structuresDir = path.join(process.cwd(), 'data', 'structures');
    
    try {
        await fs.access(structuresDir);
    } catch {
        // If structures directory doesn't exist, return empty data
        return {
            fields: [],
            total_fields: 0,
            total_structures: 0
        };
    }

    try {
        const fieldDirectories = (await fs.readdir(structuresDir, { withFileTypes: true }))
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        const fields: Field[] = [];
        let totalStructures = 0;

        for (const fieldName of fieldDirectories.sort()) {
            const fieldPath = path.join(structuresDir, fieldName);
            
            try {
                const structureFiles = (await fs.readdir(fieldPath))
                    .filter(file => file.endsWith('.xlsx') && !file.startsWith('~'));

                const structures = structureFiles
                    .map(file => file.replace('.xlsx', ''))
                    .sort();

                fields.push({
                    field_name: fieldName,
                    structures_count: structures.length,
                    structures: structures
                });

                totalStructures += structures.length;
            } catch {
                // If field directory can't be read, skip it
                console.warn(`Could not read field directory: ${fieldPath}`);
            }
        }

        return {
            fields,
            total_fields: fields.length,
            total_structures: totalStructures
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Error reading structures directory: ${errorMessage}`);
    }
}

export async function GET() {
    try {
        const data = await getStructuresData();
        return NextResponse.json(data);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
