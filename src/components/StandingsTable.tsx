import { memo } from 'react';
import { ConstructorStanding, PositionChange } from '../types/f1';
import { ConstructorRow } from './ConstructorRow';

interface StandingsTableProps {
  standings: ConstructorStanding[];
  getPositionChange: (constructor: ConstructorStanding) => PositionChange | null;
}

export const StandingsTable = memo(function StandingsTable({
  standings,
  getPositionChange
}: StandingsTableProps) {
  const firstPoints = standings.length > 0 ? parseFloat(standings[0].points) : 0;

  return (
    <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
      <thead>
        <tr className="bg-gray-900 text-white">
          <th className="p-4 text-left uppercase text-sm tracking-wider font-semibold">Position</th>
          <th className="p-4 text-left uppercase text-sm tracking-wider font-semibold">Constructeur</th>
          <th className="p-4 text-left uppercase text-sm tracking-wider font-semibold">Nationalité</th>
          <th className="p-4 text-left uppercase text-sm tracking-wider font-semibold">Points</th>
          <th className="p-4 text-left uppercase text-sm tracking-wider font-semibold">Écart</th>
          <th className="p-4 text-left uppercase text-sm tracking-wider font-semibold">Changement</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((constructor) => (
          <ConstructorRow
            key={constructor.Constructor.constructorId}
            constructor={constructor}
            firstPoints={firstPoints}
            positionChange={getPositionChange(constructor)}
          />
        ))}
      </tbody>
    </table>
  );
});