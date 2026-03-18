import { useState, useEffect } from "react";

type FontSize = "normal" | "large" | "xlarge";
type ContrastMode = "normal" | "high";

const AccessibilityBar = () => {
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  const [contrastMode, setContrastMode] = useState<ContrastMode>("normal");

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem("accessibility-font-size") as FontSize;
    const savedContrast = localStorage.getItem("accessibility-contrast") as ContrastMode;
    
    if (savedFontSize) {
      setFontSize(savedFontSize);
      applyFontSize(savedFontSize);
    }
    if (savedContrast) {
      setContrastMode(savedContrast);
      applyContrast(savedContrast);
    }
  }, []);

  const applyFontSize = (size: FontSize) => {
    const root = document.documentElement;
    root.classList.remove("font-normal", "font-large", "font-xlarge");
    root.classList.add(`font-${size}`);
    
    // Apply CSS custom property
    const sizeMap = {
      normal: "100%",
      large: "125%",
      xlarge: "150%",
    };
    root.style.setProperty("--font-size-scale", sizeMap[size]);
  };

  const applyContrast = (mode: ContrastMode) => {
    const root = document.documentElement;
    if (mode === "high") {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
  };

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    applyFontSize(size);
    localStorage.setItem("accessibility-font-size", size);
  };

  const handleContrastToggle = () => {
    const newMode = contrastMode === "normal" ? "high" : "normal";
    setContrastMode(newMode);
    applyContrast(newMode);
    localStorage.setItem("accessibility-contrast", newMode);
  };

  const resetSettings = () => {
    if (fontSize !== "normal") {
      handleFontSizeChange("normal");
    }
    if (contrastMode === "high") {
      handleContrastToggle();
    }
    localStorage.removeItem("accessibility-font-size");
    localStorage.removeItem("accessibility-contrast");
  };

  return (
    <div className="flex items-center gap-2">
      {/* Font Size Controls */}
      <div className="flex items-center gap-1 border-r border-white/30 pr-2 mr-2">
        <div className="flex gap-0.5">
          <button
            onClick={() => handleFontSizeChange("normal")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleFontSizeChange("normal");
              }
            }}
            aria-label="Rozmiar czcionki normalny"
            aria-pressed={fontSize === "normal"}
            className={`px-2 py-1 text-xs rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 ${
              fontSize === "normal"
                ? "bg-white text-primary font-bold"
                : "bg-white/20 hover:bg-white/30"
            }`}
            title="Rozmiar normalny (100%)"
          >
            A
          </button>
          <button
            onClick={() => handleFontSizeChange("large")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleFontSizeChange("large");
              }
            }}
            aria-label="Rozmiar czcionki duży"
            aria-pressed={fontSize === "large"}
            className={`px-2 py-1 text-sm rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 ${
              fontSize === "large"
                ? "bg-white text-primary font-bold"
                : "bg-white/20 hover:bg-white/30"
            }`}
            title="Rozmiar duży (125%)"
          >
            A
          </button>
          <button
            onClick={() => handleFontSizeChange("xlarge")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleFontSizeChange("xlarge");
              }
            }}
            aria-label="Rozmiar czcionki bardzo duży"
            aria-pressed={fontSize === "xlarge"}
            className={`px-2 py-1 text-base rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 ${
              fontSize === "xlarge"
                ? "bg-white text-primary font-bold"
                : "bg-white/20 hover:bg-white/30"
            }`}
            title="Rozmiar bardzo duży (150%)"
          >
            A
          </button>
        </div>
      </div>

      {/* Contrast Toggle */}
      <button
        onClick={handleContrastToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleContrastToggle();
          }
        }}
        aria-label={contrastMode === "normal" ? "Włącz wysoki kontrast" : "Wyłącz wysoki kontrast"}
        aria-pressed={contrastMode === "high"}
        className={`px-2 py-1 text-xs rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 ${
          contrastMode === "high"
            ? "bg-white text-primary font-bold"
            : "bg-white/20 hover:bg-white/30"
        }`}
        title={contrastMode === "normal" ? "Włącz wysoki kontrast" : "Wyłącz wysoki kontrast"}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      {/* Reset Button */}
      {(fontSize !== "normal" || contrastMode === "high") && (
        <button
          onClick={resetSettings}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              resetSettings();
            }
          }}
          aria-label="Przywróć domyślne ustawienia dostępności"
          className="px-2 py-1 text-xs bg-white/20 hover:bg-white/30 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1"
          title="Przywróć domyślne ustawienia"
        >
          ↺
        </button>
      )}
    </div>
  );
};

export default AccessibilityBar;
