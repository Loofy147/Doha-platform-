// src/components/store/store-section.tsx
'use client'; 

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'; 

interface StoreSectionProps {
  id?: string;
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
  description?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const StoreSection: React.FC<StoreSectionProps> = ({
  id,
  title,
  icon: Icon,
  children,
  accentColor,
  className,
  titleClassName,
  iconClassName,
  description
}) => {
  const primaryColor = accentColor || 'hsl(var(--primary))';

  return (
    <motion.section
      id={id}
      className={cn("py-8 md:py-12", className)}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" 
      viewport={{ once: true, amount: 0.15 }} 
    >
      <div className="mb-6 md:mb-8 text-center md:text-right">
        <motion.div
            className="flex items-center justify-center md:justify-start gap-3 mb-1"
            variants={itemVariants} 
        >
          {Icon && (
            <motion.span variants={itemVariants}> 
                <Icon size={32} style={{ color: primaryColor }} className={cn("flex-shrink-0", iconClassName)} />
            </motion.span>
          )}
          <motion.h2
              className={cn("text-3xl md:text-4xl font-bold", titleClassName)}
              style={{ color: primaryColor }}
              variants={itemVariants} 
          >
              {title}
          </motion.h2>
        </motion.div>
        {description && (
            <motion.p
                className="text-md text-foreground/70 max-w-2xl mx-auto md:mx-0"
                variants={itemVariants} 
            >
                {description}
            </motion.p>
        )}
      </div>
      
      {children}
    </motion.section>
  );
};

export default StoreSection;
