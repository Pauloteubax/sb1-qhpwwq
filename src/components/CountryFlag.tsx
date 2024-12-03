import { memo } from 'react';
import { countryFlags } from '../constants/f1Data';

interface CountryFlagProps {
  nationality: string;
}

export const CountryFlag = memo(function CountryFlag({
  nationality
}: CountryFlagProps) {
  const normalizedNationality = nationality.toLowerCase();
  
  return (
    <img
      className="w-8 h-5 object-cover rounded shadow-sm"
      src={countryFlags[normalizedNationality] || `https://via.placeholder.com/32x20?text=${nationality}`}
      alt={nationality}
      loading="lazy"
    />
  );
});