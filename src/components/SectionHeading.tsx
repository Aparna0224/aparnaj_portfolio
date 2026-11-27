interface SectionHeadingProps {
  index: string;
  label: string;
  children: React.ReactNode;
  description?: string;
}

export function SectionHeading({ index, label, children, description }: SectionHeadingProps) {
  return (
    <div data-reveal-group className="relative mb-16 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 -top-20 select-none md:-left-6 font-medium leading-none tracking-[-0.06em] text-cream/[0.03] [font-size:clamp(7rem,16vw,15rem)]"
      >
        {index}
      </span>
      <div className="relative md:col-span-8">
        <p data-reveal className="label flex items-center gap-3">
          <span className="text-saffron">[ {index} ]</span>
          {label}
        </p>
        <h2
          data-heading
          className="mt-5 text-[clamp(2.25rem,5.2vw,4.5rem)] font-normal leading-[1] tracking-[-0.04em] text-cream"
        >
          {children}
        </h2>
      </div>
      {description && (
        <p data-reveal className="relative max-w-sm text-[15px] leading-relaxed text-cream/55 md:col-span-4">
          {description}
        </p>
      )}
    </div>
  );
}
