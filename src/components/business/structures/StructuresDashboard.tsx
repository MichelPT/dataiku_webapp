'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StructuresData, FieldDetails } from '@/shared/types/structures';
import { FolderIcon, FileTextIcon } from 'lucide-react';
import { useLoading } from '@/shared/contexts/LoadingContext';
import { StructuresGridSkeleton, StructureDetailSkeleton } from './LoadingSkeleton';
import { setSelectedStructure as saveSelectedStructure } from '@/shared/utils/selectedStructure';

interface StructuresDashboardProps {
  initialData: StructuresData;
}

interface StructureDetails {
  field_name: string;
  structure_name: string;
  wells_count: number;
  total_records: number;
  file_path: string;
  wells: string[];
  columns: string[];
  data_types: Record<string, string>;
  statistics: Record<string, {
    count: number;
    mean: number;
    min: number;
    max: number;
  }>;
}

export default function StructuresDashboard({ initialData }: StructuresDashboardProps) {
  const router = useRouter();
  const [data] = useState<StructuresData>(initialData);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [fieldDetails, setFieldDetails] = useState<FieldDetails | null>(null);
  const [structureDetails, setStructureDetails] = useState<StructureDetails | null>(null);
  const [isLoadingField, setIsLoadingField] = useState(false);
  const [isLoadingStructure, setIsLoadingStructure] = useState(false);
  const { withApiLoading } = useLoading();

  const handleFieldSelect = async (fieldName: string) => {
    await withApiLoading(async () => {
      try {
        setIsLoadingField(true);
        setSelectedField(fieldName);
        setSelectedStructure(null);
        setStructureDetails(null);

        // Find the field data
        const fieldData = data.fields.find(f => f.field_name === fieldName);
        if (fieldData) {
          const totalWells = fieldData.structures.reduce((sum, s) => sum + s.wells_count, 0);
          const totalRecords = fieldData.structures.reduce((sum, s) => sum + s.total_records, 0);

          setFieldDetails({
            field_name: fieldName,
            structures: fieldData.structures.map((structure) => ({
              structure_name: structure.structure_name,
              file_path: structure.file_path,
              wells: structure.wells,
              wells_count: structure.wells_count,
              total_records: structure.total_records,
              columns: structure.columns,
              sample_data: []
            })),
            total_wells: totalWells,
            total_records: totalRecords,
            all_wells: []
          });
        }
      } catch (error) {
        console.error('Error fetching field details:', error);
      } finally {
        setIsLoadingField(false);
      }
    }, `Loading ${fieldName} structures...`);
  };

  const handleStructureSelect = async (structureName: string) => {
    await withApiLoading(async () => {
      try {
        setIsLoadingStructure(true);
        setSelectedStructure(structureName);
        
        // Get the field name for the current structure
        const fieldName = selectedField?.toLowerCase() || '';
        
        // Map structure and field names for API calls
        let apiFieldName = '';
        let apiStructureName = '';
        
        if (fieldName === 'adera') {
          apiFieldName = 'adera';
          if (structureName.toLowerCase() === 'abab') {
            apiStructureName = 'abab';
          } else if (structureName.toLowerCase() === 'benuang') {
            apiStructureName = 'benuang';
          }
        } else if (fieldName === 'prabumulih') {
          apiFieldName = 'prabumulih';
          if (structureName.toLowerCase().includes('gunung') || structureName.toLowerCase().includes('kemala')) {
            apiStructureName = 'gunungkemala';
          }
        }
        
        // Fetch structure details from backend API
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          if (backendUrl) {
            const detailsResponse = await fetch(`${backendUrl}/api/structures/structure/${encodeURIComponent(selectedField || '')}/${encodeURIComponent(structureName)}`, {
              headers: { 'Content-Type': 'application/json' }
            });

            if (detailsResponse.ok) {
              const structureDetailsData = await detailsResponse.json();
              setStructureDetails(structureDetailsData);
            } else {
              console.warn('Failed to fetch structure details from backend, using fallback data');
              // Fallback to mock data if API fails
              const mockStructureDetails: StructureDetails = {
                field_name: selectedField || '',
                structure_name: structureName,
                wells_count: Math.floor(Math.random() * 50) + 10,
                total_records: Math.floor(Math.random() * 10000) + 1000,
                file_path: `/data/${fieldName}/${structureName}.csv`,
                wells: Array.from({ length: 5 }, (_, i) => `Well-${i + 1}`),
                columns: ['DEPTH', 'GR', 'NPHI', 'RHOB', 'RT', 'SP', 'CALI', 'PEF'],
                data_types: {
                  'DEPTH': 'float64',
                  'GR': 'float64',
                  'NPHI': 'float64',
                  'RHOB': 'float64',
                  'RT': 'float64',
                  'SP': 'float64',
                  'CALI': 'float64',
                  'PEF': 'float64'
                },
                statistics: {
                  'GR': { count: 1000, mean: 75.5, min: 10.2, max: 150.8 },
                  'NPHI': { count: 1000, mean: 0.25, min: 0.05, max: 0.45 },
                  'RHOB': { count: 1000, mean: 2.35, min: 1.95, max: 2.85 }
                }
              };
              setStructureDetails(mockStructureDetails);
            }
          } else {
            console.warn('Backend URL not configured, using fallback data');
            // Fallback to mock data if no backend URL
            const mockStructureDetails: StructureDetails = {
              field_name: selectedField || '',
              structure_name: structureName,
              wells_count: Math.floor(Math.random() * 50) + 10,
              total_records: Math.floor(Math.random() * 10000) + 1000,
              file_path: `/data/${fieldName}/${structureName}.csv`,
              wells: Array.from({ length: 5 }, (_, i) => `Well-${i + 1}`),
              columns: ['DEPTH', 'GR', 'NPHI', 'RHOB', 'RT', 'SP', 'CALI', 'PEF'],
              data_types: {
                'DEPTH': 'float64',
                'GR': 'float64',
                'NPHI': 'float64',
                'RHOB': 'float64',
                'RT': 'float64',
                'SP': 'float64',
                'CALI': 'float64',
                'PEF': 'float64'
              },
              statistics: {
                'GR': { count: 1000, mean: 75.5, min: 10.2, max: 150.8 },
                'NPHI': { count: 1000, mean: 0.25, min: 0.05, max: 0.45 },
                'RHOB': { count: 1000, mean: 2.35, min: 1.95, max: 2.85 }
              }
            };
            setStructureDetails(mockStructureDetails);
          }
        } catch (error) {
          console.error('Error fetching structure details:', error);
          // Fallback to mock data on error
          const mockStructureDetails: StructureDetails = {
            field_name: selectedField || '',
            structure_name: structureName,
            wells_count: Math.floor(Math.random() * 50) + 10,
            total_records: Math.floor(Math.random() * 10000) + 1000,
            file_path: `/data/${fieldName}/${structureName}.csv`,
            wells: Array.from({ length: 5 }, (_, i) => `Well-${i + 1}`),
            columns: ['DEPTH', 'GR', 'NPHI', 'RHOB', 'RT', 'SP', 'CALI', 'PEF'],
            data_types: {
              'DEPTH': 'float64',
              'GR': 'float64',
              'NPHI': 'float64',
              'RHOB': 'float64',
              'RT': 'float64',
              'SP': 'float64',
              'CALI': 'float64',
              'PEF': 'float64'
            },
            statistics: {
              'GR': { count: 1000, mean: 75.5, min: 10.2, max: 150.8 },
              'NPHI': { count: 1000, mean: 0.25, min: 0.05, max: 0.45 },
              'RHOB': { count: 1000, mean: 2.35, min: 1.95, max: 2.85 }
            }
          };
          setStructureDetails(mockStructureDetails);
        }
        
        // Store selected structure information for dashboard
        const structureInfo = {
          fieldName: selectedField || '',
          structureName: structureName,
          selectedAt: new Date().toISOString()
        };
        
        // Save to localStorage so dashboard can access it
        saveSelectedStructure(structureInfo);
        
        // Make API call to select structure using environment variable
        if (apiFieldName && apiStructureName) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/api/select-structure`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              field_name: apiFieldName,
              structure_name: apiStructureName
            })
          });
          
          if (response.ok) {
            console.log('Structure selection API call successful');
            // Navigate to dashboard after successful API call
            router.push('/dashboard');
          } else {
            console.error('Structure selection API call failed');
          }
        } else {
          // If no API mapping available, still navigate to dashboard with selected structure
          console.log('No API mapping available, navigating to dashboard anyway');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error calling select-structure API:', error);
      } finally {
        setIsLoadingStructure(false);
      }
    }, `Loading ${structureName} details...`);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 text-gray-800">
      {/* Panel 1: Fields List */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Fields</h2>
        <div className="space-y-2">
          {data.fields.map((field) => (
            <button
              key={field.field_name}
              onClick={() => handleFieldSelect(field.field_name)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                selectedField === field.field_name 
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium">{field.field_name}</div>
                  <div className="text-sm text-gray-500">{field.structures.length} structures</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Panel 2: Structures List */}
      <div className="flex-1 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b font-semibold text-lg bg-white shadow-sm">
          {selectedField ? `Structures in "${selectedField}"` : 'Select a field to view structures'}
        </div>
        <div className="flex-1 overflow-y-auto">
          {isLoadingField ? (
            <StructuresGridSkeleton />
          ) : fieldDetails ? (
            <div className="bg-white m-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure Name</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fieldDetails.structures.map((structure) => (
                    <tr
                      key={structure.structure_name}
                      onClick={() => handleStructureSelect(structure.structure_name)}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedStructure === structure.structure_name 
                          ? 'bg-blue-50 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <FileTextIcon className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{structure.structure_name}</div>
                            {structure.error && <div className="text-xs text-red-500">(Error loading)</div>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-72 text-gray-500">
              <div className="text-center">
                <FolderIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium">Select a field to view structures</p>
                <p className="text-sm">Choose a field from the left panel to see its structures</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Panel 3: Structure Details */}
      <div className="flex-1 bg-white flex flex-col">
        <div className="p-4 border-b font-semibold text-lg bg-white shadow-sm">
          {selectedStructure ? `Details for "${selectedStructure}"` : 'Select a structure to view details'}
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {isLoadingStructure ? (
            <StructureDetailSkeleton />
          ) : structureDetails ? (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Field:</span>
                    <span className="font-semibold text-gray-800">{structureDetails.field_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Structure:</span>
                    <span className="font-semibold text-gray-800">{structureDetails.structure_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wells Count:</span>
                    <span className="font-semibold text-gray-800">{structureDetails.wells_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Records:</span>
                    <span className="font-semibold text-gray-800">{structureDetails.total_records.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span>File Path:</span>
                    <span className="font-mono text-xs text-gray-800 truncate max-w-md">{structureDetails.file_path}</span>
                  </div>
                </div>
              </div>

              {/* Wells */}
              {structureDetails.wells && structureDetails.wells.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Wells ({structureDetails.wells_count})</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {structureDetails.wells.map((well) => (
                      <div key={well} className="px-3 py-2 bg-gray-100 rounded text-sm font-mono">
                        {well}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Columns */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Available Columns ({structureDetails.columns.length})</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {structureDetails.columns.map((column) => (
                    <div key={column} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800">{column}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {structureDetails.data_types && structureDetails.data_types[column] 
                          ? `Type: ${structureDetails.data_types[column]}` 
                          : 'Type: Unknown'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              {structureDetails.statistics && Object.keys(structureDetails.statistics).length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Column Statistics</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {Object.entries(structureDetails.statistics).map(([column, stats]) => (
                      <div key={column} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">{column}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Count:</span>
                            <span className="font-mono">{stats.count}</span>
                          </div>
                          {stats.mean !== null && (
                            <div className="flex justify-between">
                              <span>Mean:</span>
                              <span className="font-mono">{stats.mean?.toFixed(2)}</span>
                            </div>
                          )}
                          {stats.min !== null && (
                            <div className="flex justify-between">
                              <span>Min:</span>
                              <span className="font-mono">{stats.min}</span>
                            </div>
                          )}
                          {stats.max !== null && (
                            <div className="flex justify-between">
                              <span>Max:</span>
                              <span className="font-mono">{stats.max}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <FileTextIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium">Select a structure to view details</p>
                <p className="text-sm">Choose a structure from the middle panel to see its information</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
