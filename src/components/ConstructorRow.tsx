import { memo } from 'react';
import { ConstructorStanding, PositionChange } from '../types/f1';
import { constructorWikipediaURLs } from '../constants/f1Data';
import { PositionChangeIndicator } from './PositionChangeIndicator';
import { ConstructorLogo } from './ConstructorLogo';
import { CountryFlag } from './CountryFlag';

interface ConstructorRowProps {
  constructor: ConstructorStanding;
  firstPoints: number;
  positionChange: PositionChange | null;
}

export const ConstructorRow = memo(function ConstructorRow({
  constructor,
  firstPoints,
  positionChange
}: ConstructorRowProps) {
  const pointsDifference = firstPoints - parseFloat(constructor.points);
  const wikiURL = constructorWikipediaURLs[constructor.Constructor.constructorId] || '#';

  const handleClick = () => {
    window.open(wikiURL, '_blank', 'noopener,noreferrer');
  };

  return (
    <tr
      className="hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <td className="p-4 font-semibold">{constructor.position}</td>
      <td className="p-4">
        <div className="flex items-center gap-4">
          <ConstructorLogo
            constructorId={constructor.Constructor.constructorId}
            name={constructor.Constructor.name}
          />
          <span className="font-medium">{constructor.Constructor.name}</span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <CountryFlag nationality={constructor.Constructor.nationality} />
          <span>{constructor.Constructor.nationality}</span>
        </div>
      </td>
      <td className="p-4 font-bold text-lg text-red-600">{constructor.points}</td>
      <td className="p-4 text-gray-600">
        {constructor.position === '1' ? '-' : `+${pointsDifference.toFixed(0)}`}
      </td>
      <td className="p-4">
        <PositionChangeIndicator change={positionChange} />
      </td>
    </tr>
  );
});