interface CopyToastProps {
  message: string | null;
  tone: 'success' | 'error';
}

export function CopyToast({ message, tone }: CopyToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`copy-toast copy-toast--${tone}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
