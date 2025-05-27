"use client"

import { useState, useEffect } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-96 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>

      {/* Refined decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={`absolute top-10 left-10 w-32 h-32 border-2 border-blue-300 rounded-full transition-all duration-1500 transform ${isVisible ? "scale-100 rotate-180" : "scale-0 rotate-0"}`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 w-24 h-24 border-2 border-indigo-300 rounded-full transition-all duration-1500 delay-300 transform ${isVisible ? "scale-100 rotate-180" : "scale-0 rotate-0"}`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-16 h-16 border border-blue-300 transition-all duration-1500 delay-600 transform ${isVisible ? "scale-100 rotate-45" : "scale-0 rotate-0"}`}
        ></div>
      </div>

      {/* Gentle floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-blue-300 rounded-full opacity-20 animate-float`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative text-center text-white z-10 max-w-4xl mx-auto px-4">
        <h2
          className={`text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          EXQUISITE DINING
        </h2>
        <p
          className={`text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          Experience culinary excellence and premium beverages in an atmosphere of refined luxury
        </p>
        <div
          className={`mt-8 flex justify-center transition-all duration-1000 delay-600 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
