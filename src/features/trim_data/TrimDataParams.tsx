// frontend/src/features/trim_data/TrimDataParams.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDashboard } from '@/contexts/DashboardContext';
import { type ParameterRow } from '@/types';
import { Loader2 } from 'lucide-react';

// Komponen helper untuk Form Field
// const FormField: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className = '' }) => (
//     <div className={className}>
//         <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
//         {children}
//     </div>
// );

const createInitialTrimParameters = (): ParameterRow[] => {
  const createValues = (val: string | number) => ({ default: val });

  const allParams: Omit<ParameterRow, 'values'>[] = [
    {
      id: 1,
      location: 'Parameter',
      mode: 'Input',
      comment: 'Trim mode',
      unit: 'MODE',
      name: 'TRIM_MODE',
      isEnabled: true,
    },
    {
      id: 2,
      location: 'Parameter',
      mode: 'Input',
      comment: 'Trim above this depth',
      unit: 'm',
      name: 'DEPTH_ABOVE',
      isEnabled: true,
    },
    {
      id: 3,
      location: 'Parameter',
      mode: 'Input',
      comment: 'Trim below this depth',
      unit: 'm',
      name: 'DEPTH_BELOW',
      isEnabled: true,
    },
  ];

  const defaultValues: Record<string, string | number> = {
    TRIM_MODE: 'AUTO',
    DEPTH_ABOVE: '',
    DEPTH_BELOW: '',
  };

  return allParams.map(p => ({
    ...p,
    values: createValues(defaultValues[p.name] || '')
  }));
};

