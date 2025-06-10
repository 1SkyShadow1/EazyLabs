
import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { AIEstimator } from "@/components/AIEstimator";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { MatrixBackground } from "@/components/MatrixBackground";
import { MatrixLoader } from "@/components/MatrixLoader";
import { MatrixWelcome } from "@/components/MatrixWelcome";

const Index = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  useEffect(() => {
    // Add Matrix-style CSS to the document
    const style = document.createElement('style');
    style.textContent = `
      body {
        background: #000000;
        overflow-x: hidden;
      }
      
      * {
        scroll-behavior: smooth;
      }
      
      .matrix-container {
        background: linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  const handleEnterMatrix = () => {
    setWelcomeComplete(true);
    setTimeout(() => setShowMatrix(true), 500);
  };

  if (!loadingComplete) {
    return <MatrixLoader onComplete={handleLoadingComplete} />;
  }

  if (!welcomeComplete) {
    return <MatrixWelcome onEnter={handleEnterMatrix} />;
  }

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden matrix-container">
      <MatrixBackground />
      <div className={`relative z-10 transition-opacity duration-1000 ${showMatrix ? 'opacity-100' : 'opacity-0'}`}>
        <Navigation />
        <Hero />
        <About />
        <Portfolio />
        <AIEstimator />
        <Blog />
        <Contact />
      </div>
    </div>
  );
};

export default Index;
