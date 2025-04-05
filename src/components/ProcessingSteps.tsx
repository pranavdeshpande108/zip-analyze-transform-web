
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Loader2, FolderOpen, FileSearch, Cog, ArrowRight } from 'lucide-react';

interface ProcessingStepsProps {
  currentStep: number;
  extractedPath: string | null;
}

export const ProcessingSteps = ({ currentStep, extractedPath }: ProcessingStepsProps) => {
  const steps = [
    {
      title: 'Extract ZIP',
      icon: FolderOpen,
      description: 'Extract contents from ZIP file',
      result: extractedPath ? `Extracted to: ${extractedPath}` : '',
      status: currentStep >= 1 ? (currentStep > 1 ? 'completed' : 'processing') : 'pending'
    },
    {
      title: 'Static Code Analysis',
      icon: FileSearch,
      description: 'Analyze code structure and issues',
      result: currentStep > 2 ? 'Analysis completed' : '',
      status: currentStep >= 2 ? (currentStep > 2 ? 'completed' : 'processing') : 'pending'
    },
    {
      title: 'Behavior Analysis',
      icon: Cog,
      description: 'Process code through behavioral model',
      result: currentStep > 3 ? 'Analysis completed' : '',
      status: currentStep >= 3 ? (currentStep > 3 ? 'completed' : 'processing') : 'pending'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={index}>
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    {step.status === 'completed' ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : step.status === 'processing' ? (
                      <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium flex items-center">
                        <Icon className="h-5 w-5 mr-2 text-blue-600" />
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-500">{step.description}</p>
                    
                    {step.result && (
                      <div className="mt-2 text-sm bg-blue-50 p-2 rounded border border-blue-100">
                        {step.result}
                      </div>
                    )}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="ml-3 pl-3 my-2">
                    <ArrowRight className="h-4 w-4 text-gray-300 rotate-90 ml-[-8px]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
