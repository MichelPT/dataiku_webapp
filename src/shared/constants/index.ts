// API-related constants
export const API_ENDPOINTS = {
  STRUCTURES: '/api/structures',
  SEARCH: '/api/structures/search',
  SELECT_STRUCTURE: '/api/select-structure',
  GET_PLOT: '/api/get-plot',
  QC_RUN: '/api/qc/run',
  NORMALIZATION: '/api/get-normalization-plot',
  SMOOTHING: '/api/get-smoothing-plot',
  POROSITY: '/api/get-porosity-plot',
  GSA: '/api/get-gsa-plot',
  VSH: '/api/get-vsh-plot',
  SW: '/api/get-sw-plot',
  RWA: '/api/get-rwa-plot',
} as const;

// File processing constants
export const SUPPORTED_FILE_TYPES = {
  LAS: ['.las'],
  CSV: ['.csv'],
  EXCEL: ['.xlsx', '.xls'],
  ZIP: ['.zip'],
} as const;

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

// Loading states
export const LOADING_MESSAGES = {
  UPLOADING: 'Uploading files...',
  PROCESSING: 'Processing data...',
  QC_RUNNING: 'Running quality control...',
  SAVING: 'Saving to database...',
  LOADING: 'Loading...',
} as const;
