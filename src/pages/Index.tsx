import { useState } from "react";
import { Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import ResultsDisplay from "@/components/ResultsDisplay";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  // Mock diseases for demo purposes
  const mockDiseases = [
    "Healthy",
    "Sigatoka",
    "Panama Disease",
    "Banana Bunchy Top",
    "Cordana Leaf Spot"
  ];

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setPrediction(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image uploaded",
      description: "Ready to analyze the banana leaf",
    });
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setPrediction(null);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock prediction - randomly select a disease
    const randomPrediction = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
    setPrediction(randomPrediction);
    setIsAnalyzing(false);

    toast({
      title: "Analysis complete",
      description: "Disease detection results are ready",
    });

    // TODO: Replace with actual API call when backend is ready
    // const formData = new FormData();
    // formData.append('image', selectedFile);
    // 
    // const response = await fetch('YOUR_BACKEND_URL/predict', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const data = await response.json();
    // setPrediction(data.prediction);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary p-2">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Banana Leaf Disease Detector
              </h1>
              <p className="text-sm text-muted-foreground">
                AI-powered disease detection using KNN model
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Info Banner */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 flex items-start gap-4">
            <Sparkles className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-foreground mb-1">
                How It Works
              </h2>
              <p className="text-sm text-foreground/80">
                Upload a clear image of a banana leaf. Our K-Nearest Neighbors (KNN) machine learning model 
                will analyze the leaf and detect potential diseases including Sigatoka, Panama Disease, 
                Bunchy Top Virus, and Cordana Leaf Spot.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Note: Currently using mock predictions. Connect your Python backend to enable real-time analysis.
              </p>
            </div>
          </div>

          {/* Upload Section */}
          <ImageUpload
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
          />

          {/* Analyze Button */}
          {selectedImage && (
            <div className="flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="lg"
                className="px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-3" />
                    Analyzing Leaf...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Detect Disease
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Results Section */}
          {prediction && <ResultsDisplay prediction={prediction} />}

          {/* Backend Integration Info */}
          {prediction && (
            <div className="bg-muted/50 border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Ready to Connect Your Backend?
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                This frontend is ready to integrate with your Python Flask backend. 
                Simply update the API endpoint in the code to connect to your deployed model.
              </p>
              <code className="text-xs bg-card p-3 rounded-lg block overflow-x-auto border border-border">
                {`// In Index.tsx, uncomment and update:\nconst response = await fetch('YOUR_BACKEND_URL/predict', {\n  method: 'POST',\n  body: formData,\n});`}
              </code>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Banana Leaf Disease Detection System • Built with React & KNN Machine Learning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
