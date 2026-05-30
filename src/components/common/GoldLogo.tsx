"use client";

interface GoldLogoProps {
  className?: string;
  height?: number;
}

export default function GoldLogo({ className = "", height = 40 }: GoldLogoProps) {
  return (
    <div className={`relative inline-block ${className}`} style={{ height }}>
      {/* Invisible img establishes natural width from the PNG's aspect ratio */}
      <img
        src="/zak_logo.png"
        alt="Logo"
        style={{ height, width: "auto", display: "block", opacity: 0 }}
        draggable={false}
      />
      {/* Gold mask sits exactly on top */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: "url(/zak_logo.png)",
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskImage: "url(/zak_logo.png)",
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          background: "linear-gradient(135deg, #ead99a 0%, #c9a84c 55%, #8b6a1a 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
