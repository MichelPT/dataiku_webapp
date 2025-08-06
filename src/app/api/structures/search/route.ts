import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

interface SearchResult {
    type: 'field' | 'structure' | 'well';
    name: string;
    field_name?: string;
    structure_name?: string;
    path: string;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    
    if (!query.trim()) {
        return NextResponse.json({ results: [] });
    }

    const structuresDir = path.join(process.cwd(), 'data', 'structures');
    const results: SearchResult[] = [];

    try {
        await fs.access(structuresDir);
    } catch {
        return NextResponse.json({ results: [] });
    }

    try {
        const fieldDirectories = (await fs.readdir(structuresDir, { withFileTypes: true }))
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const fieldName of fieldDirectories) {
            // Search in field names
            if (fieldName.toLowerCase().includes(query)) {
                results.push({
                    type: 'field',
                    name: fieldName,
                    path: `/structures?field=${fieldName}`
                });
            }

            const fieldPath = path.join(structuresDir, fieldName);
            
            try {
                const structureFiles = (await fs.readdir(fieldPath))
                    .filter(file => file.endsWith('.xlsx') && !file.startsWith('~'));

                for (const structureFile of structureFiles) {
                    const structureName = structureFile.replace('.xlsx', '');
                    
                    // Search in structure names
                    if (structureName.toLowerCase().includes(query)) {
                        results.push({
                            type: 'structure',
                            name: structureName,
                            field_name: fieldName,
                            path: `/structures?field=${fieldName}&structure=${structureName}`
                        });
                    }
                }
            } catch {
                // Skip fields that can't be read
                continue;
            }
        }

        // Limit results to prevent overwhelming the UI
        const limitedResults = results.slice(0, 20);
        
        return NextResponse.json({ 
            results: limitedResults,
            total: results.length,
            query: query 
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
