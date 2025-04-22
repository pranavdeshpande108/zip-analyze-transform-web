
import { useState, useEffect } from 'react';
import { FileUploader } from '../components/FileUploader';
import { Header } from '../components/Header';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileArchive } from "lucide-react";

const Index = () => {
  // Static section files
  const [zipFile, setZipFile] = useState<File | null>(null);
  // Behavioral section files
  const [behaviorZipFile, setBehaviorZipFile] = useState<File | null>(null);
  const [pcapFile, setPcapFile] = useState<File | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [behaviorProcessing, setBehaviorProcessing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeApp = () => {
      console.log("Application initialized in current context");
      setIsInitialized(true);
    };
    const timer = setTimeout(() => {
      initializeApp();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStaticFileSelected = (file: File | null) => {
    setZipFile(file);
    if (file) {
      toast({
        title: "Static Analysis File Selected",
        description: `${file.name} is ready for static code analysis.`
      });
    }
  };

  const handleBehaviorZipSelected = (file: File | null) => {
    setBehaviorZipFile(file);
    if (file) {
      toast({
        title: "Behavioral Analysis ZIP Selected",
        description: `${file.name} will be used alongside the PCAP.`
      });
    }
  };

  const handleBehaviorFileSelected = (file: File | null) => {
    setPcapFile(file);
    if (file) {
      toast({
        title: "Behavioral Analysis File Selected",
        description: `${file.name} is ready for behavioral analysis.`
      });
    }
  };

  const handleMainReport = () => {
    // Use main ZIP and main PCAP
    if (!zipFile || !pcapFile) {
      toast({
        title: "Both files are required",
        description: "Please upload both a ZIP and a PCAP file before proceeding.",
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Analysis Complete",
        description: "Main report analysis finished. (This is a placeholder demo)"
      });
    }, 2000);
  };

  const handleBehaviorProcess = () => {
    // Both must be uploaded
    if (!behaviorZipFile || !pcapFile) {
      toast({
        title: "Both ZIP and PCAP are required",
        description: "Please upload both files for behavioral analysis.",
        variant: "destructive"
      });
      return;
    }
    setBehaviorProcessing(true);
    setTimeout(() => {
      setBehaviorProcessing(false);
      toast({
        title: "Behavioral Analysis Complete",
        description: "Behavioral report is ready. (This is a placeholder demo)"
      });
    }, 2000);
  };

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
                onProcess={() => {}} // For simplicity, not required yet
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
                Behavioral Analysis (ZIP + PCAP Upload)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <FileUploader 
                  onFileSelected={handleBehaviorZipSelected}
                  selectedFile={behaviorZipFile}
                  onProcess={() => {}}
                  isProcessing={false}
                />
                <FileUploader 
                  onFileSelected={handleBehaviorFileSelected}
                  selectedFile={pcapFile}
                  onProcess={handleBehaviorProcess}
                  isProcessing={behaviorProcessing}
                />
                <p className="mt-4 text-xs text-gray-500">
                  Upload BOTH a .zip file (related code) <b>and</b> a .pcap network capture for complete behavioral analysis. Both are required.
                </p>
              </div>
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
