import React, { useState } from 'react';

const ImageUploader = ( { onImageUpload }) => {
    const [image, setImage] = useState(null);

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
                className='hidden' // Cachez l'élément de type "file" natif
                id="upload-button" // Associez un ID pour l'élément de style personnalisé
            />
            <label 
                htmlFor="upload-button" // Utilisez l'ID de l'input comme référence pour le label
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-block cursor-pointer m-2"
            >
                Sélectionner une image
            </label>
            {image && <img src={URL.createObjectURL(image)} alt="Selected" className='w-[200px] h-[200px] mx-[140px]' />}
        </div>
    );
};

export default ImageUploader;
