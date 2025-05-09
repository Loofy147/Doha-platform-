// src/components/sections/call-to-action-banner.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, type LucideProps } from 'lucide-react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CallToActionBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  dataAiHint: string;
  icon?: React.ElementType<LucideProps>;
  reverseLayout?: boolean;
  animationConfig?: MotionProps;
  themeStyle?: 'light' | 'elegant' | 'playful' | 'modern-minimal' | 'dark'; 
  accentColor?: string; 
}

const sectionAnimationConfig: MotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.25 }, 
  viewport: { once: true, amount: 0.2 }
};

const textBlockContainerVariants: MotionProps = {
  initial: "hidden", 
  animate: "visible", 
  variants: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1, 
        delayChildren: 0.2, 
      },
    },
  },
};

const textChildVariants: MotionProps = {
  variants: { 
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  }
};

const imageBlockVariants: MotionProps = {
   initial: "hidden", 
   animate: "visible", 
   variants: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.1 }, 
    },
  }
};


export function CallToActionBanner({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  dataAiHint,
  icon: IconComponent,
  reverseLayout = false,
  animationConfig = sectionAnimationConfig, 
  themeStyle = 'light',
  accentColor = 'hsl(var(--primary))'
}: CallToActionBannerProps) {

  const titleColor = themeStyle === 'dark' || themeStyle === 'elegant' ? 'hsl(var(--card-foreground))' : accentColor;
  const buttonBgColor = reverseLayout ? (themeStyle === 'dark' || themeStyle === 'elegant' ? 'hsl(var(--primary))' : accentColor) : 'hsl(var(--accent-yellow))';
  const buttonTextColor = reverseLayout ? 'hsl(var(--primary-foreground))' : 'hsl(var(--accent-yellow-foreground))';
  const buttonHoverBgColor = reverseLayout ? (themeStyle === 'dark' || themeStyle === 'elegant' ? 'hsl(var(--primary))' : `${accentColor}E6`) : 'hsl(var(--accent-yellow) / 0.9)';


  return (
    <motion.section
      className={`py-16 lg:py-20 overflow-hidden ${reverseLayout ? (themeStyle === 'dark' || themeStyle === 'elegant' ? 'bg-slate-800/30' : 'bg-secondary/5') : (themeStyle === 'dark' || themeStyle === 'elegant' ? 'bg-gray-800/30' : 'bg-primary/5')}`}
      {...animationConfig}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-10 md:gap-16 items-center`}>
          
          <motion.div
            className={`text-center lg:text-right ${reverseLayout ? 'lg:order-2' : 'lg:order-1'}`}
            {...textBlockContainerVariants} 
          >
            {IconComponent && (
                <motion.div {...textChildVariants}>
                    <IconComponent className={`mx-auto lg:mx-0 h-12 w-12 mb-4`} style={{color: titleColor}} />
                </motion.div>
             )}
            <motion.h2 {...textChildVariants} className={`text-3xl font-bold tracking-tight sm:text-4xl mb-5`} style={{color: titleColor}}>
              {title}
            </motion.h2>
            <motion.p {...textChildVariants} className={cn("text-lg mb-8 leading-relaxed", themeStyle === 'dark' || themeStyle === 'elegant' ? 'text-slate-300' : 'text-foreground/80')}>
              {description}
            </motion.p>
            <motion.div {...textChildVariants}>
                <Button
                size="lg"
                asChild
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverBgColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonBgColor}
                className={`shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out px-8 py-3 text-base rounded-full group`}
                >
                <Link href={buttonLink}>
                    {buttonText} <ChevronLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                </Link>
                </Button>
            </motion.div>
          </motion.div>

          
          <motion.div
            className={`relative aspect-video rounded-xl overflow-hidden shadow-2xl ${reverseLayout ? 'lg:order-1' : 'lg:order-2'} group transform hover:scale-[1.03] transition-transform duration-500 ease-out`}
            {...imageBlockVariants} 
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={dataAiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
