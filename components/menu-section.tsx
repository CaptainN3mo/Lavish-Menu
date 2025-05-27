"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface MenuItem {
  name: string
  description: string
  price: string
  category?: string
}

interface MenuSectionProps {
  title: string
  items: MenuItem[]
  delay?: number
}

// Update the existing component with filtering logic
export default function MenuSection({ title, items, delay = 0 }: MenuSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(items.length).fill(false));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
            // Stagger item animations with reduced timing
            items.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 80)
            })
          }, delay)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [delay, items.length])

  return (
    <section ref={sectionRef} className="space-y-8">
      <div className="text-center">
        <h3
          className={`text-3xl md:text-4xl font-bold text-blue-900 mb-4 transition-all duration-600 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {title}
        </h3>
        <div
          className={`flex justify-center items-center space-x-4 mb-2 transition-all duration-600 delay-200 transform ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        >
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <Card
            key={index}
            className={`border-0 shadow-lg hover:shadow-xl transition-all duration-400 hover:scale-105 bg-white/90 backdrop-blur-sm border-l-4 border-l-blue-500 group cursor-pointer transform ${
              visibleItems[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <CardContent className="p-6 relative overflow-hidden">
              {/* Subtle hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-bold text-blue-900 leading-tight pr-4 group-hover:text-indigo-700 transition-colors duration-300">
                    {item.name}
                  </h4>
                  <span className="text-lg font-bold text-indigo-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap text-sm group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-300">
                    {item.price.includes('|') ? item.price.split('|').map(p => p.trim()).join(' | ') : item.price}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm group-hover:text-slate-600 transition-colors duration-300">
                  {item.description}
                </p>
                <div className="mt-4 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent group-hover:via-indigo-400 transition-colors duration-300"></div>
              </div>

              {/* Refined corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// REMOVE THE DUPLICATE DEFAULT EXPORT AT THE BOTTOM OF THE FILE
