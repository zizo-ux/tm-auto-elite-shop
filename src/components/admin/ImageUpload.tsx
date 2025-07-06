
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { convertImageToBase64 } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Image, X, Upload } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload = ({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: "Too many images",
        description: `Maximum ${maxImages} images allowed`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const newImages: string[] = [];
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast({
            title: "File too large",
            description: `${file.name} is too large. Maximum 5MB per image.`,
            variant: "destructive",
          });
          continue;
        }
        const base64 = await convertImageToBase64(file);
        newImages.push(base64);
      }
      onImagesChange([...images, ...newImages]);
      toast({
        title: "Images uploaded",
        description: `${newImages.length} image(s) uploaded successfully`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Images ({images.length}/{maxImages})</h3>
        <Button
          type="button"
          variant="automotive-outline"
          size="sm"
          disabled={images.length >= maxImages || isUploading}
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Add Images'}
        </Button>
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border-2 border-automotive-warm-gray/20"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-automotive-red text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="border-2 border-dashed border-automotive-warm-gray/30 rounded-lg p-8 text-center">
          <Image className="w-12 h-12 text-automotive-warm-gray mx-auto mb-4" />
          <p className="text-automotive-warm-gray">No images uploaded yet</p>
          <p className="text-sm text-automotive-warm-gray/70">Click "Add Images" to upload</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
