interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
  scopeLabel: string;
}

export function SearchField({
  value,
  onChange,
  resultCount,
  totalCount,
  scopeLabel,
}: SearchFieldProps) {
  return (
    <div className="search-field">
      <label className="search-field__label" htmlFor="icon-search">
        Search icons
      </label>
      <input
        id="icon-search"
        className="search-field__input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Filter by component name…"
        autoComplete="off"
        spellCheck={false}
      />
      <p className="search-field__meta" aria-live="polite">
        {resultCount.toLocaleString()} of {totalCount.toLocaleString()} icons
        {scopeLabel ? ` · ${scopeLabel}` : ''}
      </p>
    </div>
  );
}
