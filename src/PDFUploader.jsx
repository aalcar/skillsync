import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
//import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";


const PdfUploader = () => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const pdfFile = acceptedFiles[0];
    if (pdfFile) {
      setFile(pdfFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-xl shadow-md bg-white w-96">
      <div
        {...getRootProps()}
        className="cursor-pointer flex flex-col items-center justify-center w-full h-32 bg-gray-100 hover:bg-gray-200 rounded-lg"
      >
        <input {...getInputProps()} />
        <UploadCloud size={40} className="text-gray-500 mb-2" />
        <p className="text-gray-700">Upload Your Resume Here</p>
      </div>

      {file && (
        <div className="mt-4 text-center">
          <p className="text-sm font-semibold">{file.name}</p>
          <Button variant="outline" className="mt-2" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
