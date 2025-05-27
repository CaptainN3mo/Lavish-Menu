"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import MenuSection from "@/components/menu-section"
import { BarSection } from "@/components/bar-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Utensils, Wine } from "lucide-react"

const startersAndSalads = [
  {
    name: "Greek Salad",
    description:
      "Traditional Greek salad with tomato, cucumber, green pepper, onion, calamata black or green olives and feta cheese drizzled with herbed olive oil and lemon juice",
    price: "K15,000.00",
    category: "Appetizers"
  },
  {
    name: "Summer Salad",
    description: "A combination of summer vegetables and a special dressing",
    price: "K8,000.00",
    category: "Appetizers"
  },
  {
    name: "Chicken / Beef Salad",
    description: "Braised beef or chicken combined with fresh vegetables and dressed with olive oil and lemon juice",
    price: "K12,000.00",
    category: "Appetizers"
  },
  {
    name: "Buffalo Wings",
    description: "An option of fried or grilled chicken wings unbraided dipped in a vinegar based sauce",
    price: "K15,000.00",
    category: "Appetizers"
  },
  {
    name: "Kebabs",
    description: "An option of beef or chicken marinated in lavish special sauce",
    price: "K15,000.00",
    category: "Appetizers"
  },
  {
    name: "Tacos",
    description: "An option of beef or chicken",
    price: "K18,000.00",
    category: "Appetizers"
  },
]

const soups = [
  {
    name: "Cream Soup",
    description: "A choice of either cream of mushroom, butternut pumpkin or mixed vegetable",
    price: "K15,000.00",
    category: "Soups"
  },
  {
    name: "Minestrone Soup",
    description:
      "A thick soup of vegetables like onion celery potatoes carrots and tomatoes seasoned with Italian herbs",
    price: "K18,000.00",
    category: "Soups"
  },
]

const snacks = [
  {
    name: "Gizzards or Livers",
    description: "Cooked and served with chefs special sauce",
    price: "K15,000.00",
    category: "Snacks"
  },
  {
    name: "Wraps",
    description:
      "Chicken, veggies and beef - marinated chicken breast or beef strips and veggies in a special lavish sauce wrapped in a crepe",
    price: "K15,000.00",
    category: "Snacks"
  },
]

const mains = [
  {
    name: "Grilled/Fried Chicken",
    description:
      "Quarter chicken with flavor option of lemon + herb, spicy and mild. Served with fries, mashed potato, rice or nsima",
    price: "Quarter: K18,000 | Half: K27,000 | Full: K38,000",
    category: "Main Course"
  },
  {
    name: "Chicken Curry",
    description: "Creamy chicken curry with seasonal vegetables",
    price: "K20,000.00",
    category: "Main Course"
  },
  {
    name: "Road Runner / Local",
    description: "Local chicken prepared the traditional way served either boiled in its own sauce or roasted",
    price: "K26,000.00",
    category: "Main Course"
  },
  {
    name: "Zinziri",
    description: "Roasted or fried quails",
    price: "K18,000.00",
    category: "Main Course"
  },
  {
    name: "Khwasu Khwasu",
    description: "A choice of chicken, goat or pork sautéed in onions and special sauce",
    price: "K27,000.00",
    category: "Main Course"
  },
]

const steaks = [
  {
    name: "T-bone Steak",
    description: "Grilled on a bed of coals marinated to perfection in garlic and choice spices",
    price: "K30,000.00",
    category: "Main Course"
  },
  {
    name: "Rump Steak",
    description: "Grilled on a bed of coals marinated to perfection in garlic and choice spices",
    price: "K30,000.00",
    category: "Main Course"
  },
  {
    name: "Sirloin Steak",
    description: "Grilled on a bed of coals marinated to perfection in garlic and choice spices",
    price: "K30,000.00",
    category: "Main Course"
  },
  {
    name: "Fillet Steak",
    description: "Grilled on a bed of coals marinated to perfection in garlic and choice spices",
    price: "K30,000.00",
    category: "Main Course"
  },
  {
    name: "Pork Chops",
    description: "Choice pork seared and served with sauce and vegetables",
    price: "K27,000.00",
    category: "Main Course"
  },
  {
    name: "Pork Ribs",
    description: "Grilled pork ribs with special sauce and herb flavourings",
    price: "K30,000.00",
    category: "Main Course"
  },
  {
    name: "Lamb Chops",
    description: "Marinated in herbs cooked to perfection in oil or grilled",
    price: "K30,000.00",
    category: "Main Course"
  },
  {
    name: "Lamb Shank",
    description: "Braised with rosemary and special sauce",
    price: "K35,000.00",
    category: "Main Course"
  },
  {
    name: "Rack of Lamb",
    description: "Premium cut prepared to perfection",
    price: "K38,000.00",
    category: "Main Course"
  },
]

