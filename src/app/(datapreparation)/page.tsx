'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useDashboard } from '@/shared/contexts/DashboardContext';
import { 
  Scissors, 
  AlignVerticalJustifyCenter, 
  PlusCircle, 
  TrendingUp, 
  BarChart3, 
  GitMerge,
  Database,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { FastDataPreparationSkeleton } from '@/components/ui/fast-skeletons';

interface DataPrepModule {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  status: 'available' | 'processing' | 'completed' | 'error';
  estimatedTime?: string;
  requirements?: string[];
  category: 'basic' | 'advanced' | 'integration';
}

const dataPreparationModules: DataPrepModule[] = [
  {
    id: 'trim-data',
    name: 'Trim Data',
    description: 'Remove unwanted data points, outliers, and trim dataset boundaries based on depth or value ranges',
    icon: Scissors,
    route: '/trim_data',
    status: 'available',
    estimatedTime: '2-5 minutes',
    requirements: ['Selected wells', 'Depth range'],
    category: 'basic'
  },
  {
    id: 'depth-matching',
    name: 'Depth Matching',
    description: 'Align and synchronize depth measurements across multiple wells using correlation techniques',
    icon: AlignVerticalJustifyCenter,
    route: '/depth-matching',
    status: 'available',
    estimatedTime: '3-8 minutes',
    requirements: ['Multiple wells', 'Reference depth'],
    category: 'advanced'
  },
  {
    id: 'fill-missing',
    name: 'Fill Missing Values',
    description: 'Interpolate and fill missing data points in log curves using various mathematical methods',
    icon: PlusCircle,
    route: '/fill_missing',
    status: 'available',
    estimatedTime: '1-3 minutes',
    requirements: ['Log curves with gaps'],
    category: 'basic'
  },
  {
    id: 'smoothing',
    name: 'Smoothing',
    description: 'Apply smoothing filters to reduce noise and enhance signal quality in log data',
    icon: TrendingUp,
    route: '/smoothing',
    status: 'available',
    estimatedTime: '2-4 minutes',
    requirements: ['Noisy log curves'],
    category: 'basic'
  },
  {
    id: 'normalization',
    name: 'Normalization',
    description: 'Normalize log values across different measurement scales and environmental conditions',
    icon: BarChart3,
    route: '/normalization',
    status: 'available',
    estimatedTime: '2-6 minutes',
    requirements: ['Log curves', 'Normalization method'],
    category: 'advanced'
  },
  {
    id: 'splicing-merging',
    name: 'Splicing & Merging',
    description: 'Combine and merge log data from different sources, tools, or measurement runs',
    icon: GitMerge,
    route: '/splicing-merging',
    status: 'available',
    estimatedTime: '3-7 minutes',
    requirements: ['Multiple log sources'],
    category: 'integration'
  }
];

export default function DataPreparationPage() {
  const router = useRouter();
  const { selectedWells, selectedIntervals } = useDashboard();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingModule, setLoadingModule] = useState<string | null>(null);

  const handleModuleClick = async (module: DataPrepModule) => {
    if (selectedWells.length === 0) {
      alert('Please select at least one well from the left sidebar to continue with data preparation.');
      return;
    }

    setIsLoading(true);
    setLoadingModule(module.id);

    // Simulate navigation delay for better UX
    setTimeout(() => {
      router.push(module.route);
      setIsLoading(false);
      setLoadingModule(null);
    }, 800);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic':
        return 'bg-green-50 border-green-200';
      case 'advanced':
        return 'bg-blue-50 border-blue-200';
      case 'integration':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'basic':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'advanced':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'integration':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading && loadingModule) {
    return <FastDataPreparationSkeleton />;
  }

  // Group modules by category
  const groupedModules = dataPreparationModules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, DataPrepModule[]>);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Preparation</h1>
            <p className="text-gray-600">Clean, process, and prepare your well log data for analysis</p>
          </div>
        </div>

        {/* Current Selection Summary */}
        <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Selected Wells:</span>
            <Badge variant="outline" className="bg-white border-gray-300">
              {selectedWells.length} wells
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Selected Intervals:</span>
            <Badge variant="outline" className="bg-white border-gray-300">
              {selectedIntervals.length} intervals
            </Badge>
          </div>
          {selectedWells.length === 0 && (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Please select wells from the left sidebar to begin</span>
            </div>
          )}
        </div>
      </div>

      {/* Data Preparation Modules by Category */}
      {Object.entries(groupedModules).map(([category, modules]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {category === 'basic' ? 'Basic Processing' : 
               category === 'advanced' ? 'Advanced Processing' : 
               'Data Integration'}
            </h2>
            <Badge variant="outline" className={getCategoryBadge(category)}>
              {modules.length} modules
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              const isDisabled = selectedWells.length === 0;
              const isCurrentlyLoading = loadingModule === module.id;

              return (
                <Card 
                  key={module.id}
                  className={`border transition-all duration-200 ${getCategoryColor(module.category)} ${
                    isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md hover:border-blue-300'
                  } ${isCurrentlyLoading ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                  onClick={() => !isDisabled && !isCurrentlyLoading && handleModuleClick(module)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isDisabled ? 'bg-gray-100' : 
                          module.category === 'basic' ? 'bg-green-100' :
                          module.category === 'advanced' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                          <IconComponent className={`h-5 w-5 ${
                            isDisabled ? 'text-gray-400' : 
                            module.category === 'basic' ? 'text-green-600' :
                            module.category === 'advanced' ? 'text-blue-600' : 'text-purple-600'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {module.name}
                          </CardTitle>
                          <Badge variant="outline" className={`text-xs mt-1 ${getCategoryBadge(module.category)}`}>
                            {module.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(module.status)}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(module.status)}`}
                        >
                          {module.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {module.description}
                    </p>

                    {/* Module Details */}
                    <div className="space-y-2">
                      {module.estimatedTime && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">Estimated time:</span>
                          <span>{module.estimatedTime}</span>
                        </div>
                      )}
                      
                      {module.requirements && (
                        <div className="space-y-1">
                          <span className="text-xs font-medium text-gray-700">Requirements:</span>
                          <div className="flex flex-wrap gap-1">
                            {module.requirements.map((req, index) => (
                              <Badge 
                                key={index}
                                variant="outline" 
                                className="text-xs bg-gray-50 border-gray-200 text-gray-600"
                              >
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full ${
                        isDisabled 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : module.category === 'basic' ? 'bg-green-600 hover:bg-green-700 text-white' :
                            module.category === 'advanced' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                            'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                      disabled={isDisabled || isCurrentlyLoading}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModuleClick(module);
                      }}
                    >
                      {isCurrentlyLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Loading...</span>
                        </div>
                      ) : (
                        `Start ${module.name}`
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Help & Workflow Section */}
      <Card className="border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Data Preparation Workflow & Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-green-600" />
                Recommended Processing Order:
              </h4>
              <ol className="text-sm text-gray-600 space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium min-w-fit">1</span>
                  <div>
                    <strong>Trim Data</strong> - Remove outliers, bad data sections, and define depth ranges
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium min-w-fit">2</span>
                  <div>
                    <strong>Depth Matching</strong> - Align wells to common reference datum
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium min-w-fit">3</span>
                  <div>
                    <strong>Fill Missing Values</strong> - Interpolate gaps and missing data points
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium min-w-fit">4</span>
                  <div>
                    <strong>Smoothing</strong> - Reduce noise while preserving geological features
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium min-w-fit">5</span>
                  <div>
                    <strong>Normalization</strong> - Standardize scales and environmental corrections
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-medium min-w-fit">6</span>
                  <div>
                    <strong>Splicing & Merging</strong> - Combine processed data from multiple sources
                  </div>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                Best Practices & Tips:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Always backup original data before any processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Review quality control metrics after each step</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Apply smoothing sparingly to preserve data integrity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Document all processing parameters for reproducibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Validate results with geological knowledge and domain expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use multiple wells for correlation and validation</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}