"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import jsPDF from 'jspdf'

const OPENING_HOUR = 6 // 6 AM
const CLOSING_HOUR = 22 // 10 PM

// Restaurant Menu Data
const startersAndSalads = [
  {
    name: "Greek Salad",
    description: "Traditional Greek salad with tomato, cucumber, green pepper, onion, calamata black or green olives and feta cheese drizzled with herbed olive oil and lemon juice",
    price: "K15,000.00",
  },
  {
    name: "Summer Salad",
    description: "A combination of summer vegetables and a special dressing",
    price: "K8,000.00",
  },
  {
    name: "Chicken / Beef Salad",
    description: "Braised beef or chicken combined with fresh vegetables and dressed with olive oil and lemon juice",
    price: "K12,000.00",
  },
  {
    name: "Buffalo Wings",
    description: "An option of fried or grilled chicken wings unbraided dipped in a vinegar based sauce",
    price: "K15,000.00",
  },
  {
    name: "Kebabs",
    description: "An option of beef or chicken marinated in lavish special sauce",
    price: "K15,000.00",
  },
  {
    name: "Tacos",
    description: "An option of beef or chicken",
    price: "K18,000.00",
  },
]

const soups = [
  {
    name: "Cream Soup",
    description: "A choice of either cream of mushroom, butternut pumpkin or mixed vegetable",
    price: "K15,000.00",
  },
  {
    name: "Minestrone Soup",
    description: "A thick soup of vegetables like onion celery potatoes carrots and tomatoes seasoned with Italian herbs",
    price: "K18,000.00",
  },
]

const snacks = [
  {
    name: "Gizzards or Livers",
    description: "Cooked and served with chefs special sauce",
    price: "K15,000.00",
  },
  {
    name: "Wraps",
    description: "Chicken, veggies and beef - marinated chicken breast or beef strips and veggies in a special lavish sauce wrapped in a crepe",
    price: "K15,000.00",
  },
]

const mains = [
  {
    name: "Grilled/Fried Chicken",
    description: "Quarter chicken with flavor option of lemon + herb, spicy and mild. Served with fries, mashed potato, rice or nsima",
    price: "Quarter: K18,000 | Half: K27,000 | Full: K38,000",
  },
  {
    name: "Chicken Curry",
    description: "Creamy chicken curry with seasonal vegetables",
    price: "K20,000.00",
  },
  {
    name: "Road Runner / Local",
    description: "Local chicken prepared the traditional way served either boiled in its own sauce or roasted",
    price: "K26,000.00",
  },
  {
    name: "Zinziri",
    description: "Roasted or fried quails",
    price: "K18,000.00",
  },
  {
    name: "Khwasu Khwasu",
    description: "A choice of chicken, goat or pork sautéed in onions and special sauce",
    price: "K27,000.00",
  },
]

const steaks = [
  {
    name: "T-bone Steak",
    description: "Grilled on a bed of coals marinated to perfection in garlic and choice spices",
    price: "K30,000.00",
  },
  {
    name: "Rump Steak",
    description: "Grilled on a bed of coals marinated to perfection in garlic and choice spices",
    price: "K30,000.00",
  },
  {
    name: "Sirloin Steak",
    description: "Grilled on a bed of coals marinated to perfection in garlic and choice spices",
    price: "K30,000.00",
  },
  {
    name: "Fillet Steak",
    description: "Grilled on a bed of coals marinated to perfection in garlic and choice spices",
    price: "K30,000.00",
  },
  {
    name: "Pork Chops",
    description: "Choice pork seared and served with sauce and vegetables",
    price: "K27,000.00",
  },
  {
    name: "Pork Ribs",
    description: "Grilled pork ribs with special sauce and herb flavourings",
    price: "K30,000.00",
  },
  {
    name: "Lamb Chops",
    description: "Marinated in herbs cooked to perfection in oil or grilled",
    price: "K30,000.00",
  },
  {
    name: "Lamb Shank",
    description: "Braised with rosemary and special sauce",
    price: "K35,000.00",
  },
  {
    name: "Rack of Lamb",
    description: "Premium cut prepared to perfection",
    price: "K38,000.00",
  },
]

const seafood = [
  {
    name: "Chambo",
    description: "Open or whole Chambo fried or grilled marinated in fresh herbs",
    price: "Medium: K26,000 | Large: K35,000 | X-Large: K40,000",
  },
  {
    name: "Butter Fish",
    description: "Grilled or fried Batala",
    price: "Medium: K30,000 | Large: K39,000",
  },
  {
    name: "Creamy Garlic Prawns",
    description: "Cooked in creamy sauce and served with pasta or potatoes",
    price: "K45,000.00",
  },
  {
    name: "Seared Prawns",
    description: "Seared to perfection in Butter Garlic and White Wine",
    price: "K40,000.00",
  },
  {
    name: "Lobster Thermidor",
    description: "Mushroom, onion double cream and parmesan cheese re filled in a shell",
    price: "K70,000.00",
  },
  {
    name: "Grilled Lobster",
    description: "Fresh lobster grilled to perfection",
    price: "K50,000.00",
  },
]

