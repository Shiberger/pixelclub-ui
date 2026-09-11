/** Shared inline icons — white fill, black outline, vector so they stay crisp at any size. */

export function GiftIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M12 6c-1.1-3-3.6-4.2-5.2-2.9-1.3 1.1-.7 2.9 1.2 2.9H12Z" />
        <path d="M12 6c1.1-3 3.6-4.2 5.2-2.9 1.3 1.1.7 2.9-1.2 2.9H12Z" />
        <rect x="2.5" y="6" width="19" height="4.5" rx="1" />
        <rect x="4" y="10.5" width="16" height="10" rx="1" />
        <path d="M12 6v14.5" strokeLinejoin="miter" />
      </g>
    </svg>
  );
}
