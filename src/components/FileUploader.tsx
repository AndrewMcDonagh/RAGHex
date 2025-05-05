
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  onFilesUpload: (files: File[]) => void;
  isLoading: boolean;
}

const FileUploader = ({ onFilesUpload, isLoading }: FileUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const fileType = file.type;
      return fileType === 'application/pdf' || 
             fileType === 'text/plain' || 
             fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
             fileType === 'text/csv';
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF, TXT, DOCX, and CSV files are supported.",
        variant: "destructive"
      });
    }

    if (validFiles.length > 0) {
      onFilesUpload(validFiles);
    }
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div
        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-colors ${
          dragActive ? "border-rag-purple bg-rag-purple/5" : "border-gray-300"
        } min-h-[200px]`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          onChange={handleChange}
          accept=".pdf,.txt,.docx,.csv"
          disabled={isLoading}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 mb-2 rounded-full bg-rag-purple/10 flex items-center justify-center">
            <Upload className="h-7 w-7 text-rag-purple" />
          </div>
          <p className="mb-2 text-lg font-medium text-gray-700">
            {dragActive ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="mb-4 text-sm text-gray-500">
            Supported formats: PDF, TXT, DOCX, CSV
          </p>
          <Button
            onClick={onButtonClick}
            disabled={isLoading}
            variant="outline"
            className="border-rag-purple/50 hover:bg-rag-purple/10 hover:text-rag-purple-dark"
          >
            <FileText className="mr-2 h-4 w-4" />
            Select Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