const pasta = [
  {
    name: "Spaghetti Bolognaise",
    description: "Spaghetti with tomato sauce and ground beef along with carrots and onions",
    price: "K20,000.00",
  },
  {
    name: "Seafood Pasta",
    description: "Sautéed assorted seafood including prawn crab tilapia fillets served with creamy pasta",
    price: "K30,000.00",
  },
  {
    name: "Chicken Alfredo",
    description: "Rich and creamy sauced pasta topped with juicy chicken strips",
    price: "K20,000.00",
  },
]

const desserts = [
  {
    name: "Fruit Salad",
    description: "Medley of seasonal cut fruits served with plain yoghurt and berry coulis",
    price: "K12,000.00",
  },
  {
    name: "Lemon Cheese Cake",
    description: "Silky rich cheese cake flavoured with lemon rind cherries ring made on a biscuit served with black cherries topping",
    price: "K12,000.00",
  },
  {
    name: "Three Scoops Ice Cream",
    description: "Choice of vanilla, chocolate, strawberry, honey comb and coffee served with either chocolate sauce or warm cherries",
    price: "K12,000.00",
  },
  {
    name: "Chocolate Volcano & Chili Cake",
    description: "With molten chocolate and chili centre, topped with vanilla ice cream",
    price: "K12,000.00",
  },
  {
    name: "Apple, Pear and Ginger Crumble",
    description: "Served warm with custard and vanilla ice cream",
    price: "K12,000.00",
  },
]

// Bar Menu Data
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

export function StatusBanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkTime = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const isCurrentlyOpen = currentHour >= OPENING_HOUR && currentHour < CLOSING_HOUR
      setIsOpen(isCurrentlyOpen)
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }))
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkTime()
    checkMobile()
    const timeInterval = setInterval(checkTime, 60000) // Update every minute
    window.addEventListener('resize', checkMobile)

    return () => {
      clearInterval(timeInterval)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const handleInteraction = () => {
    if (isMobile) {
      setIsHovered(!isHovered)
    }
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    let y = 20
    let pageCount = 1

    // Add logo
    const logo = new Image()
    logo.src = '/images/lavish-suites-logo.png'
    logo.onload = () => {
      const logoWidth = 40
      const logoHeight = (logoWidth * logo.height) / logo.width
      doc.addImage(logo, 'PNG', (pageWidth - logoWidth) / 2, y, logoWidth, logoHeight)
      y += logoHeight + 10

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
      doc.text('MENU', pageWidth / 2, y, { align: 'center' })
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
      const addSection = (title: string, items: any[]) => {
        // Check if we need a new page
        if (y > 250) {
          doc.addPage()
          pageCount++
          addPageNumber(pageCount)
          // Add header to new page
          doc.setFontSize(10)
          doc.setTextColor(100, 116, 139) // slate-500
          doc.text('LAVISH SUITES - MENU', pageWidth / 2, 25, { align: 'center' })
          doc.setDrawColor(59, 130, 246) // blue-500
          doc.setLineWidth(0.5)
          doc.line(margin, 30, pageWidth - margin, 30)
          y = 40
        }

        // Section title with background
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
            doc.text('LAVISH SUITES - MENU', pageWidth / 2, 25, { align: 'center' })
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
          const priceX = pageWidth - margin - priceWidth - 8
          doc.setFillColor(239, 246, 255) // blue-50
          doc.roundedRect(
            priceX,
            y - 4,
            priceWidth + 8,
            8,
            2,
            2,
            'F'
          )
          doc.setTextColor(79, 70, 229) // indigo-600
          doc.text(priceText, priceX + 4, y)
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

      // Add Restaurant Menu Sections
      addSection('Starters & Salads', startersAndSalads)
      addSection('Soups & Snacks', [...soups, ...snacks])
      addSection('Main Courses', mains)
      addSection('Steaks & Grills', steaks)
      addSection('Lake & Sea Food', seafood)
      addSection('Pasta', pasta)
      addSection('Desserts', desserts)

      // Add Bar Menu Sections
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
      doc.save('lavish-suites-menu.pdf')
    }
  }

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
      <div
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleInteraction}
        className={`flex items-center gap-2 px-3 py-2 rounded-l-lg shadow-lg transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "bg-green-500"
            : "bg-red-500"
        } ${isHovered ? "translate-x-0" : "translate-x-[calc(100%-2rem)]"}`}
      >
        <div className="w-6 h-6 relative">
          {isOpen ? (
            <svg
              className="animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg
              className="animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <div className="text-white font-semibold whitespace-nowrap text-sm">
            {isOpen ? "OPEN" : "CLOSED"}
          </div>
          <div className="text-white text-xs">
            {currentTime}
          </div>
          {isHovered && (
            <div className="text-white text-xs border-l border-white/30 pl-2 ml-2 whitespace-nowrap">
              {OPENING_HOUR}:00 AM - {CLOSING_HOUR}:00 PM
            </div>
          )}
        </div>
        <ChevronLeft 
          className={`h-4 w-4 text-white transition-transform duration-300 ${
            isHovered ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Download Button */}
      <div
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        className={`transition-all duration-300 ease-in-out transform ${
          isHovered ? "translate-x-0" : "translate-x-[calc(100%-2rem)]"
        }`}
      >
        <Button
          onClick={handleDownloadPDF}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-2 rounded-l-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Download Menu</span>
        </Button>
      </div>
    </div>
  )
} 