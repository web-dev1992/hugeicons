import { useEffect, useMemo, useState } from 'react';
import { CategoryFilterBar } from './components/CategoryFilter';
import { CopyToast } from './components/CopyToast';
import { LetterFilterBar } from './components/LetterFilter';
import { SearchField } from './components/SearchField';
import { VirtualizedIconGrid } from './components/VirtualizedIconGrid';
import { ALL_CATEGORY, type CategoryFilter, type LetterFilter } from './lib/categories';
import { copyText } from './lib/clipboard';
import {
  filterIcons,
  getCategoryCounts,
  getLetterCounts,
  iconCatalog,
  type IconEntry,
} from './lib/icons';

type ToastTone = 'success' | 'error';

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>(ALL_CATEGORY);
  const [letter, setLetter] = useState<LetterFilter>('All');
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(
    null,
  );

  const categoryOptions = useMemo(
    () => getCategoryCounts(iconCatalog),
    [],
  );

  const letterScopedIcons = useMemo(
    () =>
      filterIcons(iconCatalog, {
        query: '',
        category,
        letter: 'All',
      }),
    [category],
  );

  const letterOptions = useMemo(
    () => getLetterCounts(letterScopedIcons),
    [letterScopedIcons],
  );

  const filteredIcons = useMemo(
    () => filterIcons(iconCatalog, { query, category, letter }),
    [query, category, letter],
  );

  const scopeLabel = useMemo(() => {
    const parts: string[] = [];
    if (category !== ALL_CATEGORY) {
      parts.push(category);
    }
    if (letter !== 'All') {
      parts.push(`“${letter}”`);
    }
    return parts.join(' · ');
  }, [category, letter]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleCategoryChange = (next: CategoryFilter) => {
    setCategory(next);
    setLetter('All');
  };

  const handleCopy = async (entry: IconEntry) => {
    const succeeded = await copyText(entry.importStatement);

    if (succeeded) {
      setToast({ message: 'Import copied!', tone: 'success' });
      return;
    }

    setToast({
      message: 'Could not copy. Select and copy the import manually.',
      tone: 'error',
    });
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__brand">
          <img
            className="hero__logo"
            src="/logo.svg"
            alt="Hugeicons"
            width={180}
            height={32}
          />
        </div>
        <h1 className="hero__title">Icon documentation</h1>
        <p className="hero__subtitle">
          Browse free icons by category or letter, then click a name to copy
          its import statement.
        </p>
      </header>

      <main className="main">
        <div className="filters">
          <CategoryFilterBar
            options={categoryOptions}
            value={category}
            onChange={handleCategoryChange}
          />
          <LetterFilterBar
            options={letterOptions}
            value={letter}
            onChange={setLetter}
          />
          <SearchField
            value={query}
            onChange={setQuery}
            resultCount={filteredIcons.length}
            totalCount={iconCatalog.length}
            scopeLabel={scopeLabel}
          />
        </div>

        {filteredIcons.length === 0 ? (
          <div className="empty-state" role="status">
            <h2 className="empty-state__title">
              No icons match
              {query.trim() ? ` “${query.trim()}”` : ''}
              {scopeLabel ? ` in ${scopeLabel}` : ''}
            </h2>
            <p className="empty-state__body">
              Try another category, clear the letter filter, or search with a
              shorter name fragment.
            </p>
          </div>
        ) : (
          <VirtualizedIconGrid icons={filteredIcons} onCopy={handleCopy} />
        )}
      </main>

      <CopyToast message={toast?.message ?? null} tone={toast?.tone ?? 'success'} />
    </div>
  );
}
