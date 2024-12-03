import { memo } from 'react';
import clsx from 'clsx';
import { PositionChange } from '../types/f1';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';

interface PositionChangeIndicatorProps {
  change: PositionChange | null;
}

export const PositionChangeIndicator = memo(function PositionChangeIndicator({ 
  change 
}: PositionChangeIndicatorProps) {
  if (!change) return <MinusIcon className="w-4 h-4 text-gray-400" />;

  const Icon = {
    up: ArrowUpIcon,
    down: ArrowDownIcon,
    same: MinusIcon
  }[change.type];

  return (
    <div
      className={clsx(
        'flex items-center gap-1 font-semibold px-3 py-1.5 rounded-full text-sm',
        {
          'text-green-700 bg-green-50': change.type === 'up',
          'text-red-700 bg-red-50': change.type === 'down',
          'text-blue-700 bg-blue-50': change.type === 'same'
        }
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{change.value > 0 ? change.value : ''}</span>
    </div>
  );
});