import { memo, useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useF1Seasons } from '../hooks/useF1Seasons';
import { LoadingSpinner } from './LoadingSpinner';
import clsx from 'clsx';

interface SeasonSelectorProps {
  selectedSeasonId: number | undefined;
  onSeasonChange: (seasonId: number) => void;
}

export const SeasonSelector = memo(function SeasonSelector({
  selectedSeasonId,
  onSeasonChange
}: SeasonSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { seasons, loading, error } = useF1Seasons();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return null;

  const currentYear = new Date().getFullYear();
  const availableSeasons = Array.from({ length: currentYear - 2009 }, (_, i) => ({
    year: currentYear - i,
    current: currentYear === (currentYear - i)
  }));

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-x-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {selectedSeasonId ? `Saison ${selectedSeasonId}` : 'Sélectionner une saison'}
        <ChevronDown 
          className={clsx(
            "h-4 w-4 text-gray-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
        >
          <div className="py-1 max-h-96 overflow-y-auto">
            {availableSeasons.map((season) => (
              <button
                key={season.year}
                onClick={() => {
                  onSeasonChange(season.year);
                  setIsOpen(false);
                }}
                className={clsx(
                  'flex w-full items-center px-4 py-2 text-sm transition-colors',
                  selectedSeasonId === season.year
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <span className="flex-1 text-left">Saison {season.year}</span>
                {season.current && (
                  <span className="ml-2 text-xs font-medium bg-red-100 text-red-800 rounded-full px-2 py-0.5">
                    Actuelle
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});