export default function TrimDataParams() {
  const { selectedIntervals, selectedWells, selectedFilePath } = useDashboard();
  const router = useRouter();
  const pathname = usePathname();
  const [parameters, setParameters] = useState<ParameterRow[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if we're in DataPrep context by checking the current pathname
  const isDataPrep = pathname?.startsWith('/data-prep') || false;

  useEffect(() => {
    setParameters(createInitialTrimParameters());
  }, []);

  const handleValueChange = (id: number, newValue: string | number) => {
    setParameters(prev =>
      prev.map(row =>
        row.id === id ? { ...row, values: { default: newValue } } : row
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formParams = parameters
      .filter(p => p.isEnabled)
      .reduce((acc, param) => {
        acc[param.name] = param.values.default;
        return acc;
      }, {} as Record<string, string | number>);

    // Build payload - include file_path if called from DataPrep
    const payload: any = {
      params: formParams,
      selected_wells: selectedWells,
    };

    // Add file_path if we're in DataPrep context and have a selected file
    if (isDataPrep && selectedFilePath) {
      payload.file_path = selectedFilePath;
      console.log('DataPrep context detected, adding file_path:', selectedFilePath);
    }

    console.log('Trim data payload:', payload);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/trim-data`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const result = await response.json();
      alert(result.message || 'Data berhasil di-trim.');
      router.push('/dashboard');
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRowBgColor = (location: string, mode: string): string => {
    switch (location) {
      case 'Parameter':
        return 'bg-orange-600';

      case 'Constant':
        if (mode === 'Input') {
          return 'bg-yellow-300';
        } else {
          return 'bg-yellow-100';
        }

      case 'Log':
        if (mode === 'Input') {
          return 'bg-cyan-400';
        } else {
          return 'bg-cyan-200';
        }

      case 'Output':
        return 'bg-yellow-600';

      case 'Interval':
        return 'bg-green-400';

      default:
        return 'bg-white';
    }
  };

  const isInputDisabled = (paramName: string, trimMode: string): boolean => {
    if (trimMode === 'AUTO') return true;
    if (trimMode === 'TRIM_ABOVE' && paramName === 'DEPTH_ABOVE') return true;
    if (trimMode === 'TRIM_BELLOW' && paramName === 'DEPTH_BELOW') return true;
  return false;
};

const trimModeParam = parameters.find(p => p.name === 'TRIM_MODE');
const currentTrimMode = trimModeParam?.values['default'] || 'DEPTH_BELOW';


  const tableHeaders = ['#', 'Location', 'Mode', 'Comment', 'Unit', 'Name'];

  return (
    <div className="p-4 md:p-6 h-full flex flex-col bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex-shrink-0">Trim Well Log Data</h2>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col min-h-0">
        {/* Bagian atas */}
        <div className="flex-shrink-0 mb-6 p-4 border rounded-lg bg-gray-50 flex flex-col gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Context: {isDataPrep ? 'Data Preparation' : 'Dashboard'}
            </p>
            <p className="text-sm font-medium text-gray-700">
              Well: {selectedWells.join(', ') || 'N/A'} / Intervals: {selectedIntervals.length} selected
            </p>
            {isDataPrep && selectedFilePath && (
              <p className="text-xs text-blue-600">
                File: {selectedFilePath}
              </p>
            )}
            {isDataPrep && !selectedFilePath && (
              <p className="text-xs text-orange-600">
                No file selected from Data Prep sidebar
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <button type="button" className="px-6 py-2 rounded-md text-gray-800 bg-gray-200 hover:bg-gray-300 font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Start'}
            </button>
          </div>
        </div>

        {/* Tabel parameter */}
        <h3 className="text-lg font-semibold mb-2 flex-shrink-0">Parameters</h3>
        <div className="flex-grow min-h-0 border border-gray-300 rounded-lg">
          <div className="overflow-auto h-full">
            <table className="min-w-full text-sm table-auto">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  {tableHeaders.map(header => (
                    <th key={header} className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">{header}</th>
                  ))}
                  <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {parameters.map((param) => {
                  const mode = parameters.find(p => p.name === 'TRIM_MODE')?.values.default;

                  const shouldShowInput =
                    param.name === 'DEPTH_ABOVE' && (mode === 'DEPTH_ABOVE' || mode === 'CUSTOM_TRIM') ||
                    param.name === 'DEPTH_BELOW' && (mode === 'DEPTH_BELOW' || mode === 'CUSTOM_TRIM') ||
                    !['DEPTH_ABOVE', 'DEPTH_BELOW'].includes(param.name);

                  return shouldShowInput ? (
                    <tr key={param.id} className={`border-b border-gray-200 text-white ${param.isEnabled ? getRowBgColor(param.location, param.mode) : 'bg-gray-100 text-gray-400'}`}>
                      <td className="px-3 py-2 border-r text-center">{param.id}</td>
                      <td className="px-3 py-2 border-r whitespace-nowrap">{param.location}</td>
                      <td className="px-3 py-2 border-r whitespace-nowrap">{param.mode}</td>
                      <td className="px-3 py-2 border-r max-w-xs whitespace-normal">{param.comment}</td>
                      <td className="px-3 py-2 border-r whitespace-nowrap">{param.unit}</td>
                      <td className="px-3 py-2 border-r font-semibold whitespace-nowrap">{param.name}</td>
                        <td className="px-3 py-2 border-r bg-white text-black">
                          {param.name === 'TRIM_MODE' ? (
                            <select
                                value={String(param.values['default'] ?? '')}
                                onChange={(e) => handleValueChange(param.id, e.target.value)}
                                disabled={!param.isEnabled}
                                className="w-full min-w-[100px] p-1 bg-white text-black disabled:bg-gray-100 disabled:text-gray-500"
                            >
                                <option value="">Choose Method</option>
                                <option value="DEPTH_BELOW">DEPTH_BELOW</option>
                                <option value="DEPTH_ABOVE">DEPTH_ABOVE</option>
                                <option value="CUSTOM_TRIM">CUSTOM_TRIM</option>
                                {/* <option value="OUT_RANGE">OUT_RANGE</option> */}
                            </select>
                            ) : (
                            <input
                                type="text"
                                value={param.values['default'] ?? ''}
                                onChange={(e) => handleValueChange(param.id, e.target.value)}
                                disabled={isInputDisabled(param.name, String(currentTrimMode))}
                                className="w-full min-w-[100px] p-1 bg-white text-black disabled:bg-gray-100 disabled:text-gray-500"
                            />
                            )}
                        </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};
