
import { File, Code, Activity } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-6">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <File className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">ZIP Analyze Transform</h1>
              <p className="text-blue-200 text-sm">Code Analysis & Transformation Platform</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-blue-300" />
              <span>Static Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-300" />
              <span>Behavioral Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
