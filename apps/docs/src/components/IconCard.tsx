import { HugeiconsIcon } from '@hugeicons/react';
import type { IconEntry } from '../lib/icons';

interface IconCardProps {
  entry: IconEntry;
  onCopy: (entry: IconEntry) => void;
}

export function IconCard({ entry, onCopy }: IconCardProps) {
  return (
    <article className="icon-card">
      <button
        type="button"
        className="icon-card__preview"
        onClick={() => onCopy(entry)}
        aria-label={`Copy import for ${entry.name}`}
        title="Copy import statement"
      >
        <HugeiconsIcon icon={entry.icon} size={28} strokeWidth={1.5} />
      </button>

      <button
        type="button"
        className="icon-card__name"
        onClick={() => onCopy(entry)}
        title={`Click to copy: ${entry.importStatement}`}
      >
        {entry.name}
      </button>

      <p className="icon-card__meta">
        <span className="icon-card__category">{entry.category}</span>
        <span className="icon-card__package">{entry.packageName}</span>
      </p>
    </article>
  );
}
