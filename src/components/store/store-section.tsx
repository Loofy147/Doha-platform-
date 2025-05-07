// src/components/store/store-section.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface StoreSectionProps {
  id?: string; // Added id prop
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
  description?: string; // Added description prop
}

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
  return (
    <section id={id} className={cn("py-8 md:py-12", className)}>
      <div className="mb-6 md:mb-8 text-center md:text-right">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
          {Icon && <Icon size={32} style={{ color: accentColor || 'hsl(var(--primary))' }} className={cn("flex-shrink-0", iconClassName)} />}
          <h2 
              className={cn("text-3xl md:text-4xl font-bold", titleClassName)} 
              style={{ color: accentColor || 'hsl(var(--primary))' }}
          >
              {title}
          </h2>
        </div>
        {description && (
            <p className="text-md text-foreground/70 max-w-2xl mx-auto md:mx-0">
                {description}
            </p>
        )}
      </div>
      {children}
    </section>
  );
};

export default StoreSection;
