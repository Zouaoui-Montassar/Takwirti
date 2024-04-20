import React, { useState } from 'react';

const ImageUploader = ({ onImageUpload, imageLink }) => {
  const [image, setImage] = useState(imageLink);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    setImage(file);
    onImageUpload(file);
  };

  return (
    <div className='border border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200 '>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className='hidden'
        id="upload-button"
      />
      <label
        htmlFor="upload-button"
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-block cursor-pointer m-2"
      >
        Sélectionner une image
      </label>
      {image ? (
        <img src={URL.createObjectURL(image)} alt="Selected" className='w-[200px] h-[200px] mx-[140px]' />
      ) : (
        <img src={imageLink} alt="Existing ( terrain supposé yabda fih taswira par defaut ltext hedha abaathou)" className='w-[200px] h-[200px] mx-[140px]' />
      )}
      <p className="text-sm text-gray-500">Note: Upon clicking confirm , the upload of the image may take some time. Please be patient.</p>
    </div>
  );
};

export default ImageUploader;
