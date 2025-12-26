import React, { useState } from 'react';

interface ProductImagesProps {
    images: string[];
    name: string;
}

export const ProductImages: React.FC<ProductImagesProps> = ({ images, name }) => {
    const [main, setMain] = useState(images[0] || '');

    return (
        <div className="space-y-4">
            <img
                src={main}
                alt={name}
                className="w-full object-cover rounded-lg"
            />

            {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setMain(image)}
                            className={`h-20 rounded border-2 overflow-hidden ${main === image ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${name} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};