const seafood = [
  {
    name: "Chambo",
    description: "Open or whole Chambo fried or grilled marinated in fresh herbs",
    price: "Medium: K26,000 | Large: K35,000 | X-Large: K40,000",
    category: "Main Course"
  },
  {
    name: "Butter Fish",
    description: "Grilled or fried Batala",
    price: "Medium: K30,000 | Large: K39,000",
    category: "Main Course"
  },
  {
    name: "Creamy Garlic Prawns",
    description: "Cooked in creamy sauce and served with pasta or potatoes",
    price: "K45,000.00",
    category: "Main Course"
  },
  {
    name: "Seared Prawns",
    description: "Seared to perfection in Butter Garlic and White Wine",
    price: "K40,000.00",
    category: "Main Course"
  },
  {
    name: "Lobster Thermidor",
    description: "Mushroom, onion double cream and parmesan cheese re filled in a shell",
    price: "K70,000.00",
    category: "Main Course"
  },
  {
    name: "Grilled Lobster",
    description: "Fresh lobster grilled to perfection",
    price: "K50,000.00",
    category: "Main Course"
  },
]

const pasta = [
  {
    name: "Spaghetti Bolognaise",
    description: "Spaghetti with tomato sauce and ground beef along with carrots and onions",
    price: "K20,000.00",
    category: "Main Course"
  },
  {
    name: "Seafood Pasta",
    description: "Sautéed assorted seafood including prawn crab tilapia fillets served with creamy pasta",
    price: "K30,000.00",
    category: "Main Course"
  },
  {
    name: "Chicken Alfredo",
    description: "Rich and creamy sauced pasta topped with juicy chicken strips",
    price: "K20,000.00",
    category: "Main Course"
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
    description:
      "Silky rich cheese cake flavoured with lemon rind cherries ring made on a biscuit served with black cherries topping",
    price: "K12,000.00",
  },
  {
    name: "Three Scoops Ice Cream",
    description:
      "Choice of vanilla, chocolate, strawberry, honey comb and coffee served with either chocolate sauce or warm cherries",
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("restaurant")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 transition-opacity duration-800 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <Header />
      <Hero />

      {/* Navigation Tabs with refined animations */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-blue-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-1 py-4">
            <Button
              onClick={() => setActiveTab("restaurant")}
              variant={activeTab === "restaurant" ? "default" : "outline"}
              className={`px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === "restaurant"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-400"
              }`}
            >
              <Utensils
                className={`mr-2 h-5 w-5 transition-transform duration-300 ${activeTab === "restaurant" ? "rotate-12" : ""}`}
              />
              Restaurant Menu
            </Button>
            <Button
              onClick={() => setActiveTab("bar")}
              variant={activeTab === "bar" ? "default" : "outline"}
              className={`px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === "bar"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-400"
              }`}
            >
              <Wine
                className={`mr-2 h-5 w-5 transition-transform duration-300 ${activeTab === "bar" ? "rotate-12" : ""}`}
              />
              Bar Menu
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div
          className={`transition-all duration-500 transform ${activeTab === "restaurant" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 absolute"}`}
        >
          {activeTab === "restaurant" && (
            <div className="space-y-16">
              <MenuSection title="Starters & Salads" items={startersAndSalads} delay={0} />
              <MenuSection title="Soups & Snacks" items={[...soups, ...snacks]} delay={100} />
              <MenuSection title="Main Courses" items={mains} delay={200} />
              <MenuSection title="Steaks & Grills" items={steaks} delay={300} />
              <MenuSection title="Lake & Sea Food" items={seafood} delay={400} />
              <MenuSection title="Pasta" items={pasta} delay={500} />
              <MenuSection title="Desserts" items={desserts} delay={600} />
            </div>
          )}
        </div>

        <div
          className={`transition-all duration-500 transform ${activeTab === "bar" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 absolute"}`}
        >
          {activeTab === "bar" && <BarSection />}
        </div>
      </main>

      <Footer />
    </div>
  )
}
