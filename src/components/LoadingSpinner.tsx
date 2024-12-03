import { memo } from 'react';
import { Trophy } from 'lucide-react';

export const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Trophy className="w-12 h-12 text-red-600 animate-bounce" />
        <div className="absolute inset-0 animate-ping">
          <Trophy className="w-12 h-12 text-red-600 opacity-75" />
        </div>
      </div>
      <div className="text-gray-600 font-medium">
        Chargement du classement...
      </div>
      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-red-600 animate-progress" />
      </div>
    </div>
  );
});