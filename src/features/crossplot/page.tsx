'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useDashboard } from '@/shared/contexts/DashboardContext';
import { type PlotData, type ParameterRow } from '@/shared/types';
import { useRouter } from 'next/navigation';
import CrossplotParams from './CrossplotParams';

export default function CrossplotPage() {
    const { selectedWells, selectedIntervals } = useDashboard();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [plot, setPlot] = useState<PlotData | null>(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/run-crossplot`;

    const createInitialParameters = (intervals: string[]): ParameterRow[] => {
        const createValues = (val: string | number) => Object.fromEntries(intervals.map(i => [i, val]));

        return [
            {
                id: 1,
                name: 'x_column',
                location: 'Constant',
                mode: 'Input',
                comment: 'X-axis column',
                unit: '',
                values: createValues('NPHI'),
                isEnabled: true
            },
            {
                id: 2,
                name: 'y_column',
                location: 'Constant',
                mode: 'Input',
                comment: 'Y-axis column',
                unit: '',
                values: createValues('RHOB'),
                isEnabled: true
            },
            {
                id: 3,
                name: 'color_column',
                location: 'Constant',
                mode: 'Input',
                comment: 'Color by column (optional)',
                unit: '',
                values: createValues('GR'),
                isEnabled: false
            }
        ];
    };

    const [parameters, setParameters] = useState<ParameterRow[]>([]);

    useEffect(() => {
        setParameters(createInitialParameters(selectedIntervals));
    }, [selectedIntervals]);

    const handleParameterChange = (updatedParams: ParameterRow[]) => {
        setParameters(updatedParams);
    };

    const handleCalculate = async () => {
        if (!selectedWells || selectedWells.length === 0) {
            setError("No wells selected");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const paramValues = parameters
                .filter(p => p.isEnabled)
                .reduce((acc, param) => {
                    const firstInterval = selectedIntervals[0];
                    if (firstInterval && param.values[firstInterval] !== undefined) {
                        const value = param.values[firstInterval];
                        acc[param.name] = typeof value === 'string' ? (isNaN(Number(value)) ? value : parseFloat(value)) : value;
                    }
                    return acc;
                }, {} as Record<string, number | string>);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    selected_wells: selectedWells,
                    selected_intervals: selectedIntervals,
                    params: paramValues
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to generate crossplot");
            }

            const result = await response.json();
            setPlot(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate crossplot');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="ml-2">Generating crossplot...</span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 h-full flex flex-col bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex-shrink-0">Crossplot Analysis</h2>

            <div className="flex-shrink-0 mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4 items-start">
                    <div className="md:col-span-4">
                        <p className="text-sm font-medium text-gray-700">
                            Well: {selectedWells + ', ' || 'N/A'} / Intervals: {selectedIntervals.length} selected
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <button
                        type="button"
                        className="px-6 py-2 rounded-md text-gray-800 bg-gray-200 hover:bg-gray-300 font-semibold"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCalculate}
                        className="px-6 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={isLoading || !selectedWells || selectedWells.length === 0}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Generate Crossplot'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 mb-4 border rounded-lg bg-red-50 text-red-700">
                    <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        <span>{error}</span>
                    </div>
                </div>
            )}

            <div className="flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 flex-shrink-0">Parameters</h3>
                <CrossplotParams parameters={parameters} onParameterChange={handleParameterChange} />
                
                {plot && (
                    <div className="mt-6 flex-grow">
                        <h3 className="text-lg font-semibold mb-2">Results</h3>
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <p className="text-gray-600">Crossplot visualization will be displayed here</p>
                            <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(plot, null, 2)}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
