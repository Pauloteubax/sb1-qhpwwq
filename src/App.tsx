import { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TeamsTable } from './components/TeamsTable';
import { SeasonSelector } from './components/SeasonSelector';
import { useF1Teams } from './hooks/useF1Teams';
import { RefreshCw, Trophy } from 'lucide-react';

function App() {
  const [selectedSeasonId, setSelectedSeasonId] = useState<number>(new Date().getFullYear());
  const { teams, loading, error, getPositionChange, retryLoadTeams } = useF1Teams(selectedSeasonId);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-10 h-10 text-red-600" />
              <h1 className="text-4xl font-bold text-gray-900">
                Championnat F1 des Constructeurs
              </h1>
            </div>
            <SeasonSelector
              selectedSeasonId={selectedSeasonId}
              onSeasonChange={setSelectedSeasonId}
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
              <p className="mb-2">{error}</p>
              <button
                onClick={retryLoadTeams}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </button>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : teams.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {selectedSeasonId 
                ? "Aucune donnée disponible pour cette saison."
                : "Veuillez sélectionner une saison."}
            </div>
          ) : (
            <TeamsTable
              teams={teams}
              getPositionChange={getPositionChange}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;