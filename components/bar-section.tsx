"use client"

import { useState, useEffect, useRef } from "react"
import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, Coffee, Martini, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import jsPDF from 'jspdf'

const cocktails = [
  {
    name: "Chapman",
    description: "Sprite, orange squash, Grenadine, Bitters",
    price: "K9,000.00",
  },
  {
    name: "Rock Shandy",
    description: "Sprite, Ginger ale, cranberry juice, bitters",
    price: "K9,500.00",
  },
  {
    name: "Sex on the Beach",
    description: "Vodka, peach, Cranberry juice, orange juice",
    price: "K9,500.00",
  },
  {
    name: "Blue Lagoon",
    description: "Vodka, Blue Curacao, Lemonade, Fresh lime",
    price: "K12,000.00",
  },
  {
    name: "Mojito",
    description: "White rum, Fresh mint, Lime juice, Sugar, Soda water",
    price: "K11,000.00",
  },
  {
    name: "Lavish Signature",
    description: "Premium gin, Elderflower, Cucumber, Fresh herbs",
    price: "K15,000.00",
  },
]

const wines = [
  {
    name: "Sauvignon Blanc",
    description: "Crisp white wine with citrus notes",
    price: "Glass: K8,000 | Bottle: K45,000",
  },
  {
    name: "Chardonnay",
    description: "Rich and buttery white wine",
    price: "Glass: K9,000 | Bottle: K50,000",
  },
  {
    name: "Cabernet Sauvignon",
    description: "Full-bodied red wine with dark fruit flavors",
    price: "Glass: K10,000 | Bottle: K55,000",
  },
  {
    name: "Merlot",
    description: "Smooth red wine with plum and cherry notes",
    price: "Glass: K9,500 | Bottle: K52,000",
  },
  {
    name: "Rosé",
    description: "Light and refreshing pink wine",
    price: "Glass: K8,500 | Bottle: K48,000",
  },
  {
    name: "Champagne",
    description: "Premium sparkling wine for celebrations",
    price: "Glass: K15,000 | Bottle: K85,000",
  },
]

const spirits = [
  {
    name: "Premium Whiskey",
    description: "Selection of aged whiskeys and bourbons",
    price: "K12,000 - K25,000",
  },
  {
    name: "Premium Vodka",
    description: "Top shelf vodka brands",
    price: "K10,000 - K20,000",
  },
  {
    name: "Premium Gin",
    description: "Craft and premium gin selection",
    price: "K11,000 - K22,000",
  },
  {
    name: "Premium Rum",
    description: "Aged and spiced rum varieties",
    price: "K10,500 - K18,000",
  },
  {
    name: "Cognac & Brandy",
    description: "Fine cognacs and brandies",
    price: "K15,000 - K35,000",
  },
  {
    name: "Tequila",
    description: "Premium tequila selection",
    price: "K12,000 - K24,000",
  },
]

const beers = [
  {
    name: "Local Draft Beer",
    description: "Fresh local brewery selections",
    price: "K3,500.00",
  },
  {
    name: "Premium Lager",
    description: "International premium lager beers",
    price: "K5,000.00",
  },
  {
    name: "Craft Beer",
    description: "Artisanal craft beer selection",
    price: "K6,500.00",
  },
  {
    name: "Imported Beer",
    description: "International imported beer brands",
    price: "K7,000.00",
  },
]

const nonAlcoholic = [
  {
    name: "Fresh Fruit Juices",
    description: "Orange, Apple, Pineapple, Mango",
    price: "K2,500.00",
  },
  {
    name: "Smoothies",
    description: "Mixed fruit smoothies with yogurt",
    price: "K4,000.00",
  },
  {
    name: "Soft Drinks",
    description: "Coca-Cola, Sprite, Fanta, Tonic Water",
    price: "K1,500.00",
  },
  {
    name: "Premium Coffee",
    description: "Espresso, Cappuccino, Latte, Americano",
    price: "K3,000.00",
  },
  {
    name: "Tea Selection",
    description: "Earl Grey, Green Tea, Herbal Teas",
    price: "K2,000.00",
  },
  {
    name: "Mineral Water",
    description: "Still and sparkling water",
    price: "K1,200.00",
  },
]

interface BarMenuItem {
  name: string
  description: string
  price: string
}

interface BarMenuSectionProps {
  title: string
  items: BarMenuItem[]
  icon: React.ReactNode
  delay?: number
}

