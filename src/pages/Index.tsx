
import { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { ProcessingSteps } from '../components/ProcessingSteps';
import { AnalysisResults } from '../components/AnalysisResults';
import { Header } from '../components/Header';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedPath, setExtractedPath] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<{
    staticAnalysis: any | null;
    behavioralAnalysis: any | null;
  }>({
    staticAnalysis: null,
    behavioralAnalysis: null
  });
  const { toast } = useToast();

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    toast({
      title: "File selected",
      description: `${selectedFile.name} is ready for processing.`
    });
  };

  const processFile = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a ZIP file first.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setCurrentStep(1);

    try {
      // Step 1: Extract ZIP file
      const path = await extractZipFile(file);
      setExtractedPath(path);
      setCurrentStep(2);
      
      // Step 2: Run static code analysis
      const staticResults = await runStaticAnalysis(path);
      setAnalysisResults(prev => ({ ...prev, staticAnalysis: staticResults }));
      setCurrentStep(3);
      
      // Step 3: Convert and run behavioral analysis
      const behavioralResults = await runBehavioralAnalysis(path, staticResults);
      setAnalysisResults(prev => ({ ...prev, behavioralAnalysis: behavioralResults }));
      setCurrentStep(4);
      
      toast({
        title: "Processing complete",
        description: "All analysis steps have been completed successfully."
      });
    } catch (error) {
      console.error("Error during processing:", error);
      toast({
        title: "Processing error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // These would normally interact with backend APIs
  const extractZipFile = async (file: File): Promise<string> => {
    // In a real app, this would call a backend API to extract the ZIP
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`/extracted/${file.name.replace('.zip', '')}`);
      }, 1500);
    });
  };

  const runStaticAnalysis = async (path: string): Promise<any> => {
    // In a real app, this would call a backend API to run static analysis
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          issues: [
            { type: 'warning', message: 'Unused variable detected', location: 'main.js:23' },
            { type: 'error', message: 'Potential memory leak', location: 'helper.js:45' }
          ],
          metrics: {
            complexity: 42,
            lines: 1024,
            functions: 58
          }
        });
      }, 2000);
    });
  };

  const runBehavioralAnalysis = async (path: string, staticResults: any): Promise<any> => {
    // In a real app, this would call a backend API to run behavioral analysis
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          behaviors: [
            { id: 'B001', description: 'Network communication pattern detected', severity: 'medium' },
            { id: 'B002', description: 'File system access pattern', severity: 'low' }
          ],
          recommendations: [
            'Implement proper error handling for network requests',
            'Review file system permissions'
          ]
        });
      }, 2500);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          <FileUploader 
            onFileSelected={handleFileSelected} 
            selectedFile={file}
            onProcess={processFile}
            isProcessing={isProcessing}
          />
          
          {(file || isProcessing) && (
            <ProcessingSteps 
              currentStep={currentStep} 
              extractedPath={extractedPath}
            />
          )}
          
          {currentStep >= 3 && analysisResults.staticAnalysis && (
            <AnalysisResults 
              staticAnalysis={analysisResults.staticAnalysis}
              behavioralAnalysis={analysisResults.behavioralAnalysis}
            />
          )}
        </div>
      </main>
      
      <footer className="mt-16 py-6 bg-blue-900 text-white">
        <div className="container text-center">
          <p>© 2025 ZIP Analyze Transform Web | For demonstration purposes only</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
