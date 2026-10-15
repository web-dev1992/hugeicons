import { useEffect, useMemo, useRef, useState } from 'react';
import type { IconEntry } from '../lib/icons';
import { IconCard } from './IconCard';

const MIN_COLUMN_WIDTH = 148;
const ROW_HEIGHT = 148;
const GAP = 12;
const OVERSCAN_ROWS = 4;

interface VirtualizedIconGridProps {
  icons: IconEntry[];
  onCopy: (entry: IconEntry) => void;
}

export function VirtualizedIconGrid({ icons, onCopy }: VirtualizedIconGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 0, scrollTop: 0, height: 0 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const update = () => {
      setViewport({
        width: element.clientWidth,
        height: element.clientHeight,
        scrollTop: element.scrollTop,
      });
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
    element.addEventListener('scroll', update, { passive: true });

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener('scroll', update);
    };
  }, []);

  const columnCount = Math.max(
    1,
    Math.floor((viewport.width + GAP) / (MIN_COLUMN_WIDTH + GAP)),
  );
  const rowCount = Math.ceil(icons.length / columnCount);
  const totalHeight = rowCount * ROW_HEIGHT + Math.max(0, rowCount - 1) * GAP;

  const { startIndex, endIndex } = useMemo(() => {
    if (viewport.height === 0) {
      return { startIndex: 0, endIndex: Math.min(icons.length, columnCount * 12) };
    }

    const rowHeightWithGap = ROW_HEIGHT + GAP;
    const startRow = Math.max(
      0,
      Math.floor(viewport.scrollTop / rowHeightWithGap) - OVERSCAN_ROWS,
    );
    const visibleRows = Math.ceil(viewport.height / rowHeightWithGap) + OVERSCAN_ROWS * 2;
    const endRow = Math.min(rowCount, startRow + visibleRows);

    return {
      startIndex: startRow * columnCount,
      endIndex: Math.min(icons.length, endRow * columnCount),
    };
  }, [columnCount, icons.length, rowCount, viewport.height, viewport.scrollTop]);

  const visibleIcons = icons.slice(startIndex, endIndex);
  const offsetY =
    Math.floor(startIndex / columnCount) * (ROW_HEIGHT + GAP);

  return (
    <div className="virtual-grid" ref={containerRef} role="list">
      <div className="virtual-grid__spacer" style={{ height: totalHeight }}>
        <div
          className="virtual-grid__window"
          style={{
            transform: `translateY(${offsetY}px)`,
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {visibleIcons.map((entry) => (
            <div
              key={`${entry.packageName}:${entry.name}`}
              role="listitem"
              style={{ height: ROW_HEIGHT }}
            >
              <IconCard entry={entry} onCopy={onCopy} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
