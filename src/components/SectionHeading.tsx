interface SectionHeadingProps {
  index: string;
  label: string;
  children: React.ReactNode;
  description?: string;
}

export function SectionHeading({ index, label, children, description }: SectionHeadingProps) {
  return (
    <div data-reveal-group className="mb-16 max-w-2xl">
      <p data-reveal className="eyebrow flex items-center gap-3">
        <span className="text-slate-500">{index}</span>
        <span className="h-px w-8 bg-cyan-300/40" />
        {label}
      </p>
      <h2 data-reveal className="mt-4 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {children}
      </h2>
      {description && (
        <p data-reveal className="mt-5 text-lg leading-relaxed text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
