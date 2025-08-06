'use client';

import React from 'react';
import { type ParameterRow } from '@/shared/types';
import { useDashboard } from '@/shared/contexts/DashboardContext';

interface CrossplotParamsProps {
    parameters: ParameterRow[];
    onParameterChange: (updatedParams: ParameterRow[]) => void;
}

export default function CrossplotParams({ parameters, onParameterChange }: CrossplotParamsProps) {
    const { selectedIntervals } = useDashboard();

    const handleUnifiedValueChange = (id: number, newValue: string) => {
        const updatedParams = parameters.map(param => {
            if (param.id === id) {
                const newValues = Object.fromEntries(
                    Object.keys(param.values).map(intervalKey => [intervalKey, newValue])
                );
                return { ...param, values: newValues };
            }
            return param;
        });
        onParameterChange(updatedParams);
    };

    const handleEnabledChange = (id: number, enabled: boolean) => {
        const updatedParams = parameters.map(param =>
            param.id === id ? { ...param, isEnabled: enabled } : param
        );
        onParameterChange(updatedParams);
    };

    return (
        <div className="flex-grow overflow-auto">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                    Enable
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Parameter
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Comment
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Unit
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {parameters.map((param) => (
                                <tr key={param.id} className={`${param.isEnabled ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-200`}>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={param.isEnabled}
                                            onChange={(e) => handleEnabledChange(param.id, e.target.checked)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{param.name}</div>
                                        <div className="text-xs text-gray-500">{param.location} | {param.mode}</div>
                                    </td>
                                    <td className="px-3 py-4">
                                        <div className="text-sm text-gray-700">{param.comment}</div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{param.unit}</div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <input
                                            type="text"
                                            value={selectedIntervals.length > 0 ? param.values[selectedIntervals[0]] || '' : ''}
                                            onChange={(e) => handleUnifiedValueChange(param.id, e.target.value)}
                                            disabled={!param.isEnabled}
                                            className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                !param.isEnabled ? 'bg-gray-100 text-gray-400' : 'bg-white'
                                            }`}
                                            placeholder="Enter value..."
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
