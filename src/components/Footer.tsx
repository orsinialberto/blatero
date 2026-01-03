import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/albertorsini/",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Komoot",
      url: "https://www.komoot.com/it-it/user/4517229241749",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/viaggi", label: "Tutti i Viaggi" },
    { href: "/galleria", label: "Galleria Foto" },
    { href: "/about", label: "Chi Sono" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="py-12 md:py-16 px-4 lg:px-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand & Bio Section */}
          <div className="lg:col-span-5">
            <p className="font-comforter text-3xl font-normal tracking-tight text-white md:text-4xl mb-4">
              Diario di Viaggio
            </p>
            <p className="text-sm leading-relaxed text-slate-300 max-w-md">
              Storie autentiche di viaggi zaino in spalla, trekking e avventure in moto. 
              Scopri itinerari, consigli pratici e ispirazioni per il tuo prossimo viaggio.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Navigazione
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-brand-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Connect */}
          <div className="lg:col-span-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Seguimi
            </h3>
            <p className="mb-4 text-sm text-slate-300">
              Segui le mie avventure in tempo reale e scopri i miei itinerari.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition hover:border-brand-accent hover:bg-brand-accent/10 hover:text-white"
                  aria-label={social.name}
                >
                  <span className="transition group-hover:scale-110">
                    {social.icon}
                  </span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-700 pt-8 text-center">
          <p className="text-xs text-slate-400">
            © {currentYear} Diario di Viaggio · Tutti i diritti riservati
          </p>
        </div>
      </div>
    </footer>
  );
}
