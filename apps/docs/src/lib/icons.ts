import type { IconSvgElement } from '@hugeicons/react';
import * as coreFreeIcons from '@hugeicons/core-free-icons';
import {
  ALL_CATEGORY,
  categorizeIconName,
  getIconLetter,
  type CategoryFilter,
  type IconCategory,
  type LetterFilter,
} from './categories';

export const CORE_FREE_ICONS_PACKAGE = '@hugeicons/core-free-icons' as const;

export type IconPackageName = typeof CORE_FREE_ICONS_PACKAGE;

export interface IconEntry {
  name: string;
  packageName: IconPackageName;
  icon: IconSvgElement;
  importStatement: string;
  category: IconCategory;
  letter: string;
}

export interface IconFilters {
  query: string;
  category: CategoryFilter;
  letter: LetterFilter;
}

function isIconSvgObject(value: unknown): value is IconSvgElement {
  if (!Array.isArray(value) || value.length === 0) {
    return false;
  }

  const first = value[0];
  return Array.isArray(first) && typeof first[0] === 'string';
}

function isIconExportName(name: string): boolean {
  return /Icon$/i.test(name) && !/FreeIcons$/.test(name);
}

/** Prefer numbered / longer PascalCase *Icon names over short aliases. */
function pickCanonicalName(names: string[]): string {
  const candidates = names.filter(isIconExportName);
  const list = candidates.length > 0 ? candidates : names;

  return list.slice().sort((a, b) => {
    const digitScore = (value: string) => (/\d/.test(value) ? 1 : 0);
    const pascalScore = (value: string) => (/^[A-Z]/.test(value) ? 1 : 0);

    return (
      digitScore(b) - digitScore(a) ||
      pascalScore(b) - pascalScore(a) ||
      b.length - a.length ||
      a.localeCompare(b)
    );
  })[0];
}

function buildImportStatement(name: string, packageName: IconPackageName): string {
  return `import { ${name} } from "${packageName}";`;
}

/**
 * Derive the gallery list from live package exports (no hand-maintained registry).
 * Dedupes alias exports that point at the same icon data object.
 */
function collectIconsFromPackage(
  exports: Record<string, unknown>,
  packageName: IconPackageName,
): IconEntry[] {
  const aliasesByIcon = new Map<IconSvgElement, string[]>();

  for (const [exportName, value] of Object.entries(exports)) {
    if (!isIconSvgObject(value)) {
      continue;
    }

    const aliases = aliasesByIcon.get(value) ?? [];
    aliases.push(exportName);
    aliasesByIcon.set(value, aliases);
  }

  const entries: IconEntry[] = [];

  for (const [icon, aliases] of aliasesByIcon) {
    const name = pickCanonicalName(aliases);
    entries.push({
      name,
      packageName,
      icon,
      importStatement: buildImportStatement(name, packageName),
      category: categorizeIconName(name),
      letter: getIconLetter(name),
    });
  }

  return entries.sort((a, b) => a.name.localeCompare(b.name));
}

export const iconCatalog: IconEntry[] = collectIconsFromPackage(
  coreFreeIcons as Record<string, unknown>,
  CORE_FREE_ICONS_PACKAGE,
);

export function getCategoryCounts(
  icons: IconEntry[],
): Array<{ category: CategoryFilter; count: number }> {
  const counts = new Map<IconCategory, number>();

  for (const entry of icons) {
    counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
  }

  const categories = [...counts.entries()]
    .filter(([, count]) => count > 0)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([category, count]) => ({ category, count }));

  return [{ category: ALL_CATEGORY, count: icons.length }, ...categories];
}

export function getLetterCounts(
  icons: IconEntry[],
): Array<{ letter: LetterFilter; count: number }> {
  const counts = new Map<string, number>();

  for (const entry of icons) {
    counts.set(entry.letter, (counts.get(entry.letter) ?? 0) + 1);
  }

  const letters: LetterFilter[] = [
    ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') as Array<Exclude<LetterFilter, 'All' | '#'>>,
    '#',
  ];

  return [
    { letter: 'All', count: icons.length },
    ...letters
      .filter((letter) => (counts.get(letter) ?? 0) > 0)
      .map((letter) => ({ letter, count: counts.get(letter) ?? 0 })),
  ];
}

export function filterIcons(
  icons: IconEntry[],
  { query, category, letter }: IconFilters,
): IconEntry[] {
  const normalized = query.trim().toLowerCase();

  return icons.filter((entry) => {
    if (category !== ALL_CATEGORY && entry.category !== category) {
      return false;
    }

    if (letter !== 'All' && entry.letter !== letter) {
      return false;
    }

    if (normalized && !entry.name.toLowerCase().includes(normalized)) {
      return false;
    }

    return true;
  });
}
