
import { useState, useEffect } from 'react';
import { FileUploader } from '../components/FileUploader';
import { Header } from '../components/Header';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileArchive } from "lucide-react";

const Index = () => {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [pcapFile, setPcapFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  // Ensure component is fully initialized across different contexts
  useEffect(() => {
    const initializeApp = () => {
      console.log("Application initialized in current context");
      setIsInitialized(true);
    };
    
    // Short timeout to ensure DOM is ready in all contexts
    const timer = setTimeout(() => {
      initializeApp();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleStaticFileSelected = (file: File) => {
    setZipFile(file);
    toast({
      title: "Static Analysis File Selected",
      description: `${file.name} is ready for static code analysis.`
    });
  };

  const handleBehaviorFileSelected = (file: File) => {
    setPcapFile(file);
    toast({
      title: "Behavioral Analysis File Selected",
      description: `${file.name} is ready for behavioral analysis.`
    });
  };

  const handleMainReport = () => {
    if (!zipFile || !pcapFile) {
      toast({
        title: "Both files are required",
        description: "Please upload both a ZIP and a PCAP file before proceeding.",
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);

    // Placeholder for triggering the actual analysis logic
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Analysis Complete",
        description: "Main report analysis finished. (This is a placeholder demo)"
      });
    }, 2000);
  };

  // If the component hasn't initialized yet, show a minimal loading state
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container max-w-5xl mx-auto px-4 py-8">
        {/* Two horizontal sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* STATIC CODE ANALYSIS SECTION */}
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center text-lg">
                <FileArchive className="h-6 w-6 text-blue-600" />
                Static Code Analysis (ZIP Upload)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader 
                onFileSelected={handleStaticFileSelected}
                selectedFile={zipFile}
                onProcess={() => {}}
                isProcessing={false}
              />
              <p className="mt-4 text-xs text-gray-500">Upload a .zip file containing your codebase for static analysis.</p>
            </CardContent>
          </Card>
          {/* BEHAVIORAL ANALYSIS SECTION */}
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center text-lg">
                <FileArchive className="h-6 w-6 text-blue-600" />
                Behavioral Analysis (PCAP Upload)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader 
                onFileSelected={handleBehaviorFileSelected}
                selectedFile={pcapFile}
                onProcess={() => {}}
                isProcessing={false}
              />
              <p className="mt-4 text-xs text-gray-500">Upload a .pcap file from a network capture for behavioral analysis.</p>
            </CardContent>
          </Card>
        </div>
        {/* MAIN REPORT BUTTON */}
        <div className="flex justify-center mt-10">
          <Button
            type="button"
            size="lg"
            className="bg-purple-600 text-white hover:bg-purple-700 transition-all px-8 py-4 rounded-lg text-lg shadow-[0_2px_8px_rgba(155,135,245,0.12)]"
            onClick={handleMainReport}
            disabled={isProcessing || !zipFile || !pcapFile}
          >
            {isProcessing ? "Generating Main Report..." : "Main Report"}
          </Button>
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
