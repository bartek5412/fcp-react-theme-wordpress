import { useState, useEffect, useRef } from "react";
import "./HomePage.css";
import banner from "../assets/images/fundacjacp144.jpg";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  link: string;
  date: string;
}

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testowe dane - placeholder z obrazkiem fundacjacp144
  const testPosts: Post[] = [
    {
      id: 1,
      title: { rendered: "Witamy na stronie Fundacji" },
      excerpt: {
        rendered:
          "Fundacja na rzecz Collegium Polonicum działa na rzecz rozwoju edukacji i kultury.",
      },
      featured_media: 0,
      link: "#",
      date: new Date().toISOString(),
    },
    {
      id: 2,
      title: { rendered: "Nasze projekty" },
      excerpt: {
        rendered:
          "Realizujemy liczne projekty edukacyjne i kulturalne dla społeczności.",
      },
      featured_media: 0,
      link: "#",
      date: new Date().toISOString(),
    },
    {
      id: 3,
      title: { rendered: "Dołącz do nas" },
      excerpt: {
        rendered: "Zapraszamy do współpracy i wspierania naszych inicjatyw.",
      },
      featured_media: 0,
      link: "#",
      date: new Date().toISOString(),
    },
  ];

  const posts = testPosts;
  const isLoading = false;

  // Auto-play karuzeli
  useEffect(() => {
    if (posts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 8000); // Zmiana slajdu co 8 sekund

    return () => clearInterval(interval);
  }, [posts.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  return (
    <div className="home-page">
      <section id="start" className="relative w-full h-screen overflow-hidden">
        {/* Tło - obrazek */}
        <img
          src={banner}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-transparent"></div>

        {/* Karuzela z postami */}
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-white text-xl">Ładowanie...</div>
          </div>
        ) : posts.length > 0 ? (
          <div className="absolute bottom-20 md:bottom-32 left-0 right-0 flex items-end justify-center z-10">
            <div className="container mx-auto px-4">
              <div className="relative max-w-4xl mx-auto">
                {/* Slajdy */}
                <div className="relative h-96 overflow-hidden rounded-lg">
                  {posts.map((post, index) => (
                    <div
                      key={post.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-opacity ${
                        index === currentSlide
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-2xl h-full flex flex-col justify-center">
                        <h2
                          className="text-3xl md:text-4xl font-bold text-primary mb-4"
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                        <div
                          className="text-lg text-gray-700 mb-6 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered.replace(
                              /<p>|<\/p>/g,
                              ""
                            ),
                          }}
                        />
                        <a
                          href={post.link}
                          className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition-colors"
                        >
                          Czytaj więcej
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nawigacja - strzałki */}
                {posts.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-white/70 hover:bg-white text-primary p-3 rounded-full shadow-lg transition-all z-20"
                      aria-label="Poprzedni slajd"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-white/70 hover:bg-white text-primary p-3 rounded-full shadow-lg transition-all z-20"
                      aria-label="Następny slajd"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Wskaźniki (kropki) */}
                {posts.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {posts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentSlide
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Przejdź do slajdu ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* Hero napis - nad karuzelą */}
        <div className="absolute top-16 md:top-20 left-0 right-0 flex flex-col items-center z-30 pointer-events-none">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                Zmieniamy perspektywy,
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                łączymy potencjały
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja O nas */}
      <section
        id="o-nas"
        className="relative py-16 md:py-24 bg-gray-50 overflow-hidden"
      >
        {/* Rozmyte tło */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={banner}
            alt="Background"
            className="w-full h-full object-cover blur-3xl scale-110"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Lewa strona - Zdjęcia */}
              <div className="relative">
                {/* Główne zdjęcie */}
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Główne zdjęcie</span>
                    {/* TODO: Zamień na rzeczywiste zdjęcie */}
                    {/* <img src={mainImage} alt="Opis głównego zdjęcia" className="w-full h-full object-cover" /> */}
                  </div>

                  {/* Dodatkowe zdjęcie w lewym dolnym rogu */}
                  <div className="absolute bottom-4 left-4 w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-xl border-4 border-white">
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xs text-gray-500 text-center px-2">
                        Dodatkowe zdjęcie
                      </span>
                      {/* TODO: Zamień na rzeczywiste zdjęcie */}
                      {/* <img src={smallImage} alt="Opis dodatkowego zdjęcia" className="w-full h-full object-cover" /> */}
                    </div>
                  </div>

                  {/* Dekoracyjne elementy z kolorami z księgi znaków */}
                  {/* Ciemny niebieski (#143652) */}
                  <div
                    className="absolute -top-6 -right-6 w-20 h-20 md:w-28 md:h-28 rounded-full"
                    style={{ backgroundColor: "#143652", opacity: 0.2 }}
                  ></div>
                  {/* Średni niebieski (#008BC3) */}
                  <div
                    className="absolute top-1/4 -right-3 w-16 h-16 md:w-24 md:h-24 rounded-full"
                    style={{ backgroundColor: "#008BC3", opacity: 0.25 }}
                  ></div>
                  {/* Jasny niebieski (#49A0D8) */}
                  <div
                    className="absolute -bottom-4 -right-8 w-12 h-12 md:w-20 md:h-20 rounded-full"
                    style={{ backgroundColor: "#49A0D8", opacity: 0.3 }}
                  ></div>
                  {/* Pomarańczowy (#F2AF46) */}
                  <div
                    className="absolute top-1/3 -left-4 w-14 h-14 md:w-22 md:h-22 rounded-full"
                    style={{ backgroundColor: "#F2AF46", opacity: 0.25 }}
                  ></div>
                  {/* Zielony (#219138) */}
                  <div
                    className="absolute top-0 left-1/4 w-10 h-10 md:w-18 md:h-18 rounded-full"
                    style={{ backgroundColor: "#219138", opacity: 0.3 }}
                  ></div>
                </div>
              </div>

              {/* Prawa strona - Tekst */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
                  O nas
                </h2>

                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Fundacja na rzecz Collegium Polonicum swoją działalność
                    rozpoczęła w grudniu 2002 roku, opierając się na aktywnej
                    współpracy z UAM i Europejskim Uniwersytetem Viadrina we
                    Frankfurcie nad Odrą. Celem inicjatorów Fundacji było
                    rozwijanie działalności edukacyjnej Collegium Polonicum i
                    promocja placówki w środowisku lokalnym.
                  </p>

                  <p>
                    Na przestrzeni 20 lat, Fundacja stała się istotną w
                    województwie lubuskim organizacją „infrastrukturalną" i
                    „parasolową" - wspierającą, nie tylko środowisko
                    akademickie, ale także rozwój lokalny oraz inicjatywy na
                    rzecz dobra wspólnego.
                  </p>
                </div>

                {/* Przycisk */}
                <div className="mt-8">
                  <a
                    href="#kontakt"
                    className="inline-block bg-secondary hover:bg-secondary-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    Więcej o nas
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja Aktualności */}
      <section
        id="aktualnosci"
        className="py-16 md:py-24 bg-white border-t-2 border-secondary/20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary uppercase text-sm font-semibold tracking-wider mb-4">
              Aktualności
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Sprawdź co u nas słychać
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
                  <span className="text-gray-400 relative z-10">
                    Zdjęcie aktualności {item}
                  </span>
                  {/* TODO: <img src={postImage} alt={postTitle} className="absolute inset-0 w-full h-full object-cover" /> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Tytuł aktualności {item}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-secondary font-semibold hover:underline"
                  >
                    Czytaj więcej
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja Statystyk z animowanymi licznikami */}
      <StatsSection />

      {/* Sekcja Nasze Działania */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary uppercase text-sm font-semibold tracking-wider mb-4">
              Nasze działania
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Poznaj nasze programy społeczne
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Rozwój lokalny",
                description:
                  "Wspieramy rozwój lokalnych społeczności poprzez różnorodne inicjatywy i programy.",
              },
              {
                title: "Ekonomia społeczna",
                description:
                  "Promujemy przedsiębiorczość społeczną i zrównoważony rozwój ekonomiczny.",
              },
              {
                title: "Usługi społeczne",
                description:
                  "Oferujemy kompleksowe usługi wspierające rozwój i integrację społeczną.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
                  <span className="text-gray-400 relative z-10">
                    {item.title}
                  </span>
                  {/* TODO: <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" /> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-secondary font-semibold hover:underline"
                  >
                    Czytaj więcej
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtelny rozdzielacz między sekcjami */}
      <div className="relative w-full h-16 md:h-20 overflow-hidden bg-white">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtelna fala z gradientem */}
          <path
            d="M0,80 Q360,40 720,80 T1440,80 L1440,120 L0,120 Z"
            fill="#008BC3"
            opacity="0.15"
          />
          <path
            d="M0,90 Q360,50 720,90 T1440,90 L1440,120 L0,120 Z"
            fill="#49A0D8"
            opacity="0.1"
          />
        </svg>

        {/* Subtelne kształty - mniejsze i mniej widoczne */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="flex gap-8 md:gap-16">
            <div
              className="w-3 h-3 md:w-4 md:h-4 rounded-full"
              style={{ backgroundColor: "#F2AF46" }}
            ></div>
            <div
              className="w-2 h-2 md:w-3 md:h-3 rounded-full"
              style={{ backgroundColor: "#219138" }}
            ></div>
            <div
              className="w-3 h-3 md:w-4 md:h-4 rounded-full"
              style={{ backgroundColor: "#49A0D8" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Sekcja Oferta Komercyjna */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary uppercase text-sm font-semibold tracking-wider mb-4">
              Oferta komercyjna
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Sprawdź, co możemy zrobić dla Ciebie
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Oferta dla firm",
                description:
                  "Kompleksowe rozwiązania biznesowe dostosowane do potrzeb Twojej firmy i organizacji.",
              },
              {
                id: 2,
                title: "Oferta dla organizacji",
                description:
                  "Wsparcie dla organizacji pozarządowych w realizacji ich misji i celów.",
              },
              {
                id: 3,
                title: "Oferta dla podmiotów publicznych",
                description:
                  "Profesjonalne usługi dla jednostek sektora publicznego i administracji.",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
                  <span className="text-gray-400 relative z-10">
                    Oferta {item.id}
                  </span>
                  {/* TODO: <img src={offerImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover" /> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-secondary font-semibold hover:underline"
                  >
                    Czytaj więcej
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja Dlaczego My */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Lewa strona - Tekst i opcje */}
            <div>
              <p className="text-secondary uppercase text-sm font-semibold tracking-wider mb-4">
                Dlaczego my?
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
                Działaj z nami
              </h2>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Dzięki Twojemu wsparciu zmieniamy świat na lepsze! Zobacz jak
                możesz włączyć się w nasze działania:
              </p>

              {/* Opcje z ikonami */}
              <div className="space-y-6 mb-8">
                {/* Współpraca */}
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Współpraca!
                    </h3>
                    <p className="text-gray-600">
                      Jeśli widzisz pole do naszej współpracy, zapraszamy do
                      kontaktu. Razem możemy więcej!
                    </p>
                  </div>
                </div>

                {/* Darowizna */}
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-orange/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-accent-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Wpłać darowiznę!
                    </h3>
                    <p className="text-gray-600">
                      Twoja darowizna pomaga nam realizować projekty i wspierać
                      lokalną społeczność.
                    </p>
                  </div>
                </div>

                {/* Wolontariat */}
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-accent-green"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Wolontariat!
                    </h3>
                    <p className="text-gray-600">
                      Dołącz do naszych wolontariuszy i pomóż nam zmieniać świat
                      na lepsze.
                    </p>
                  </div>
                </div>
              </div>

              {/* Przycisk */}
              <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-primary/30">
                Wesprzyj nas
              </button>
            </div>

            {/* Prawa strona - Zdjęcie */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Zdjęcie grupy ludzi</span>
                  {/* TODO: Dodaj rzeczywiste zdjęcie grupy ludzi */}
                </div>

                {/* Dekoracyjne elementy z kolorami z księgi znaków */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-30"
                  style={{ backgroundColor: "#008BC3" }}
                ></div>
                <div
                  className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full opacity-25"
                  style={{ backgroundColor: "#F2AF46" }}
                ></div>
                <div
                  className="absolute top-1/4 -left-6 w-20 h-20 rounded-full opacity-20"
                  style={{ backgroundColor: "#49A0D8" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja Nasze Projekty */}
      <section id="projekty" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary uppercase text-sm font-semibold tracking-wider mb-4">
              Nasze projekty
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Poznaj nasze inicjatywy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, title: "PROJEKT 1" },
              { id: 2, title: "PROJEKT 2" },
              { id: 3, title: "PROJEKT 3" },
            ].map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                  <span className="text-gray-400">
                    Zdjęcie projektu {project.id}
                  </span>
                  {/* TODO: <img src={projectImage} alt={project.title} /> */}

                  {/* Ikona placeholder - góry */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    viewBox="0 0 100 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 50 L20 35 L40 40 L60 25 L80 30 L100 20 L100 60 L0 60 Z"
                      fill="#143652"
                    />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Opis projektu będzie tutaj. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-secondary font-semibold hover:underline"
                  >
                    Czytaj więcej
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja Kontakt */}
      <section id="kontakt" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary uppercase text-sm font-semibold tracking-wider mb-4">
              Kontakt
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Masz pytania? Napisz!
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Lewa strona - zdjęcie z dekoracyjnymi elementami */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Zdjęcie kontaktowe</span>
                  {/* TODO: Dodaj rzeczywiste zdjęcie */}
                </div>

                {/* Dekoracyjne elementy z kolorami z księgi znaków */}
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 rounded-full opacity-80 blur-xl"
                  style={{ backgroundColor: "#008BC3" }}
                ></div>
                <div
                  className="absolute bottom-8 left-8 w-24 h-24 md:w-36 md:h-36 rounded-full opacity-60 blur-lg"
                  style={{ backgroundColor: "#F2AF46" }}
                ></div>
                <div
                  className="absolute top-1/4 right-0 w-20 h-20 md:w-32 md:h-32 rounded-full opacity-70 blur-xl"
                  style={{ backgroundColor: "#49A0D8" }}
                ></div>
              </div>
            </div>

            {/* Prawa strona - Formularz */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 lg:p-12">
              <form
                className="space-y-6"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Imię */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Imię *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                      placeholder="Twoje imię"
                    />
                  </div>

                  {/* E-mail */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                      placeholder="twoj@email.pl"
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="+48 123 456 789"
                  />
                </div>

                {/* Wiadomość */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 resize-none"
                    placeholder="Napisz swoją wiadomość..."
                  ></textarea>
                </div>

                {/* Przycisk */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-primary/30"
                  >
                    Wyślij wiadomość
                  </button>
                </div>

                {/* Informacja o wymaganych polach */}
                <p className="text-sm text-gray-500 text-center">
                  * Pola wymagane
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Komponent statystyk z animowanymi licznikami
const StatsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 21, label: "lat doświadczenia", suffix: "" },
    { value: 3, label: "lokalizacje", suffix: "" },
    { value: 50, label: "mln zł pozyskanych dotacji", suffix: "" },
    { value: 21, label: "forów NGO", suffix: "" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-primary text-white overflow-hidden"
    >
      {/* Kształty dekoracyjne z księgi znaków */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ciemny niebieski (#143652) */}
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: "#143652" }}
        ></div>
        {/* Średni niebieski (#008BC3) */}
        <div
          className="absolute top-1/4 -right-16 w-48 h-48 rounded-full opacity-15"
          style={{ backgroundColor: "#008BC3" }}
        ></div>
        {/* Jasny niebieski (#49A0D8) */}
        <div
          className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full opacity-12"
          style={{ backgroundColor: "#49A0D8" }}
        ></div>
        {/* Pomarańczowy (#F2AF46) */}
        <div
          className="absolute top-1/2 -left-10 w-40 h-40 rounded-full opacity-15"
          style={{ backgroundColor: "#F2AF46" }}
        ></div>
        {/* Zielony (#219138) */}
        <div
          className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full opacity-12"
          style={{ backgroundColor: "#219138" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              target={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              animate={hasAnimated}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Komponent pojedynczego licznika
interface StatCounterProps {
  target: number;
  label: string;
  suffix: string;
  animate: boolean;
  delay: number;
}

const StatCounter = ({
  target,
  label,
  suffix,
  animate,
  delay,
}: StatCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const duration = 2000; // 2 sekundy
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [animate, target, delay]);

  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3">
        {count}
        {suffix}
      </div>
      <div className="text-lg md:text-xl text-white/90">{label}</div>
    </div>
  );
};

export default HomePage;
