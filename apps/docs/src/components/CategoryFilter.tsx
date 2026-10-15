import type { CategoryFilter } from '../lib/categories';

interface CategoryOption {
  category: CategoryFilter;
  count: number;
}

interface CategoryFilterProps {
  options: CategoryOption[];
  value: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

export function CategoryFilterBar({
  options,
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="filter-block">
      <div className="filter-block__label" id="category-filter-label">
        Category
      </div>
      <div
        className="filter-chip-row"
        role="listbox"
        aria-labelledby="category-filter-label"
        aria-label="Filter by category"
      >
        {options.map((option) => {
          const selected = option.category === value;

          return (
            <button
              key={option.category}
              type="button"
              role="option"
              aria-selected={selected}
              className={
                selected
                  ? 'filter-chip filter-chip--active'
                  : 'filter-chip'
              }
              onClick={() => onChange(option.category)}
            >
              <span>{option.category}</span>
              <span className="filter-chip__count">
                {option.count.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
