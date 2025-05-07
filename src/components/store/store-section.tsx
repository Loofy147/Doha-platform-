// src/components/store/store-section.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface StoreSectionProps {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
}

const StoreSection: React.FC<StoreSectionProps> = ({ 
  title, 
  icon: Icon, 
  children, 
  accentColor, 
  className,
  titleClassName,
  iconClassName
}) => {
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        {Icon && <Icon size={28} style={{ color: accentColor || 'hsl(var(--primary))' }} className={cn(iconClassName)} />}
        <h2 
            className={cn("text-2xl md:text-3xl font-bold", titleClassName)} 
            style={{ color: accentColor || 'hsl(var(--primary))' }}
        >
            {title}
        </h2>
      </div>
      {children}
    </section>
  );
};

export default StoreSection;
