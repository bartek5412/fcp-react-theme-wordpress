import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import logoColor from "../assets/images/fcp_logo_kolor.png";
import AccessibilityBar from "./AccessibilityBar";
import "./Header.css";

interface MenuItem {
  id: number;
  title: string;
  url: string;
  children?: MenuItem[];
}

const Header = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Fetch menu from WordPress REST API
    fetch("/wp-json/wp/v2/menus/primary")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.items) {
          setMenuItems(data.items);
        }
      })
      .catch(() => {
        // Fallback menu items
        setMenuItems([
          { id: 1, title: "Home", url: "/" },
          { id: 2, title: "O nas", url: "/o-nas" },
          { id: 3, title: "Projekty", url: "/projekty" },
          { id: 4, title: "Kontakt", url: "/kontakt" },
        ]);
      });

    // Scroll listener for header color change
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 min-h-24 relative transition-all duration-300 ${
        isScrolled ? "bg-white text-primary shadow-md" : "bg-primary text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className={`flex items-center gap-3 text-2xl font-bold transition-colors ${
              isScrolled
                ? "text-primary hover:text-secondary"
                : "text-white hover:text-secondary"
            }`}
          >
            <img
              src={logo}
              alt="Logo"
              className={`h-16 w-auto mx-12 transition-opacity duration-300 ${
                isScrolled ? "opacity-0 absolute" : "opacity-100"
              }`}
            />
            {/* TODO: Dodaj drugie logo (ciemne) dla stanu scrolled */}
            <img
              src={logoColor}
              alt="Logo"
              className={`h-16 w-auto mx-12 transition-opacity duration-300 ${
                isScrolled ? "opacity-100" : "opacity-0 absolute"
              }`}
            />
          </Link>

          <div className="flex items-center gap-4">
            <nav
              className={`hidden md:block ${isMobileMenuOpen ? "block" : ""}`}
            >
              <ul
                className={`flex gap-8 list-none m-0 p-0 ${
                  isMobileMenuOpen
                    ? `flex-col absolute top-full left-0 right-0 p-4 gap-4 z-50 ${
                        isScrolled ? "bg-white" : "bg-primary"
                      }`
                    : ""
                }`}
              >
                {menuItems.map((item) => (
                  <li key={item.id} className="relative group">
                    <Link
                      to={item.url}
                      className={`font-medium transition-colors ${
                        isScrolled
                          ? "text-primary hover:text-secondary"
                          : "text-white hover:text-secondary"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {item.children && item.children.length > 0 && (
                      <ul className="absolute top-full left-0 bg-white list-none p-2 m-0 min-w-[200px] rounded shadow-lg opacity-0 invisible translate-y-[-10px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              to={child.url}
                              className="block px-6 py-3 text-gray-800 hover:bg-gray-100 hover:text-primary transition-colors"
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Accessibility Controls - Desktop */}
            <div className="hidden md:flex">
              <AccessibilityBar />
            </div>

            {/* Accessibility Controls - Mobile */}
            {isMobileMenuOpen && (
              <div
                className={`md:hidden absolute top-full left-0 right-0 p-4 border-t ${
                  isScrolled
                    ? "bg-white border-primary/20"
                    : "bg-primary border-white/20"
                }`}
              >
                <AccessibilityBar />
              </div>
            )}

            <button
              className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 transition-all ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 transition-all ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 transition-all ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
