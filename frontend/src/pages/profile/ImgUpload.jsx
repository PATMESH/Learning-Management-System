import React from "react";

const ImgUpload = ({ onChange, src, isLoading }) => (
  <label htmlFor="photo-upload" className="cursor-pointer">
    <div className="w-32 h-32 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
      {isLoading ? (
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-400 border-t-transparent"></div>
      ) : src ? (
        <img src={src} alt="Profile" className="object-cover w-full h-full" />
      ) : (
        <span className="text-gray-500 text-sm text-center px-2">
          Upload Image
        </span>
      )}
    </div>
    <input
      id="photo-upload"
      type="file"
      accept="image/*"
      onChange={onChange}
      className="hidden"
    />
  </label>
);

export default ImgUpload;
