// src/components/sections/call-to-action-banner.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, type LucideProps, Rocket, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: { [key: string]: React.ElementType<LucideProps> } = {
  Rocket,
  ShoppingBag,
};

interface CallToActionBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  dataAiHint: string;
  iconName?: keyof typeof iconMap;
  reverseLayout?: boolean;
}

const bannerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function CallToActionBanner({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  dataAiHint,
  iconName,
  reverseLayout = false,
}: CallToActionBannerProps) {
  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <motion.section 
      className={`py-16 lg:py-20 ${reverseLayout ? 'bg-secondary/5' : 'bg-primary/5'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={bannerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-10 md:gap-16 items-center`}>
          <motion.div 
            className={`text-center lg:text-right ${reverseLayout ? 'lg:order-2' : 'lg:order-1'}`}
            variants={bannerVariants} // Apply to inner elements for staggered effect if needed
          >
            {IconComponent && <IconComponent className={`mx-auto lg:mx-0 h-12 w-12 mb-4 ${reverseLayout ? 'text-primary' : 'text-accent-pink'}`} />}
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl mb-5 ${reverseLayout ? 'text-primary' : 'text-accent-pink'}`}>
              {title}
            </h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              {description}
            </p>
            <Button
              size="lg"
              asChild
              className={`shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out px-8 py-3 text-base rounded-full group ${
                reverseLayout ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground'
              }`}
            >
              <Link href={buttonLink}>
                {buttonText} <ChevronLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          <motion.div 
            className={`relative aspect-video rounded-xl overflow-hidden shadow-2xl ${reverseLayout ? 'lg:order-1' : 'lg:order-2'} group transform hover:scale-105 transition-transform duration-500 ease-out`}
            variants={bannerVariants}
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              data-ai-hint={dataAiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