function BarMenuSection({ title, items, icon, delay = 0 }: BarMenuSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(items.length).fill(false))
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
            items.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 60)
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

  // Special handling for wine section
  const isWineSection = title === "Wine Selection"

  return (
    <section ref={sectionRef} className="space-y-6">
      <div className="text-center">
        <div
          className={`flex justify-center items-center space-x-3 mb-4 transition-all duration-600 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="p-2 bg-blue-100 rounded-full">{icon}</div>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900">{title}</h3>
        </div>
        <div
          className={`flex justify-center items-center space-x-4 mb-2 transition-all duration-600 delay-200 transform ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        >
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"></div>
        </div>
      </div>

      <div className={`grid ${isWineSection ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
        {items.map((item, index) => (
          <Card
            key={index}
            className={`border-0 shadow-md hover:shadow-lg transition-all duration-400 hover:scale-105 bg-white/90 backdrop-blur-sm border-l-4 border-l-indigo-500 group cursor-pointer transform ${
              visibleItems[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <CardContent className="p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-blue-900 leading-tight pr-2 group-hover:text-indigo-700 transition-colors duration-300">
                    {item.name}
                  </h4>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm group-hover:text-slate-500 transition-colors duration-300">
                  {item.description}
                </p>
                {isWineSection ? (
                  <div className="mt-3 flex flex-col space-y-1">
                    {item.price.split('|').map((price, i) => (
                      <span key={i} className="text-sm font-semibold text-indigo-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap group-hover:bg-indigo-100 group-hover:scale-105 transition-all duration-300">
                        {price.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="mt-3 text-sm font-semibold text-indigo-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-300">
                    {item.price}
                  </span>
                )}
                <div className="mt-3 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent group-hover:via-indigo-400 transition-colors duration-300"></div>
              </div>

              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-150"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function BarSection() {
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleDownload = () => {
      handleDownloadPDF()
    }

    window.addEventListener('download-menu-pdf', handleDownload)
    return () => {
      window.removeEventListener('download-menu-pdf', handleDownload)
    }
  }, [])

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    let y = 20
    let pageCount = 1

    // Add header logo placeholder (circle with initials)
    doc.setFillColor(239, 246, 255) // blue-50
    doc.circle(pageWidth / 2, y + 10, 15, 'F')
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 64, 175) // blue-900
    doc.text('LS', pageWidth / 2, y + 15, { align: 'center' })
    y += 35

    // Add decorative line at top
    doc.setDrawColor(59, 130, 246) // blue-500
    doc.setLineWidth(0.5)
    doc.line(margin, y - 5, pageWidth - margin, y - 5)

    // Add title with gradient effect
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 64, 175) // blue-900
    doc.text('LAVISH SUITES', pageWidth / 2, y, { align: 'center' })
    y += 12

    // Add subtitle with decorative elements
    doc.setFontSize(20)
    doc.setTextColor(59, 130, 246) // blue-500
    doc.text('BAR MENU', pageWidth / 2, y, { align: 'center' })
    y += 15

    // Add decorative dots
    const dotSpacing = 4
    const dotCount = 20
    const startX = (pageWidth - (dotCount * dotSpacing)) / 2
    doc.setFillColor(59, 130, 246) // blue-500
    for (let i = 0; i < dotCount; i++) {
      doc.circle(startX + (i * dotSpacing), y, 0.5, 'F')
    }
    y += 10

    // Add date and contact info
    doc.setFontSize(11)
    doc.setTextColor(100, 116, 139) // slate-500
    doc.setFont('helvetica', 'normal')
    doc.text(`Last updated: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: 'center' })
    y += 8
    doc.text('Contact: +260 977 123456 | Email: info@lavishsuites.com', pageWidth / 2, y, { align: 'center' })
    y += 20

    // Helper function to add page number
    const addPageNumber = (pageNum: number) => {
      doc.setFontSize(10)
      doc.setTextColor(100, 116, 139) // slate-500
      doc.text(`Page ${pageNum}`, pageWidth / 2, 15, { align: 'center' })
    }

    // Helper function to add section
    const addSection = (title: string, items: BarMenuItem[]) => {
      // Check if we need a new page
      if (y > 250) {
        doc.addPage()
        pageCount++
        addPageNumber(pageCount)
        // Add header to new page
        doc.setFontSize(10)
        doc.setTextColor(100, 116, 139) // slate-500
        doc.text('LAVISH SUITES - BAR MENU', pageWidth / 2, 25, { align: 'center' })
        doc.setDrawColor(59, 130, 246) // blue-500
        doc.setLineWidth(0.5)
        doc.line(margin, 30, pageWidth - margin, 30)
        y = 40
      }

      // Section title with background and icon
      doc.setFillColor(239, 246, 255) // blue-50
      doc.rect(margin - 5, y - 8, pageWidth - (2 * margin) + 10, 12, 'F')
      doc.setFontSize(16)
      doc.setTextColor(30, 64, 175) // blue-900
      doc.setFont('helvetica', 'bold')
      doc.text(title, margin, y)
      y += 15

      // Items
      doc.setFontSize(11)
      items.forEach(item => {
        // Check if we need a new page
        if (y > 270) {
          doc.addPage()
          pageCount++
          addPageNumber(pageCount)
          // Add header to new page
          doc.setFontSize(10)
          doc.setTextColor(100, 116, 139) // slate-500
          doc.text('LAVISH SUITES - BAR MENU', pageWidth / 2, 25, { align: 'center' })
          doc.setDrawColor(59, 130, 246) // blue-500
          doc.setLineWidth(0.5)
          doc.line(margin, 30, pageWidth - margin, 30)
          y = 40
        }

        // Item name and price
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(30, 64, 175) // blue-900
        const nameWidth = doc.getTextWidth(item.name)
        doc.text(item.name, margin, y)
        
        // Price with background
        const priceText = item.price
        const priceWidth = doc.getTextWidth(priceText)
        doc.setFillColor(239, 246, 255) // blue-50
        doc.roundedRect(
          pageWidth - margin - priceWidth - 8,
          y - 4,
          priceWidth + 8,
          8,
          2,
          2,
          'F'
        )
        doc.setTextColor(79, 70, 229) // indigo-600
        doc.text(priceText, pageWidth - margin - 4, y)
        y += 8

        // Item description
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(71, 85, 105) // slate-600
        const splitDesc = doc.splitTextToSize(item.description, pageWidth - 2 * margin)
        doc.text(splitDesc, margin, y)
        y += 7 * splitDesc.length + 8

        // Add subtle separator line
        doc.setDrawColor(226, 232, 240) // slate-200
        doc.setLineWidth(0.2)
        doc.line(margin, y - 4, pageWidth - margin, y - 4)
      })

      y += 10
    }

    // Add all sections
    addSection('Signature Cocktails', cocktails)
    addSection('Wine Selection', wines)
    addSection('Premium Spirits', spirits)
    addSection('Beer Selection', beers)
    addSection('Non-Alcoholic Beverages', nonAlcoholic)

    // Add footer with decorative line
    doc.setDrawColor(59, 130, 246) // blue-500
    doc.setLineWidth(0.5)
    doc.line(margin, 280, pageWidth - margin, 280)
    
    // Add footer text
    doc.setFontSize(10)
    doc.setTextColor(100, 116, 139) // slate-500
    doc.text('Prices are in Kwacha (K)', pageWidth / 2, 285, { align: 'center' })
    doc.text('For more information, please visit our website', pageWidth / 2, 290, { align: 'center' })
    doc.text('© 2024 Lavish Suites. All rights reserved.', pageWidth / 2, 295, { align: 'center' })

    // Save the PDF
    doc.save('lavish-suites-bar-menu.pdf')
  }

  return (
    <div className="space-y-16">
      <div className="text-center mb-12">
        <h2
          className={`text-4xl md:text-5xl font-bold text-blue-900 mb-4 transition-all duration-800 transform ${headerVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          BAR MENU
        </h2>
        <p
          className={`text-xl text-blue-700 max-w-2xl mx-auto transition-all duration-800 delay-300 transform ${headerVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          Discover our extensive selection of premium beverages, crafted cocktails, and fine wines
        </p>
        <div
          className={`mt-6 flex justify-center items-center gap-4 transition-all duration-800 delay-600 transform ${headerVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          <Button
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Menu
          </Button>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"></div>
        </div>
      </div>

      <BarMenuSection
        title="Signature Cocktails"
        items={cocktails}
        icon={<Martini className="h-6 w-6 text-blue-600" />}
        delay={0}
      />

      <BarMenuSection
        title="Wine Selection"
        items={wines}
        icon={<Wine className="h-6 w-6 text-blue-600" />}
        delay={100}
      />

      <BarMenuSection
        title="Premium Spirits"
        items={spirits}
        icon={<Wine className="h-6 w-6 text-blue-600" />}
        delay={200}
      />

      <BarMenuSection
        title="Beer Selection"
        items={beers}
        icon={<Wine className="h-6 w-6 text-blue-600" />}
        delay={300}
      />

      <BarMenuSection
        title="Non-Alcoholic Beverages"
        items={nonAlcoholic}
        icon={<Coffee className="h-6 w-6 text-blue-600" />}
        delay={400}
      />
    </div>
  )
}
