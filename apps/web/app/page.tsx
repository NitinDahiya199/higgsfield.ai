/**
 * Higgsfield.ai Landing Page
 * AI-powered creative platform for images, videos, and content creation
 *
 * Design Philosophy:
 * - Typography-first, editorial layouts
 * - Layered dark palette (#0B0D0F → #111418 → #151A20)
 * - Acid green accent (#B8FF00) used sparingly
 * - Left-aligned hero, not centered
 * - Cinematic darkness, not flat black
 * - Confident restraint over decoration
 */

"use client";

import {
  ArrowRightIcon,
  CreateImageIcon,
  CreateVideoIcon,
  MotionControlIcon,
  EditImageIcon,
  BananaIcon,
  FilmStripIcon,
  UpArrowIcon,
  SpeechBubbleIcon,
  PersonSilhouetteIcon,
} from "@/components/icons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current) return;

      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Normalize to -1 to 1 range, centered at 0.5
      setMousePosition({
        x: (x - 0.5) * 2,
        y: (y - 0.5) * 2,
      });
    };

    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  // Calculate 3D transform values based on mouse position
  const rotateX = mousePosition.y * 15; // Max 15 degrees tilt
  const rotateY = mousePosition.x * 15; // Max 15 degrees rotation
  const translateX = mousePosition.x * 20; // Max 20px movement
  const translateY = mousePosition.y * 20; // Max 20px movement
  const scale = isHovered ? 1.05 : 1;

  // Featured tools data
  const featuredTools = [
    {
      name: "Grok Imagine",
      description: "Generate cinematic videos with synchronized audio in seconds",
      badge: null,
    },
    {
      name: "Higgsfield Earn",
      description: "Get paid for creating content with Higgsfield on social media",
      badge: null,
    },
    {
      name: "Create Your Viral AI Influencer",
      description: "Get an exclusive free bundle to generate your first creator",
      badge: "Free",
    },
    {
      name: "Angles V2",
      description: "Now with 360-degree coverage, better quality, and generation history",
      badge: null,
    },
    {
      name: "Unlimited Kling Motion Control",
      description: "Copy motion from any video and apply it to your character instantly",
      badge: "Unlimited",
    },
  ];

  // Main tools grid
  const mainTools = [
    { name: "Create Image", icon: CreateImageIcon, category: "Image" },
    { name: "Create Video", icon: CreateVideoIcon, category: "Video" },
    {
      name: "Motion Control",
      icon: MotionControlIcon,
      category: "Motion",
      description: "Precise control of character actions and expressions up to 30 seconds",
    },
    {
      name: "Edit Image",
      icon: EditImageIcon,
      category: "Edit",
      description: "Brush areas to edit images",
    },
    {
      name: "Nano Banana Pro",
      icon: BananaIcon,
      category: "Pro",
      description: "Best 4K image model ever",
      badge: "UNLIMITED",
    },
    {
      name: "Kling Video Edit",
      icon: FilmStripIcon,
      category: "Video",
      description: "Advanced video editing",
    },
    {
      name: "Upscale",
      icon: UpArrowIcon,
      category: "Enhance",
      description: "Enhance media quality",
    },
    {
      name: "Lipsync Studio",
      icon: SpeechBubbleIcon,
      category: "Audio",
      description: "Create Talking Clips",
    },
    {
      name: "Soul ID",
      icon: PersonSilhouetteIcon,
      category: "Character",
      description: "Create unique character",
    },
  ];

  // Top choice tools
  const topChoiceTools = [
    { name: "Nano Banana Pro", description: "Best 4K image model ever", badge: "Unlimited" },
    {
      name: "Kling Motion Control",
      description: "Precise control of character actions and expressions up to 30 seconds",
      badge: "new",
    },
    { name: "AI Influencer Studio", description: "Create viral characters", badge: "new" },
    { name: "Skin Enhancer", description: "Natural, realistic skin textures", badge: "Pro" },
    { name: "Kling 2.6", description: "Cinematic videos with audio", badge: null },
    {
      name: "Angles 2.0",
      description: "Generate any angle view for any image in seconds",
      badge: "Pro",
    },
    {
      name: "Face Swap",
      description: "The best instant AI face swap technology for photos",
      badge: null,
    },
    { name: "Seedream 4.5", description: "Next-gen 4K image model", badge: null },
    {
      name: "Transitions",
      description: "Create seamless transitions between any shots effortlessly",
      badge: "Trending",
    },
    {
      name: "Recast",
      description: "Industry-leading character swap for any video in seconds",
      badge: "Pro",
    },
    {
      name: "Click to Ad",
      description: "Turn product links into UGC and professional video ads",
      badge: "PRO",
    },
  ];

  // Community gallery items
  const communityGallery = [
    {
      title: "Mixed Media creations",
      description: "Big-budget visual effects, from explosions to surreal transformations.",
      imageBg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Nano Banana Pro creations",
      description: "Higgsfield's first high-aesthetic photo model",
      imageBg: "bg-gradient-to-br from-green-500/20 to-cyan-500/20",
    },
    {
      title: "Ready-to-share content",
      description:
        "Create ready-to-share content in one click — from viral effects to polished commercials, no editing needed.",
      imageBg: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
    },
    {
      title: "Next-gen video creation",
      description:
        "Next-gen video creation powered by exclusive presets, seamless transitions, and pro-grade VFX.",
      imageBg: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20",
    },
    {
      title: "Organic creator-style videos",
      description: "Organic, creator-style videos that resonate with viewers",
      imageBg: "bg-gradient-to-br from-yellow-500/20 to-amber-500/20",
    },
    {
      title: "Professional brand videos",
      description: "Professional videos that showcase your brand and products beautifully",
      imageBg: "bg-gradient-to-br from-teal-500/20 to-emerald-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#EDEDED]">
      <Header />

      {/* Hero Section — Updated to match reference (robot on left, text on right) */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left Panel — 3D Robot Image with Interactive Tilt */}
            <div className="order-2 lg:order-1 flex items-center justify-center lg:justify-start">
              <div
                ref={imageContainerRef}
                className="relative h-[300px] w-full max-w-md lg:h-[450px] cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setMousePosition({ x: 0, y: 0 });
                }}
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative h-full w-full transition-transform duration-300 ease-out"
                  style={{
                    transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Image
                    src="/3d_robo.png"
                    alt="AI Robot"
                    fill
                    className="object-contain transition-all duration-300"
                    priority
                    quality={90}
                  />
                  {/* Subtle glow effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                      opacity: isHovered ? 0.2 : 0,
                      background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(184, 255, 0, 0.3), transparent 70%)`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Panel — Text Content */}
            <div className="order-1 lg:order-2 max-w-2xl lg:ml-auto">
              {/* Hero headline — Updated to match reference */}
              <h1
                id="hero-heading"
                className="mb-6 text-4xl font-semibold leading-[1.1] tracking-tight text-[#EDEDED] lg:text-6xl"
              >
                What will you
                <br />
                <span className="text-[#B8FF00]">create today?</span>
              </h1>

              {/* Hero description — Updated to match reference */}
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-[#9AA0A6] lg:text-lg">
                Explore Higgsfield Community gallery for stunning AI creations. Generate cinematic
                videos, create viral content, and build your AI influencer with our powerful tools.
              </p>

              {/* CTA Buttons — Acid green accent for primary */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="#signup"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#B8FF00] px-6 py-3 text-sm font-medium text-[#0B0D0F] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F] lg:px-8 lg:py-4 lg:text-base"
                >
                  Start creating
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center rounded-sm border border-[#1F2329] bg-transparent px-6 py-3 text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F] lg:px-8 lg:py-4 lg:text-base"
                >
                  View community
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "What will you create today?" Tools Section */}
      <section
        className="border-t border-[#1F2329] bg-[#0B0D0F] py-12 lg:py-16"
        aria-labelledby="create-today-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 id="create-today-heading" className="text-2xl font-semibold text-[#EDEDED]">
              What will you create today?
            </h2>
            <a
              href="#all-tools"
              className="text-sm text-[#9AA0A6] transition-colors hover:text-[#EDEDED]"
            >
              See all →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mainTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <a
                  key={index}
                  href={`#${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group relative overflow-hidden rounded-sm border border-[#1F2329] bg-[#151A20] p-4 text-center transition-all hover:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F]"
                >
                  <div className="mb-2 flex justify-center">
                    <IconComponent className="w-12 h-12 text-[#EDEDED]" />
                  </div>
                  <div className="mb-1 flex items-center justify-center gap-2">
                    <h3 className="text-sm font-medium text-[#EDEDED]">{tool.name}</h3>
                    {tool.badge && (
                      <span className="rounded-sm bg-[#B8FF00] px-1.5 py-0.5 text-xs font-semibold text-[#0B0D0F]">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#9AA0A6]">{tool.category}</p>
                  {tool.description && (
                    <p className="mt-2 text-xs text-[#9AA0A6]">{tool.description}</p>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Gallery Section */}
      <section
        className="border-t border-[#1F2329] bg-[#111418] py-16 lg:py-24"
        aria-labelledby="community-gallery-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {communityGallery.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-[#1F2329] bg-[#151A20] transition-all hover:border-[#B8FF00] hover:shadow-lg hover:shadow-[#B8FF00]/10"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-[#EDEDED] lg:text-2xl">
                      Explore Higgsfield Community gallery for stunning {item.title}
                    </h3>
                    <ArrowRightIcon className="w-5 h-5 text-[#9AA0A6] transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-[#9AA0A6] lg:text-base">{item.description}</p>
                </div>
                <div
                  className={`h-48 ${item.imageBg} transition-transform duration-300 group-hover:scale-105`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Announcements Section */}
      <section
        className="border-t border-[#1F2329] bg-[#0B0D0F] py-12 lg:py-16"
        aria-labelledby="announcements-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 id="announcements-heading" className="sr-only">
            Featured Announcements
          </h2>
          <div className="space-y-4">
            {featuredTools.map((tool, index) => (
              <Link
                key={index}
                href={`#${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group block relative overflow-hidden rounded-sm border border-[#1F2329] bg-[#151A20] p-5 transition-all hover:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-[#EDEDED] lg:text-xl">
                        {tool.name}
                      </h3>
                      {tool.badge && (
                        <span className="rounded-sm bg-[#B8FF00] px-2 py-1 text-xs font-semibold text-[#0B0D0F]">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#9AA0A6]">{tool.description}</p>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-[#9AA0A6] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Choice Section */}
      <section
        className="border-t border-[#1F2329] bg-[#111418] py-16 lg:py-24"
        aria-labelledby="top-choice-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2
                id="top-choice-heading"
                className="mb-2 text-3xl font-semibold leading-tight tracking-tight text-[#EDEDED] lg:text-4xl"
              >
                Top Choice
              </h2>
              <p className="text-base text-[#9AA0A6] lg:text-lg">
                Creator-recommended tools tailored for you
              </p>
            </div>
            <a
              href="#all-tools"
              className="text-sm text-[#9AA0A6] transition-colors hover:text-[#EDEDED] lg:text-base"
            >
              See all →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {topChoiceTools.map((tool, index) => (
              <a
                key={index}
                href={`#${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative overflow-hidden rounded-sm border border-[#1F2329] bg-[#151A20] p-5 transition-all hover:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#111418]"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-[#EDEDED] lg:text-lg">{tool.name}</h3>
                  {tool.badge && (
                    <span
                      className={`rounded-sm px-2 py-0.5 text-xs font-semibold ${
                        tool.badge.toLowerCase() === "new" || tool.badge === "Trending"
                          ? "bg-[#B8FF00] text-[#0B0D0F]"
                          : "bg-[#1F2329] text-[#EDEDED]"
                      }`}
                    >
                      {tool.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#9AA0A6]">{tool.description}</p>
                <ArrowRightIcon className="mt-4 w-4 h-4 text-[#9AA0A6] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Explore more AI features */}
      <section
        className="border-t border-[#1F2329] bg-[#0B0D0F] py-16 lg:py-24"
        aria-labelledby="explore-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2
            id="explore-heading"
            className="mb-10 text-3xl font-semibold leading-tight tracking-tight text-[#EDEDED] lg:text-4xl"
          >
            Explore more AI features
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {[
              "Cinema Studio",
              "Visual Effects",
              "Higgsfield Soul",
              "Higgsfield Apps",
              "Kling 2.1 Master",
              "Camera Controls",
              "Viral",
              "Action movements",
              "Commercial",
              "MiniMax Hailuo 02",
              "Seedance Pro",
              "Community",
              "Wan 2.2 Image",
              "Seedream 4.0",
              "Nano Banana",
              "Flux Kontext",
              "GPT Image",
              "Topaz",
              "Google Veo3",
              "Kling 2.5 Turbo",
              "Kling Avatars 2.0",
              "Wan 2.5",
              "Sora 2",
              "Sora 2 Presets",
              "Banana Placement",
              "Product Placement",
              "Edit Image",
              "Multi Reference",
              "Upscale",
              "Assists",
              "YouTube",
              "TikTok",
              "Instagram Reels",
              "YouTube Shorts",
              "Nano Banana Pro",
              "Kling o1",
            ].map((feature, index) => (
              <a
                key={index}
                href={`#${feature.toLowerCase().replace(/\s+/g, "-")}`}
                className="group rounded-sm border border-[#1F2329] bg-[#151A20] p-3 text-center transition-all hover:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F]"
              >
                <span className="text-xs font-medium text-[#EDEDED] lg:text-sm">{feature}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* THE ULTIMATE AI-POWERED CAMERA CONTROL Section */}
      <section
        className="border-t border-[#1F2329] bg-[#111418] py-16 lg:py-24"
        aria-labelledby="camera-control-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-10 max-w-3xl">
            <h2
              id="camera-control-heading"
              className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-[#EDEDED] lg:text-4xl"
            >
              THE ULTIMATE AI-POWERED CAMERA CONTROL FOR FILMMAKERS & CREATORS
            </h2>
            <p className="text-base leading-relaxed text-[#9AA0A6] lg:text-lg">
              AI-crafted cinematic moves like crash zooms and crane shots, fully controllable.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {[
              "Eyes In",
              "Mouth In",
              "Flying Cam Transition",
              "Handheld",
              "Pan Right",
              "Static",
              "Bullet Time",
              "Dolly Out",
              "Through Object In",
              "Car Grip",
              "Pan Left",
              "Dolly Left",
              "Through Object Out",
              "Dolly Right",
              "Aerial Pullback",
              "Rapid Zoom Out",
              "BTS",
              "Arc Right",
              "Timelapse Human",
              "FPV Drone",
              "Crash Zoom In",
              "Jib up",
              "3D Rotation",
              "Jib down",
              "Snorricam",
              "Timelapse Glam",
              "Robo Arm",
              "Rapid Zoom In",
              "Incline",
              "Arc Left",
              "360 Orbit",
              "Car Chasing",
              "Crane Up",
              "Crash Zoom Out",
              "Dutch Angle",
              "Fisheye",
              "Dolly Zoom Out",
              "Wiggle",
              "Lazy Susan",
              "Super Dolly In",
              "Super Dolly Out",
              "Crane Down",
              "Low Shutter",
              "Focus Change",
              "YoYo Zoom",
              "Double Dolly",
              "Timelapse Landscape",
              "Eating Zoom",
              "Buckle Up",
              "Tilt Down",
              "Head Tracking",
              "Crane Over The Head",
              "Object POV",
              "Overhead",
            ].map((control, index) => (
              <a
                key={index}
                href={`#${control.toLowerCase().replace(/\s+/g, "-")}`}
                className="group rounded-sm border border-[#1F2329] bg-[#151A20] p-3 text-center transition-all hover:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#111418]"
              >
                <span className="text-xs font-medium text-[#EDEDED] lg:text-sm">{control}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section
        id="pricing"
        className="border-t border-[#1F2329] bg-[#111418] py-16 lg:py-24"
        aria-labelledby="pricing-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2
              id="pricing-heading"
              className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-[#EDEDED] lg:text-4xl"
            >
              Simple, transparent pricing
            </h2>
            <p className="text-base text-[#9AA0A6] lg:text-lg">
              Choose the plan that works best for you. Start free, upgrade anytime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {/* Free Plan */}
            <div className="rounded-sm border border-[#1F2329] bg-[#151A20] p-6 transition-all hover:border-[#B8FF00] hover:shadow-lg hover:shadow-[#B8FF00]/10">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#EDEDED]">Free</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-[#EDEDED]">$0</span>
                  <span className="text-sm text-[#9AA0A6]">/month</span>
                </div>
              </div>
              <ul className="mb-6 space-y-3 text-sm text-[#9AA0A6]">
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>10 image generations per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>5 video generations per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Basic motion presets</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Community support</span>
                </li>
              </ul>
              <a
                href="/signup"
                className="block w-full rounded-sm border border-[#1F2329] bg-transparent px-4 py-2 text-center text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]"
              >
                Get started
              </a>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-sm border-2 border-[#B8FF00] bg-[#151A20] p-6 shadow-lg shadow-[#B8FF00]/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-sm bg-[#B8FF00] px-3 py-1 text-xs font-semibold text-[#0B0D0F]">
                  Most Popular
                </span>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#EDEDED]">Pro</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-[#EDEDED]">$29</span>
                  <span className="text-sm text-[#9AA0A6]">/month</span>
                </div>
              </div>
              <ul className="mb-6 space-y-3 text-sm text-[#9AA0A6]">
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Unlimited image generations</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>100 video generations per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>All motion presets</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>HD quality exports</span>
                </li>
              </ul>
              <a
                href="/signup"
                className="block w-full rounded-sm bg-[#B8FF00] px-4 py-2 text-center text-sm font-medium text-[#0B0D0F] transition-opacity hover:opacity-90"
              >
                Start free trial
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-sm border border-[#1F2329] bg-[#151A20] p-6 transition-all hover:border-[#B8FF00] hover:shadow-lg hover:shadow-[#B8FF00]/10">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#EDEDED]">Enterprise</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-[#EDEDED]">Custom</span>
                </div>
              </div>
              <ul className="mb-6 space-y-3 text-sm text-[#9AA0A6]">
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Unlimited everything</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>4K quality exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8FF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>SLA guarantee</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full rounded-sm border border-[#1F2329] bg-transparent px-4 py-2 text-center text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]"
              >
                Contact sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="border-t border-[#1F2329] bg-[#0B0D0F] py-16 lg:py-24"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2
              id="testimonials-heading"
              className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-[#EDEDED] lg:text-4xl"
            >
              Loved by creators worldwide
            </h2>
            <p className="text-base text-[#9AA0A6] lg:text-lg">
              See what our community is saying about Higgsfield
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Chen",
                role: "Content Creator",
                avatar: "SC",
                text: "Higgsfield has completely transformed my content creation workflow. The AI-powered tools are incredibly intuitive and produce stunning results.",
              },
              {
                name: "Marcus Rodriguez",
                role: "Video Producer",
                avatar: "MR",
                text: "The motion control features are game-changing. I can create professional-grade videos in minutes that used to take hours.",
              },
              {
                name: "Emily Johnson",
                role: "Digital Artist",
                avatar: "EJ",
                text: "As a digital artist, I love how easy it is to experiment with different styles and presets. The quality is consistently impressive.",
              },
              {
                name: "David Kim",
                role: "Marketing Director",
                avatar: "DK",
                text: "We use Higgsfield for all our social media content. It's fast, reliable, and the results speak for themselves.",
              },
              {
                name: "Lisa Wang",
                role: "Indie Filmmaker",
                avatar: "LW",
                text: "The cinematic presets are incredible. I've created videos that look like they came from a big-budget production.",
              },
              {
                name: "James Taylor",
                role: "Creative Director",
                avatar: "JT",
                text: "Higgsfield is the future of content creation. The AI understands context and delivers exactly what you envision.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-sm border border-[#1F2329] bg-[#151A20] p-6 transition-all hover:border-[#B8FF00] hover:shadow-lg hover:shadow-[#B8FF00]/10"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B8FF00] text-sm font-semibold text-[#0B0D0F]">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#EDEDED]">{testimonial.name}</h4>
                    <p className="text-xs text-[#9AA0A6]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#9AA0A6]">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video/Image Gallery Section */}
      <section
        id="gallery"
        className="border-t border-[#1F2329] bg-[#111418] py-16 lg:py-24"
        aria-labelledby="gallery-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2
              id="gallery-heading"
              className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-[#EDEDED] lg:text-4xl"
            >
              Explore our gallery
            </h2>
            <p className="text-base text-[#9AA0A6] lg:text-lg">
              See what's possible with AI-powered creation
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Cinematic Video",
                category: "Video",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                title: "Portrait Image",
                category: "Image",
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
              {
                title: "Motion Control",
                category: "Video",
                gradient: "from-green-500/20 to-emerald-500/20",
              },
              {
                title: "Character Design",
                category: "Image",
                gradient: "from-orange-500/20 to-red-500/20",
              },
              {
                title: "VFX Sequence",
                category: "Video",
                gradient: "from-indigo-500/20 to-purple-500/20",
              },
              {
                title: "Artistic Style",
                category: "Image",
                gradient: "from-yellow-500/20 to-amber-500/20",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-sm border border-[#1F2329] bg-[#151A20] transition-all hover:border-[#B8FF00] hover:shadow-lg hover:shadow-[#B8FF00]/10"
              >
                <div
                  className={`h-48 bg-gradient-to-br ${item.gradient} transition-transform duration-300 group-hover:scale-105`}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-sm bg-[#0B0D0F]/90 px-4 py-2 text-center">
                    <p className="text-sm font-medium text-[#EDEDED]">{item.title}</p>
                    <p className="text-xs text-[#9AA0A6]">{item.category}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[#EDEDED]">{item.title}</h3>
                  <p className="mt-1 text-xs text-[#9AA0A6]">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="border-t border-[#1F2329] bg-[#0B0D0F] py-16 lg:py-24"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2
              id="faq-heading"
              className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-[#EDEDED] lg:text-4xl"
            >
              Frequently asked questions
            </h2>
            <p className="text-base text-[#9AA0A6] lg:text-lg">
              Everything you need to know about Higgsfield
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What is Higgsfield?",
                answer:
                  "Higgsfield is an AI-powered creative platform that enables you to generate stunning images, create cinematic videos, and build AI influencers. Our platform combines cutting-edge AI technology with intuitive tools to make professional content creation accessible to everyone.",
              },
              {
                question: "How does the AI video generation work?",
                answer:
                  "Our AI video generation uses advanced models to transform text prompts and images into high-quality videos. You can start with a text description, upload an image, or use our motion control features to create precise, cinematic movements.",
              },
              {
                question: "What file formats are supported?",
                answer:
                  "We support a wide range of formats including JPEG, PNG for images, and MP4, MOV for videos. You can export your creations in various resolutions up to 4K quality depending on your plan.",
              },
              {
                question: "Can I use the content commercially?",
                answer:
                  "Yes! Content created with Higgsfield can be used for commercial purposes. You own the rights to all content you create using our platform. Please review our Terms of Service for complete details.",
              },
              {
                question: "How do I get started?",
                answer:
                  "Getting started is easy! Simply sign up for a free account, and you'll have access to our basic features immediately. You can start creating right away with our intuitive interface.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards and support payments through Stripe. Enterprise customers can also arrange custom billing terms. All payments are processed securely.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group rounded-sm border border-[#1F2329] bg-[#151A20] transition-all hover:border-[#B8FF00]"
              >
                <summary className="cursor-pointer px-6 py-4 text-base font-semibold text-[#EDEDED] transition-colors hover:text-[#B8FF00]">
                  {faq.question}
                  <svg
                    className="ml-2 inline-block h-5 w-5 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-sm leading-relaxed text-[#9AA0A6]">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section
        className="border-t border-[#1F2329] bg-[#111418] py-16 lg:py-24"
        aria-labelledby="newsletter-heading"
      >
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-12">
          <h2
            id="newsletter-heading"
            className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-[#EDEDED] lg:text-4xl"
          >
            Stay updated
          </h2>
          <p className="mb-8 text-base text-[#9AA0A6] lg:text-lg">
            Get the latest updates, new features, and creative tips delivered to your inbox.
          </p>
          <form
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              // Newsletter signup logic would go here
              alert("Thank you for subscribing! Check your email for confirmation.");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-3 text-sm text-[#EDEDED] placeholder:text-[#9AA0A6] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#111418]"
            />
            <button
              type="submit"
              className="rounded-sm bg-[#B8FF00] px-6 py-3 text-sm font-medium text-[#0B0D0F] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#111418]"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-[#9AA0A6]">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* CTA Section — Updated to match reference style */}
      <section
        className="border-t border-[#1F2329] bg-[#0B0D0F] py-16 lg:py-24"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
          <h2
            id="cta-heading"
            className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-[#EDEDED] lg:text-4xl"
          >
            Ready to create?
          </h2>
          <p className="mb-10 text-base leading-relaxed text-[#9AA0A6] lg:text-lg">
            Start creating stunning AI-powered images and videos today. Join thousands of creators
            in the Higgsfield community.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#B8FF00] px-6 py-3 text-sm font-medium text-[#0B0D0F] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F] lg:px-8 lg:py-4 lg:text-base"
            >
              Get started for free
              <ArrowRightIcon className="w-4 h-4" />
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center justify-center rounded-sm border border-[#1F2329] bg-transparent px-6 py-3 text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F] lg:px-8 lg:py-4 lg:text-base"
            >
              Explore Community Gallery
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
