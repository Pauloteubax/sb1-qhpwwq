import { memo } from 'react';
import { F1Team, PositionChange } from '../types/sportmonks';
import { PositionChangeIndicator } from './PositionChangeIndicator';

interface TeamRowProps {
  team: F1Team;
  firstPoints: number;
  positionChange: PositionChange | null;
}

export const TeamRow = memo(function TeamRow({
  team,
  firstPoints,
  positionChange
}: TeamRowProps) {
  const pointsDifference = firstPoints - team.points;

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="p-4 font-semibold">{team.position}</td>
      <td className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={team.logo_url}
            alt={`${team.name} logo`}
            className="w-16 h-16 object-contain"
            loading="lazy"
          />
          <span className="font-medium">{team.name}</span>
        </div>
      </td>
      <td className="p-4">{team.nationality}</td>
      <td className="p-4 font-bold text-lg text-red-600">{team.points}</td>
      <td className="p-4 text-gray-600">
        {team.position === 1 ? '-' : `+${pointsDifference}`}
      </td>
      <td className="p-4">
        <PositionChangeIndicator change={positionChange} />
      </td>
    </tr>
  );
});