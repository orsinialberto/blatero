import { LocalizedLink } from "./LocalizedLink";

interface SectionHeaderProps {
  label: string;
  title?: string;
  linkText?: string;
  linkHref?: string;
  dark?: boolean;
}

export function SectionHeader({ 
  label, 
  title, 
  linkText, 
  linkHref,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${dark ? 'text-slate-400' : 'text-brand-muted'}`}>
          {label}
        </p>
        {title && (
          <h2 className={`text-4xl font-semibold mt-2 ${dark ? 'text-white' : 'text-brand-primary'}`}>
            {title}
          </h2>
        )}
      </div>
      {linkText && linkHref && (
        <LocalizedLink
          href={linkHref}
          className={`text-sm font-semibold hover:underline ${dark ? 'text-slate-300 hover:text-white' : 'text-brand-secondary'}`}
        >
          {linkText} →
        </LocalizedLink>
      )}
    </div>
  );
}

