interface SectionHeadingProps {
  index: string;
  label: string;
  children: React.ReactNode;
  description?: string;
}

export function SectionHeading({ index, label, children, description }: SectionHeadingProps) {
  return (
    <div data-reveal-group className="mb-14 max-w-2xl">
      <p data-reveal className="eyebrow flex items-center gap-3">
        <span className="text-violet-300">{index}</span>
        <span className="h-px w-8 bg-white/15" />
        {label}
      </p>
      <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {children}
      </h2>
      {description && (
        <p data-reveal className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
