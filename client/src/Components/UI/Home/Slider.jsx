import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    label: "Big Billion Days",
    tag: "UP TO 80% OFF",
    subtitle: "Electronics, Fashion & More",
    imgPath: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    gradient: "from-[#2874f0] to-[#0b56d4]",
    accentColor: "#ffe11b",
  },
  {
    id: 2,
    label: "Fashion Sale",
    tag: "TRENDING NOW",
    subtitle: "Latest styles for every occasion",
    imgPath: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80",
    gradient: "from-[#fb641b] to-[#d94e0c]",
    accentColor: "#fff",
  },
  {
    id: 3,
    label: "Mobile Deals",
    tag: "STARTS ₹6,999",
    subtitle: "Top brands, unbeatable prices",
    imgPath: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
    gradient: "from-[#1a1a2e] to-[#16213e]",
    accentColor: "#2874f0",
  },
  {
    id: 4,
    label: "Home Essentials",
    tag: "EXTRA 10% OFF",
    subtitle: "Upgrade your living space",
    imgPath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    gradient: "from-[#11998e] to-[#38ef7d]",
    accentColor: "#f9f871",
  },
  {
    id: 5,
    label: "SuperCoins Jackpot",
    tag: "EARN & REDEEM",
    subtitle: "Shop more, save more",
    imgPath: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
    gradient: "from-[#6a0dad] to-[#2874f0]",
    accentColor: "#ffe11b",
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const AUTOPLAY_DELAY = 3500;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* z-[1] keeps slider BELOW navbar dropdowns (z-50) */}
      <div className="relative h-72 w-full overflow-hidden rounded-2xl z-1">
        {/* Slides Container */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative overflow-hidden group/item">
              <img
                src={slide.imgPath}
                alt={slide.label}
                className="h-full w-full object-cover transition-transform duration-2000 group-hover/item:scale-105"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-40`} />
              {/* Text Content — z-[2] stays inside slider, still below navbar */}
              <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20 text-white z-[2]">
                <span className="inline-block self-start px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                  {slide.tag}
                </span>
                <h2 className="text-4xl md:text-5xl font-black mb-2 drop-shadow-lg tracking-tight">
                  {slide.label}
                </h2>
                <p className="text-sm md:text-base opacity-90 max-w-md font-medium">
                  {slide.subtitle}
                </p>
                <button
                  className="mt-6 self-start px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl"
                  style={{
                    backgroundColor: slide.accentColor,
                    color: slide.accentColor === "#fff" ? "#000" : "#fff",
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dots — z-[2] inside slider */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-[2]">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}