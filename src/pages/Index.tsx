
import { Search } from "lucide-react";
import RAGContainer from "@/components/RAGContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rag-purple to-rag-blue bg-clip-text text-transparent">Document Q&A System</h1>
        <p className="text-gray-600 mt-2">Upload documents and ask questions to get AI-powered answers</p>
      </header>
      
      <main className="container mx-auto">
        <RAGContainer />
      </main>
    </div>
  );
};

export default Index;
