"use client"

import { useState, useEffect } from "react"
import { Phone, MapPin, Clock, Globe } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <header
      className={`bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white shadow-xl transition-all duration-800 transform ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <Image
                src="/images/lavish-suites-logo.png"
                alt="Lavish Suites Logo"
                width={120}
                height={120}
                className="object-contain relative z-10 transition-transform duration-500 hover:scale-110 hover:rotate-3"
              />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-wider text-blue-100 animate-fade-in-up">
                LAVISH SUITES
              </h1>
              <p className="text-blue-200 text-lg font-medium animate-fade-in-up animation-delay-200">
                BAR | RESTAURANT MENU
              </p>
              <p className="text-blue-300 text-sm italic animate-fade-in-up animation-delay-400">
                A Summit of Luxury & Comfort
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              { icon: Phone, content: ["+265 991320592", "+265 886119009"] },
              { icon: MapPin, content: ["Ufulu Road, New Naperi Blantyre"] },
              { icon: Clock, content: ["Open 6AM - 10PM"] },
              { icon: Globe, content: ["lavishsuites.co"] },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 hover:text-blue-200 transition-all duration-300 transform hover:scale-105 animate-fade-in-right`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <item.icon className="h-4 w-4 text-blue-300" />
                <div>
                  {item.content.map((text, i) => (
                    <div key={i}>{text}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
