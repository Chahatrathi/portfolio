"use client";

import { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";
import { Button } from "./MovingBorders"; 

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  children,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  children?: React.ReactNode;
}) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    const text = "chahatrathi@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const hasMovingBorder = id === 2 || id === 3 || id === 4 || id === 6;

  const content = (
    <div
      className={`relative overflow-hidden rounded-3xl group/bento hover:shadow-2xl transition duration-500 justify-between flex flex-col space-y-4 h-full w-full ${!hasMovingBorder ? "border border-white/[0.05]" : ""}`}
      style={{
        // NEW: Charcoal Black Background
        backgroundColor: "#121212",
        background: "linear-gradient(180deg, #1A1A1B 0%, #121212 100%)",
      }}
    >
      <div className={`${id === 6 ? "flex justify-center" : ""} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={`${imgClassName} object-cover object-center`}
            />
          )}
        </div>
        
        {/* Subtle Overlay for better text contrast against Charcoal */}
        <div className="absolute inset-0 bg-black/40 z-0 group-hover:bg-black/20 transition-colors duration-500" />

        <div className={`absolute right-0 -bottom-5 ${id === 5 ? "w-full opacity-80" : ""}`}>
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>

        <div
          className={`${titleClassName} group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 z-10`}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-[#9CA3AF] z-10">
            {description}
          </div>
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10 text-white">
            {title}
          </div>

          {children}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className="absolute -bottom-5 right-0">
                <Lottie 
                  animationData={animationData} 
                  loop={copied} 
                  autoplay={copied} 
                  style={{ height: 200, width: 400 }} 
                />
              </div>
              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#1A1A1B]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`row-span-1 relative ${className}`}>
      {hasMovingBorder && mounted ? (
        <Button
          duration={12000}
          borderRadius="1.75rem"
          style={{
            background: "#121212",
            backgroundColor: "linear-gradient(90deg, #1A1A1B 0%, #121212 100%)",
          }}
          className="w-full h-full text-white border-neutral-800"
        >
          {content}
        </Button>
      ) : (
        content
      )}
    </div>
  );
};

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};