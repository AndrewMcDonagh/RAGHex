
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";

interface DocumentListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
  isProcessing: boolean;
}

const DocumentList = ({ files, onRemoveFile, isProcessing }: DocumentListProps) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Uploaded Documents</h3>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between p-3 bg-white rounded-lg border"
          >
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-md bg-rag-blue/10 flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-rag-blue" />
              </div>
              <div>
                <p className="font-medium text-sm truncate max-w-[200px] sm:max-w-[300px] md:max-w-none">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              disabled={isProcessing}
              onClick={() => onRemoveFile(index)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
