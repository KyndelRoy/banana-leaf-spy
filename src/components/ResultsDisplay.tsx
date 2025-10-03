import { CheckCircle2, AlertCircle, Info, Leaf } from "lucide-react";
import { Card } from "./ui/card";

interface ResultsDisplayProps {
  prediction: string | null;
  confidence?: number;
}

const ResultsDisplay = ({ prediction, confidence = 85 }: ResultsDisplayProps) => {
  if (!prediction) return null;

  const diseaseInfo: Record<string, { icon: any; color: string; description: string; severity: string }> = {
    "Healthy": {
      icon: CheckCircle2,
      color: "text-success",
      description: "The banana leaf appears to be healthy with no signs of disease.",
      severity: "No action needed"
    },
    "Sigatoka": {
      icon: AlertCircle,
      color: "text-warning",
      description: "Black Sigatoka disease detected. This fungal disease causes dark spots on leaves.",
      severity: "Moderate - Apply fungicide treatment"
    },
    "Panama Disease": {
      icon: AlertCircle,
      color: "text-destructive",
      description: "Panama disease detected. A serious fungal infection affecting the vascular system.",
      severity: "Severe - Isolate affected plants"
    },
    "Banana Bunchy Top": {
      icon: AlertCircle,
      color: "text-destructive",
      description: "Bunchy Top Virus detected. Transmitted by aphids, causes stunted growth.",
      severity: "Severe - Remove infected plants"
    },
    "Cordana Leaf Spot": {
      icon: AlertCircle,
      color: "text-warning",
      description: "Cordana leaf spot detected. Fungal disease causing brown spots on leaves.",
      severity: "Moderate - Apply copper-based fungicide"
    }
  };

  const info = diseaseInfo[prediction] || diseaseInfo["Healthy"];
  const Icon = info.icon;

  return (
    <div className="w-full animate-in slide-in-from-bottom-4 duration-500">
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/20 border-2 border-primary/20">
        <div className="flex items-start gap-4">
          <div className={`rounded-full bg-primary/10 p-3 ${info.color}`}>
            <Icon className="h-8 w-8" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-foreground">{prediction}</h3>
              <span className="text-sm font-medium text-muted-foreground">
                {confidence}% confidence
              </span>
            </div>
            
            <p className="text-foreground/80 mb-4">{info.description}</p>
            
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border">
              <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Recommended Action:</p>
                <p className="text-sm text-muted-foreground">{info.severity}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Leaf className="h-4 w-4" />
              <span>Analysis based on KNN model trained on banana leaf dataset</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
