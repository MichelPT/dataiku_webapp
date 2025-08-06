// src/shared/utils/selectedStructure.ts

export interface SelectedStructureInfo {
  fieldName: string;
  structureName: string;
  selectedAt: string;
}

export function getSelectedStructure(): SelectedStructureInfo | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const stored = localStorage.getItem('selectedStructure');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing selected structure from localStorage:', error);
  }
  
  return null;
}

export function setSelectedStructure(info: SelectedStructureInfo): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('selectedStructure', JSON.stringify(info));
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('structureSelected', { detail: info }));
  } catch (error) {
    console.error('Error saving selected structure to localStorage:', error);
  }
}

export function clearSelectedStructure(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem('selectedStructure');
  } catch (error) {
    console.error('Error clearing selected structure from localStorage:', error);
  }
}

export function formatStructureDisplay(info: SelectedStructureInfo | null): string {
  if (!info) {
    return 'No structure selected';
  }
  
  return `${info.fieldName} / ${info.structureName}`;
}
