
// src/features/file_upload/types/index.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Layout, type Data } from 'plotly.js';
import { FileData, ProcessedFileDataForDisplay } from '@/shared/types';

// Represents the structure of a Plotly chart object.
export interface PlotData {
  data: Data[];
  layout: Partial<Layout>;
}

export interface ParsedSubFile {
  id: string;
  name: string;
  type: 'las' | 'csv';
  content: any[];
  headers: string[];
  rawContentString: string;
}

// Re-export shared types for backward compatibility
export type { FileData, ProcessedFileDataForDisplay };

export interface StagedStructure {
  userDefinedStructureName: string;
  files: ProcessedFileDataForDisplay[];
}

export type QCStatus = 'PASS' | 'MISSING_LOGS' | 'HAS_NULL' | 'EXTREME_VALUES' | 'ERROR' | 'HANDLED_NULLS';

export interface QCResult {
  well_name: string;
  status: QCStatus;
  details: string;
}

export interface QCResponse {
  qc_summary: QCResult[];
  output_files: Record<string, string>;
}

export interface PreviewableFile {
  id: string;
  name:string;
  content: any[];
  headers: string[];
}

export interface LogDataRow {
  DEPTH: number;
  MARKER: string;
  NPHI?: number | null;
  RHOB?: number | null;
  [key: string]: any;
}