'use client';

import React, { useState, useEffect } from 'react';
import { getSelectedStructure, formatStructureDisplay } from '@/shared/utils/selectedStructure';
import { DatabaseIcon, MapPinIcon } from 'lucide-react';

export default function SelectedStructureInfo() {
  const [structureInfo, setStructureInfo] = useState<string>('Loading...');

  useEffect(() => {
    const updateStructureInfo = () => {
      const selected = getSelectedStructure();
      setStructureInfo(formatStructureDisplay(selected));
    };

    // Initial load
    updateStructureInfo();

    // Listen for localStorage changes
    const handleStorageChange = () => {
      updateStructureInfo();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when structure is selected in the same tab
    window.addEventListener('structureSelected', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('structureSelected', handleStorageChange);
    };
  }, []);

  const selected = getSelectedStructure();

  if (!selected) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <MapPinIcon className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-medium text-amber-800">No Structure Selected</h3>
            <p className="text-sm text-amber-600">
              Please go to <a href="/structures" className="underline hover:text-amber-800">Structures page</a> to select a field and structure first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <DatabaseIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-blue-800">Current Structure</h3>
          <p className="text-sm text-blue-600">
            <span className="font-mono">{structureInfo}</span>
          </p>
          <p className="text-xs text-blue-500 mt-1">
            Selected on {new Date(selected.selectedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
