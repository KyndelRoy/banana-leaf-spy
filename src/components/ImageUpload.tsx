import { Upload, Image as ImageIcon } from "lucide-react";
import { useState, useRef, DragEvent, useEffect } from "react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
}

const ImageUpload = ({ onImageSelect, selectedImage }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      onImageSelect(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onImageSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          onImageSelect(file);
          break;
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div className="w-full">
      {!selectedImage ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed p-12 
            transition-all duration-300 hover:border-primary
            ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border bg-card"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className={`
              rounded-full bg-primary/10 p-6 transition-all duration-300
              ${isDragging ? "scale-110" : ""}
            `}
            >
              <Upload
                className={`h-12 w-12 text-primary transition-transform duration-300 ${
                  isDragging ? "animate-float" : ""
                }`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Upload Banana Leaf Image
              </h3>
              <p className="text-muted-foreground">
                Drag and drop an image here, click to select, or paste from clipboard
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Supports: JPG, PNG, WEBP
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
          <img
            src={selectedImage}
            alt="Selected banana leaf"
            className="w-full h-auto max-h-[500px] object-contain"
          />
          <button
            onClick={handleClick}
            className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-card transition-colors"
          >
            Change Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
