"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import { ChevronsRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface UseCaseCardProps {
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  icon: ReactNode;
}

export function UseCaseCard({
  title,
  description,
  shortDescription,
  image,
  icon,
}: UseCaseCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);
  const t = useTranslations("common");

  const handleOpen = () => {
    setIsAnimating(true);
    setIsOpen(true);
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflowY = "scroll";
  };

  const handleClose = () => {
    setIsAnimating(true);
    setIsOpen(false);
    const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflowY = "";
    window.scrollTo(0, scrollY);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          "group transition-all duration-500 hover:shadow-lg hover:scale-105 rounded-xl border border-gray-200 w-full h-full bg-background",
          isOpen && "opacity-0 pointer-events-none scale-110"
        )}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <h3
            className={cn(
              "text-2xl font-bold mb-4 text-balance transition-all duration-500 flex items-center gap-3",
              isAnimating && isOpen && "opacity-0 transform translate-y-2"
            )}
          >
            <div className="rounded-lg bg-gradient-to-b from-brand-green to-brand-green-dark p-2 text-background">
              {icon}
            </div>
            <span className="text-3xl">{title}</span>
          </h3>
          <p
            className={cn(
              "pb-6 text-gray-500 transition-all duration-500 mb-auto",
              isAnimating && isOpen && "opacity-0 transform translate-y-2"
            )}
          >
            {shortDescription}
          </p>
          <button
            onClick={handleOpen}
            className="w-fit text-brand-green hover:text-brand-green-dark p-2 cursor-pointer ms-auto transition-all flex gap-2 items-center text-nowrap"
          >
            {t("learnMore")}
            <ChevronsRight className="size-3" />
          </button>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background/90 backdrop-blur-sm transition-all duration-500 h-full",
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
          ref={modalRef}
        >
          <div className="h-full overflow-y-auto">
            <div className="min-h-full flex flex-col overflow-hidden">
              <div className="container mx-auto flex justify-between items-center p-6 border-b border-gray-200">
                <h1
                  className={cn(
                    "text-4xl text-brand-green font-bold text-balance transition-all duration-500 delay-200",
                    isAnimating
                      ? "opacity-0 transform -translate-y-4"
                      : "opacity-100 transform translate-y-0"
                  )}
                >
                  {title}
                </h1>
                <button
                  onClick={handleClose}
                  className="cursor-pointer"
                  aria-label={t("close")}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div
                className={cn(
                  "flex-1 p-6 transition-all duration-500 delay-300",
                  isAnimating
                    ? "opacity-0 transform translate-y-4"
                    : "opacity-100 transform translate-y-0"
                )}
              >
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed text-gray-800">
                      {description}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={image}
                      alt={title}
                      className="w-full h-auto"
                      width={1200}
                      height={800}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
