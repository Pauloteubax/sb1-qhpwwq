import { memo } from 'react';
import { F1Team, PositionChange } from '../types/sportmonks';
import { TeamRow } from './TeamRow';

interface TeamsTableProps {
  teams: F1Team[];
  getPositionChange: (team: F1Team) => PositionChange | null;
}

export const TeamsTable = memo(function TeamsTable({
  teams,
  getPositionChange
}: TeamsTableProps) {
  const firstPoints = teams.length > 0 ? teams[0].points : 0;

  return (
    <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
      <thead>
        <tr className="bg-gray-900 text-white">
          <th className="p-4 text-left">Position</th>
          <th className="p-4 text-left">Équipe</th>
          <th className="p-4 text-left">Nationalité</th>
          <th className="p-4 text-left">Points</th>
          <th className="p-4 text-left">Écart</th>
          <th className="p-4 text-left">Évolution</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <TeamRow
            key={team.id}
            team={team}
            firstPoints={firstPoints}
            positionChange={getPositionChange(team)}
          />
        ))}
      </tbody>
    </table>
  );
});