/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';

interface PromoBannerCardProps {
  promo: {
    id: string | number;
    imageUrl: string;
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

const PromoBannerCard: React.FC<PromoBannerCardProps> = ({ promo }) => {
  return (
    <div 
      className="relative rounded-xl shadow-lg overflow-hidden h-48 bg-cover bg-center group w-full"
      style={{ backgroundImage: `url(${promo.imageUrl || `https://source.unsplash.com/random/600x250?promo&sig=${promo.id}`})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#339999]/80 to-[#f5af47]/60 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
        <h3 className="text-xl font-bold mb-1">{promo.title}</h3>
        {promo.subtitle && <p className="text-sm mb-3">{promo.subtitle}</p>}
        {promo.buttonText && promo.buttonLink && (
          <a
            href={promo.buttonLink}
            className="self-start bg-white text-[#339999] font-semibold py-1.5 px-4 rounded-full text-xs hover:bg-gray-100 transition-colors"
          >
            {promo.buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default PromoBannerCard;