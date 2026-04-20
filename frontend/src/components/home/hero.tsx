"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, cubicBezier, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const textVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            delay: custom * 0.15,
            ease: cubicBezier(0.25, 0.4, 0.25, 1),
        },
    }),
};

const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: 0.8,
            ease: cubicBezier(0.25, 0.4, 0.25, 1),
        },
    },
};

const imageVariants: Variants = {
    enter: {
        opacity: 0,
        scale: 1.1,
    },
    center: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.5,
            ease: cubicBezier(0.25, 0.4, 0.25, 1),
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 1,
            ease: cubicBezier(0.25, 0.4, 0.25, 1),
        },
    },
};

// Dummy images (replace later)
const heroImages = [
  "/home/hero1.jpg",
  "/home/hero2.jpg",
  "/home/hero3.jpg",
];

export default function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-20 md:pt-24">
            {/* Background Image Slider with Overlay */}
            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                    >
                        <Image
                            src={heroImages[currentImageIndex]}
                            alt={`Fashion Banner ${currentImageIndex + 1}`}
                            fill
                            priority={currentImageIndex === 0}
                            quality={100}
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />

                {/* Vignette Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
                {/* Accent Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="h-px w-20 bg-linear-to-r from-transparent via-white/60 to-transparent mb-8 sm:mb-12"
                />

                {/* Main Heading */}
                <motion.h1
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.3em] text-white mb-6 sm:mb-8"
                >
                    BALOCH
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200 tracking-wide mb-4 sm:mb-6 text-center max-w-3xl"
                >
                    Exquisite Fabrics for a Bold Identity
                </motion.p>

                {/* Supporting Text */}
                <motion.div
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-400 font-light tracking-widest mb-12 sm:mb-16 text-center"
                >
                    <span>PREMIUM</span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span>MINIMAL</span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span>TIMELESS</span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={buttonVariants}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
                >
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="group relative border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 text-base sm:text-lg py-6 sm:py-7 px-8 sm:px-10 tracking-wider"
                    >
                        <Link href="/products" className="flex items-center justify-center gap-2">
                            Shop Now
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        className="group relative bg-white text-black hover:bg-gray-100 transition-all duration-300 text-base sm:text-lg py-6 sm:py-7 px-8 sm:px-10 tracking-wider font-medium"
                    >
                        <Link href="/products" className="flex items-center justify-center gap-2">
                            View Collection
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll</span>
                        <div className="w-px h-12 bg-linear-to-b from-gray-500/50 to-transparent" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className="group relative"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div
                            className={`h-1 transition-all duration-500 ${
                                index === currentImageIndex
                                    ? "w-8 bg-white"
                                    : "w-6 bg-white/30 group-hover:bg-white/50"
                            }`}
                        />
                    </button>
                ))}
            </div>
        </section>
    );
}