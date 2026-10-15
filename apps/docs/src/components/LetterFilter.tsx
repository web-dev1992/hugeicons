import type { LetterFilter } from '../lib/categories';

interface LetterOption {
  letter: LetterFilter;
  count: number;
}

interface LetterFilterProps {
  options: LetterOption[];
  value: LetterFilter;
  onChange: (letter: LetterFilter) => void;
}

export function LetterFilterBar({
  options,
  value,
  onChange,
}: LetterFilterProps) {
  return (
    <div className="filter-block">
      <div className="filter-block__label" id="letter-filter-label">
        Starts with
      </div>
      <div
        className="filter-chip-row filter-chip-row--compact"
        role="listbox"
        aria-labelledby="letter-filter-label"
        aria-label="Filter by starting letter"
      >
        {options.map((option) => {
          const selected = option.letter === value;

          return (
            <button
              key={option.letter}
              type="button"
              role="option"
              aria-selected={selected}
              title={`${option.count.toLocaleString()} icons`}
              className={
                selected
                  ? 'filter-chip filter-chip--letter filter-chip--active'
                  : 'filter-chip filter-chip--letter'
              }
              onClick={() => onChange(option.letter)}
            >
              {option.letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
