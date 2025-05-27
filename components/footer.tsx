"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, MapPin, Clock, Globe, Instagram, Facebook, Twitter } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div
            className={`md:col-span-2 transition-all duration-800 transform ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <Image
                  src="/images/lavish-suites-logo.png"
                  alt="Lavish Suites Logo"
                  width={80}
                  height={80}
                  className="object-contain relative z-10 transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-blue-200">LAVISH SUITES</h4>
                <p className="text-blue-300 text-lg">Restaurant & Bar</p>
              </div>
            </div>
            <p className="text-blue-200 mb-4 italic">A Summit of Luxury & Comfort</p>
            <p className="text-blue-100 leading-relaxed mb-6">
              Experience the finest dining and premium beverages in Blantyre with our carefully crafted menu featuring
              local and international cuisine, complemented by an extensive bar selection.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <Icon
                  key={index}
                  className={`h-6 w-6 hover:text-blue-300 cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 animate-fade-in-up`}
                  style={{ animationDelay: `${800 + index * 200}ms` }}
                />
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-800 delay-300 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h5 className="text-xl font-semibold mb-6 text-blue-200">Contact Information</h5>
            <div className="space-y-3">
              {[
                { icon: Phone, content: ["+265 991320592", "+265 886119009"] },
                { icon: MapPin, content: ["Ufulu Road, New Naperi Blantyre"] },
                { icon: Globe, content: ["lavishsuites.co"] },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 hover:text-blue-200 transition-all duration-300 transform hover:translate-x-2 animate-fade-in-left`}
                  style={{ animationDelay: `${1000 + index * 150}ms` }}
                >
                  <item.icon className="h-5 w-5 text-blue-300" />
                  <div>
                    {item.content.map((text, i) => (
                      <div key={i}>{text}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-800 delay-600 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h5 className="text-xl font-semibold mb-6 text-blue-200">Opening Hours</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-300" />
                <div>
                  <p className="font-semibold">Daily: 6:00 AM - 10:00 PM</p>
                  <p className="text-blue-200 text-sm">Restaurant & Bar</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-800/30 rounded-lg border border-blue-700 hover:bg-blue-800/50 transition-colors duration-300">
              <h6 className="font-semibold text-blue-200 mb-2">Special Features</h6>
              <ul className="text-sm space-y-1 text-blue-100">
                {[
                  "• Premium Bar & Cocktails",
                  "• Wine Selection",
                  "• Kids Menu Available",
                  "• Vegetarian Options",
                  "• Fresh Local & Imported Ingredients",
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`animate-fade-in-right`}
                    style={{ animationDelay: `${1400 + index * 100}ms` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`border-t border-blue-700 mt-10 pt-8 text-center transition-all duration-800 delay-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
        >
          <p className="text-blue-200">&copy; 2024 LAVISH SUITES BAR | RESTAURANT MENU. All rights reserved.</p>
          <p className="text-blue-300 text-sm mt-2">
            Experience luxury dining and premium beverages in the heart of Blantyre
          </p>
        </div>
      </div>
    </footer>
  )
}
