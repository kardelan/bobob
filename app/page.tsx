"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function BugePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const dogRef = useRef<HTMLImageElement>(null)
  const footerImageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getLetterTransform = (element: HTMLElement | null, index: number) => {
    if (!element) return "translate(0px, 0px)"

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distance = Math.sqrt(Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2))

    if (distance < 200) {
      const moveX = (centerX - mousePosition.x) * 0.1
      const moveY = (centerY - mousePosition.y) * 0.1
      return `translate(${moveX}px, ${moveY}px)`
    }

    return "translate(0px, 0px)"
  }

  const WordByWordText = ({ text, className = "" }: { text: string; className?: string }) => {
    const [visibleWords, setVisibleWords] = useState<number>(0)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const words = text.split(" ")
            words.forEach((_, index) => {
              setTimeout(() => {
                setVisibleWords(index + 1)
              }, index * 50)
            })
          }
        },
        { threshold: 0.3 },
      )

      if (textRef.current) {
        observer.observe(textRef.current)
      }

      return () => observer.disconnect()
    }, [text])

    const words = text.split(" ")

    return (
      <div ref={textRef} className={className}>
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block mr-1 transition-all duration-300 ${
              index < visibleWords ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    )
  }

  const AnimatedTitle = ({ text, className = "" }: { text: string; className?: string }) => {
    return (
      <h1 className={className}>
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block animate-pulse"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: `${2 + (index % 3)}s`,
              transform: `rotate(${Math.sin(index) * 2}deg)`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background - Using a solid blue gradient instead of BUGE background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600" />

      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-[60] md:hidden">
        <Button
          variant="outline"
          size="sm"
          className="bg-white shadow-lg hover:shadow-xl transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="font-bold text-black">MENU</span>
        </Button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-5 right-5 gap-3 z-50">
        <Button variant="outline" size="sm" className="bg-white shadow-lg hover:shadow-xl transition-all">
          <Link href="https://t.me/bobocoins" className="flex items-center gap-2">
            <span className="font-bold text-black">TELEGRAM</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-lg hover:shadow-xl transition-all">
          <Link href="https://x.com/bobocoins" className="flex items-center gap-2">
            <span className="font-bold text-black">X</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-lg hover:shadow-xl transition-all">
          <Link href="#" className="font-bold text-black">
            CHART
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-lg hover:shadow-xl transition-all">
          <Link href="#" className="font-bold text-black">
            BUY $BOBO
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-lg hover:shadow-xl transition-all">
          <Link href="#" className="font-bold text-black">
            APE STORE
          </Link>
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[55] md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
            <Button
              variant="outline"
              size="lg"
              className="bg-white shadow-lg w-full max-w-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="https://t.me/bobocoins" className="font-bold text-black text-lg">
                TELEGRAM
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white shadow-lg w-full max-w-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="https://x.com/bobocoins" className="font-bold text-black text-lg">
                X
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white shadow-lg w-full max-w-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="#" className="font-bold text-black text-lg">
                CHART
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white shadow-lg w-full max-w-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="#" className="font-bold text-black text-lg">
                BUY $BOBO
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white shadow-lg w-full max-w-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="#" className="font-bold text-black text-lg">
                APE STORE
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white text-lg mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              CLOSE
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 pt-16 md:pt-0">
        <div ref={heroRef} className="flex gap-2 sm:gap-5 mb-10 sm:mb-20 relative">
          {["B", "O", "B", "O"].map((letter, index) => (
            <div
              key={letter}
              className="text-[80px] sm:text-[120px] md:text-[200px] lg:text-[320px] font-black text-white cursor-pointer transition-all duration-100 select-none"
              style={{
                WebkitTextStroke: "0.2rem black",
                WebkitTextFillColor: "white",
                transform: getLetterTransform(heroRef.current?.children[index] as HTMLElement, index),
                animation: `subtleTilt${index + 1} ${3.5 + index * 0.3}s ease-in-out infinite`,
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        <Image
          ref={dogRef}
          src="/images/bobo-character.png"
          alt="Bobo Bear"
          width={400}
          height={600}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-100 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto"
          style={{
            transform: `translateX(-50%) ${
              mousePosition.x && dogRef.current
                ? (
                    () => {
                      const rect = dogRef.current.getBoundingClientRect()
                      const centerX = rect.left + rect.width / 2
                      const centerY = rect.top + rect.height / 2
                      const distance = Math.sqrt(
                        Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2),
                      )
                      if (distance < 300) {
                        const moveX = (centerX - mousePosition.x) * 0.05
                        const moveY = (centerY - mousePosition.y) * 0.05
                        return `translate(${moveX}px, ${moveY}px)`
                      }
                      return "translate(0px, 0px)"
                    }
                  )()
                : "translate(0px, 0px)"
            }`,
          }}
        />
      </section>

      {/* About Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-10 sm:py-20">
        <AnimatedTitle
          text="ABOUT BOBO"
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 sm:mb-10 text-center"
          style={{ WebkitTextStroke: "1px sm:2px black", WebkitTextFillColor: "white" }}
        />

        <div className="mb-6 sm:mb-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_6093852341942994186_x-removebg-preview-aFKLDzc06Z8sR0ghC2lVvOuDsKRzxW.png"
            alt="BOBO - Blue Bear Character"
            width={320}
            height={320}
            className="w-60 h-60 sm:w-80 sm:h-80 rounded-3xl animate-pulse object-cover"
          />
        </div>

        <p
          className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl text-center leading-relaxed px-4"
          style={{ WebkitTextStroke: "0.5px black", WebkitTextFillColor: "white" }}
        >
          BOBO is a digital bear born on Base Network. He exists to bring back what's been missing—real internet culture
          with soul. He doesn't make promises. He simply reminds us that a meme, if it hits right, can move people more
          than any roadmap ever could. He was made for the ones who remember when crypto was fun. When coins felt alive
          because the people behind them cared. BOBO is for the artists, the internet chads, the ones who stick around
          when everyone else moves on. Join the journey. Help build the legacy.
        </p>
      </section>

      {/* Bobonomics Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-10 sm:py-20">
        <AnimatedTitle
          text="BOBONOMICS"
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 sm:mb-10 text-center"
          style={{ WebkitTextStroke: "1px sm:2px black", WebkitTextFillColor: "white" }}
        />

        <div className="mb-6 sm:mb-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_6093852341942994184_x-removebg-preview-qRFTyQ5JHMdfMns6W2kfYl0yovNMHW.png"
            alt="Strong BOBO - Muscular Blue Bear"
            width={320}
            height={320}
            className="w-60 h-60 sm:w-80 sm:h-80 rounded-3xl animate-pulse object-cover"
          />
        </div>

        <p
          className="text-lg sm:text-2xl md:text-3xl text-white max-w-3xl text-center mb-8 sm:mb-12 leading-relaxed px-4"
          style={{ WebkitTextStroke: "0.5px black", WebkitTextFillColor: "white" }}
        >
          Bobo is on a mission to become the face of internet culture on Base Network. Not a copy. Not a gimmick. A new
          original. An internet bear for the digital age.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl w-full">
          {[
            {
              title: "NAME",
              text: "Four letters. One bear. Zero fucks given. Clean, and impossible to forget. Just like the goodest boy himself.",
              bg: "from-blue-100 to-blue-200",
            },
            {
              title: "SUPPLY",
              text: "A trillion. Because why not? Big numbers look cool and nobody wants to deal with tiny decimals.",
              bg: "from-blue-200 to-blue-300",
            },
            {
              title: "LIQUIDITY",
              text: "Gone. Poof. Vanished into the void. Sent to a dead wallet that nobody can touch. Not us, not you, not anyone.",
              bg: "from-blue-300 to-blue-400",
            },
            {
              title: "TAXES",
              text: "What taxes? Trade as much as you want. Buy high, sell low, buy again. We don't take a cut. Your money, your problem.",
              bg: "from-blue-400 to-blue-500",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.bg} rounded-3xl shadow-lg p-4 sm:p-6 hover:transform hover:-translate-y-2 hover:rotate-1 hover:scale-105 transition-all duration-200 cursor-pointer`}
            >
              <h3 className="text-xl sm:text-2xl font-black text-black mb-3 sm:mb-4 text-center">{card.title}</h3>
              <p className="text-sm sm:text-lg text-black text-center leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Buy Section - Updated with placeholder images */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-10 sm:py-20">
        <AnimatedTitle
          text="HOW TO BUY"
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 sm:mb-16 text-center"
          style={{ WebkitTextStroke: "1px sm:2px black", WebkitTextFillColor: "white" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl w-full">
          {[
            {
              title: "GET A WALLET",
              text: "Download and set up MetaMask or any Base-compatible wallet. Make sure your wallet is connected to the Base network.",
            },
            {
              title: "ADD ETH",
              text: "Bridge ETH to Base network or buy ETH directly on Base. You'll need it to swap for $BOBO and pay gas fees.",
            },
            {
              title: "VISIT DEX",
              text: "Go to Uniswap or any Base DEX, connect your wallet, and import the $BOBO token using the official contract address.",
            },
            {
              title: "NOW SWAP",
              text: "Enter the amount of ETH you want to trade, approve the swap, and confirm the transaction in your wallet.",
            },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <AnimatedTitle
                text={step.title}
                className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4"
                style={{ WebkitTextStroke: "0.5px black", WebkitTextFillColor: "white" }}
              />
              <p
                className="text-base sm:text-xl text-white leading-relaxed px-2"
                style={{ WebkitTextStroke: "0.5px black", WebkitTextFillColor: "white" }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Section - Updated with placeholder image */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 py-10 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl w-full gap-8 sm:gap-16">
          <div className="flex-1 flex justify-center order-2 lg:order-1">
            <Image
              ref={footerImageRef}
              src="/images/crying-bobo.png"
              alt="Crying Bobo Bear"
              width={400}
              height={500}
              className="transition-all duration-100 w-[300px] sm:w-[400px] md:w-[500px] h-auto"
              style={{
                transform:
                  mousePosition.x && footerImageRef.current
                    ? (() => {
                        const rect = footerImageRef.current.getBoundingClientRect()
                        const centerX = rect.left + rect.width / 2
                        const centerY = rect.top + rect.height / 2
                        const distance = Math.sqrt(
                          Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2),
                        )
                        if (distance < 400) {
                          const moveX = (centerX - mousePosition.x) * 0.15
                          const moveY = (centerY - mousePosition.y) * 0.15
                          return `translate(${moveX}px, ${moveY}px)`
                        }
                        return "translate(0px, 0px)"
                      })()
                    : "translate(0px, 0px)",
              }}
            />
          </div>

          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <AnimatedTitle
              text="JOIN THE BOBO ARMY"
              className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 sm:mb-8 leading-tight"
              style={{ WebkitTextStroke: "1px sm:2px black", WebkitTextFillColor: "white" }}
            />

            <WordByWordText
              text="THE GOODEST BOY IS WAITING FOR YOU ON BASE NETWORK."
              className="text-xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8 leading-relaxed px-2"
              style={{ WebkitTextStroke: "0.5px black", WebkitTextFillColor: "white" }}
            />

            <Button
              size="lg"
              className="bg-white text-black font-black text-xl sm:text-2xl px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto"
            >
              <Link href="#" className="text-black font-black">
                JOIN $BOBO
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="py-8 sm:py-12 px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="pt-6 sm:pt-8">
            <p className="text-base sm:text-lg text-black mb-2 font-bold">© 2025 BOBO. All Rights Reserved.</p>
            <p className="text-sm text-black mb-4">
              BOBO™ is a registered trademark. Base Network integration and community-driven development.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs text-black">
              <span>Terms of Service</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Community Guidelines</span>
              <span>•</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
