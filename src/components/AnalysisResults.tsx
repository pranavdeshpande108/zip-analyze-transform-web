
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info, FileCheck, Activity } from "lucide-react";

interface AnalysisResultsProps {
  staticAnalysis: {
    issues: {
      type: string;
      message: string;
      location: string;
    }[];
    metrics: {
      complexity: number;
      lines: number;
      functions: number;
    };
  } | null;
  behavioralAnalysis: {
    behaviors: {
      id: string;
      description: string;
      severity: string;
    }[];
    recommendations: string[];
  } | null;
}

export const AnalysisResults = ({ staticAnalysis, behavioralAnalysis }: AnalysisResultsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileCheck className="mr-2 h-5 w-5 text-blue-600" />
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="static">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="static" className="flex items-center">
              <Info className="mr-2 h-4 w-4" />
              Static Analysis
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Behavioral Analysis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="static" className="mt-4">
            {staticAnalysis ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Code Metrics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-700">
                        {staticAnalysis.metrics.complexity}
                      </p>
                      <p className="text-sm text-gray-700">Complexity</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-700">
                        {staticAnalysis.metrics.lines}
                      </p>
                      <p className="text-sm text-gray-700">Lines of Code</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-700">
                        {staticAnalysis.metrics.functions}
                      </p>
                      <p className="text-sm text-gray-700">Functions</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Issues Detected</h3>
                  {staticAnalysis.issues.length > 0 ? (
                    <div className="space-y-2">
                      {staticAnalysis.issues.map((issue, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-3 flex items-start"
                        >
                          <div className="mr-3 mt-1">
                            {issue.type === 'error' ? (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            ) : (
                              <Info className="h-5 w-5 text-amber-500" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={issue.type === 'error' ? "destructive" : "outline"}
                                className="uppercase text-xs"
                              >
                                {issue.type}
                              </Badge>
                              <p className="text-sm text-gray-500">{issue.location}</p>
                            </div>
                            <p className="mt-1">{issue.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No issues detected.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <p>Static analysis results are loading...</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="behavioral" className="mt-4">
            {behavioralAnalysis ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Detected Behaviors</h3>
                  <div className="space-y-2">
                    {behavioralAnalysis.behaviors.map((behavior, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-3 flex items-start"
                      >
                        <div className="mr-3 mt-0.5">
                          <Activity className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  behavior.severity === 'high'
                                    ? "destructive"
                                    : behavior.severity === 'medium'
                                    ? "default"
                                    : "outline"
                                }
                                className="uppercase text-xs"
                              >
                                {behavior.severity}
                              </Badge>
                              <p className="text-sm font-mono">{behavior.id}</p>
                            </div>
                          </div>
                          <p className="mt-1">{behavior.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <ul className="list-disc ml-5 space-y-2">
                      {behavioralAnalysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <p>Behavioral analysis results are loading...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
