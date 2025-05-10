
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from 'react-router-dom';
import { Upload, File, Check, X } from 'lucide-react';

const PrescriptionUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const navigate = useNavigate();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Vérifier le type de fichier
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        toast.error("Format de fichier non supporté. Veuillez utiliser JPG, PNG ou PDF.");
        return;
      }
      
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Le fichier est trop volumineux. Taille maximum: 5MB");
        return;
      }
      
      setSelectedFile(file);
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Veuillez sélectionner un fichier");
      return;
    }
    
    setIsUploading(true);
    
    // Simuler l'upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      toast.success("Ordonnance téléchargée avec succès");
    }, 2000);
  };
  
  const handleContinue = () => {
    navigate('/checkout');
  };
  
  const handleReset = () => {
    setSelectedFile(null);
    setUploadComplete(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Télécharger votre ordonnance</CardTitle>
        <CardDescription>
          Veuillez télécharger une photo ou un scan de votre ordonnance médicale
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!uploadComplete ? (
          <>
            <div className="mb-6 border-2 border-dashed rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="mb-4 flex justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <p className="mb-2 text-sm text-gray-600">
                Cliquez pour sélectionner ou déposez votre fichier ici
              </p>
              <p className="text-xs text-gray-500">
                Formats acceptés: JPG, PNG, PDF (max 5MB)
              </p>
              <Input
                id="prescription"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById('prescription')?.click()}
                disabled={isUploading}
              >
                Sélectionner un fichier
              </Button>
            </div>
            
            {selectedFile && (
              <div className="bg-medical-light p-3 rounded-md flex items-center gap-3">
                <File className="h-8 w-8 text-medical-primary flex-shrink-0" />
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="flex-shrink-0"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Ordonnance téléchargée</h3>
            <p className="text-gray-600 mb-4">
              Votre ordonnance a été téléchargée avec succès et sera validée par notre équipe de pharmaciens.
            </p>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Télécharger une autre ordonnance
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!uploadComplete ? (
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? 'Téléchargement...' : 'Télécharger'}
          </Button>
        ) : (
          <Button onClick={handleContinue}>
            Continuer vers le paiement
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PrescriptionUploader;
