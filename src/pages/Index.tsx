
import RAGContainer from "@/components/RAGContainer";
import { Hexagon } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="container mx-auto flex justify-center items-center mb-6">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/599f67d7-5b76-4210-ac4e-8231f4172670.png" 
            alt="Hexagon Logo" 
            className="h-8 mr-2"
          />
          <h1 className="text-2xl font-bold text-[#2A4B94] hidden md:block">
            RAG System
          </h1>
        </div>
      </header>
      <main className="container mx-auto">
        <RAGContainer />
      </main>
    </div>
  );
};

export default Index;
