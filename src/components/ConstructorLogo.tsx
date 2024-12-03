import { memo } from 'react';
import { constructorImages } from '../constants/f1Data';

interface ConstructorLogoProps {
  constructorId: string;
  name: string;
}

export const ConstructorLogo = memo(function ConstructorLogo({
  constructorId,
  name
}: ConstructorLogoProps) {
  return (
    <img
      className="w-16 h-16 object-contain transition-transform hover:scale-110"
      src={constructorImages[constructorId] || `https://via.placeholder.com/64?text=${name}`}
      alt={name}
      loading="lazy"
    />
  );
});