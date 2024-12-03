import { memo } from 'react';
import { TrophyIcon } from 'lucide-react';
import { SeasonSelector } from './SeasonSelector';

interface HeaderProps {
  currentYear: number;
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export const Header = memo(function Header({
  currentYear,
  selectedYear,
  onYearChange
}: HeaderProps) {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <TrophyIcon className="w-10 h-10 text-red-600" />
        <h1 className="text-4xl font-bold text-gray-900">
          Classement du Championnat F1 des Constructeurs
        </h1>
      </div>
      <SeasonSelector
        currentYear={currentYear}
        selectedYear={selectedYear}
        onYearChange={onYearChange}
      />
    </div>
  );
});