export const FileUpload = ({ 
    selectedFile, 
    onFileChange, 
    accept = "image/*" 
  }) => {
    return (
      <div>
        <input
          type="file"
          className="w-full mb-2 p-1 border-2 rounded-md bg-[#FFFFFF] border-[#bccdbc] text-[#9CA2AF] focus:border-blue-500"
          onChange={(e) => {
            const file = e.target.files[0];
            onFileChange(file);
          }}
          accept={accept}
        />
        {selectedFile && (
          <p className="text-sm text-gray-600 mt-1">
            Selected: {selectedFile.name}
          </p>
        )}
      </div>
    );
  };