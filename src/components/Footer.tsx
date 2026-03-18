const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Główna sekcja stopki */}
      <div className="container mx-auto px-4 pt-8 md:pt-10 pb-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Kolumna 1: Adres */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Adres</h3>
            <address className="not-italic text-white/90 space-y-2">
              <p className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  ul. Kościuszki 1<br />
                  69-100 Słubice
                </span>
              </p>
            </address>
          </div>

          {/* Kolumna 2: Kontakt */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-secondary">Kontakt</h3>
            <div className="space-y-2 text-white/90 text-sm">
              <p className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:sekretariat@fundacjacp.org"
                  className="hover:text-secondary transition-colors"
                >
                  sekretariat@fundacjacp.org
                </a>
              </p>
              <p className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+48123456789"
                  className="hover:text-secondary transition-colors"
                >
                  +48 123 456 789
                </a>
              </p>
            </div>
          </div>

          {/* Kolumna 3: Godziny otwarcia */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-secondary">
              Godziny otwarcia
            </h3>
            <div className="space-y-2 text-white/90 text-sm">
              <p className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  <span className="font-semibold">Poniedziałek - Piątek</span>
                  <br />
                  8.00 - 16.00
                </span>
              </p>
              <p className="text-white/70 text-xs mt-3">
                Sobota - Niedziela
                <br />
                <span className="text-white/50">Zamknięte</span>
              </p>
            </div>
          </div>

          {/* Kolumna 4: Ważne dokumenty */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-secondary">
              Ważne dokumenty
            </h3>
            <nav>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#kontakt"
                    className="text-white/90 hover:text-secondary transition-colors inline-flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Polityka prywatności</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#kontakt"
                    className="text-white/90 hover:text-secondary transition-colors inline-flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>RODO</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#kontakt"
                    className="text-white/90 hover:text-secondary transition-colors inline-flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Statut</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#kontakt"
                    className="text-white/90 hover:text-secondary transition-colors inline-flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Sprawozdania</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Dane rejestrowe - pod wszystkimi kolumnami */}
        <div className="mt-6 text-xs text-white/80 flex flex-wrap justify-center gap-x-4">
          <span>
            <span className="font-semibold">NIP:</span> 0000000000
          </span>
          <span>
            <span className="font-semibold">KRS:</span> 0000000000
          </span>
          <span>
            <span className="font-semibold">REGON:</span> 000000000
          </span>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-white/10"></div>

      {/* Dolna sekcja: Podpis strony */}
      <div className="container mx-auto px-4 py-2">
        <div className="text-center">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} Fundacja na rzecz Collegium
            Polonicum. Wszystkie prawa zastrzeżone.
          </p>
          <p className="text-white/50 text-xs mt-2">
            Strona stworzona z myślą o dostępności dla wszystkich.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
