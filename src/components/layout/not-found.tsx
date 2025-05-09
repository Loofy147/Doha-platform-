// src/components/layout/not-found.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PackageSearch, Home, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface NotFoundProps {
    title?: string;
    message?: string;
    showBackButton?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};


export function NotFound({
    title = "عفوًا، الصفحة غير موجودة!",
    message = "الصفحة التي تبحثين عنها قد تكون حُذفت، تغير اسمها، أو أنها غير متاحة مؤقتًا.",
    showBackButton = true
}: NotFoundProps) {
  return (
    <motion.div 
        className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 text-center p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      <motion.div variants={itemVariants}>
        <PackageSearch className="w-24 h-24 text-destructive mb-8 animate-bounce" style={{animationDuration: '2s'}} />
      </motion.div>
      <motion.h1 
        className="text-4xl font-extrabold text-primary mb-4 sm:text-5xl"
        variants={itemVariants}
      >
        {title}
      </motion.h1>
      <motion.p 
        className="text-lg text-foreground/80 mb-10 max-w-md sm:text-xl"
        variants={itemVariants}
      >
        {message}
      </motion.p>
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground shadow-lg transform hover:scale-105 transition-transform px-8 py-3 text-base">
            <Link href="/">
                <Home className="ml-2 h-5 w-5" /> العودة إلى الصفحة الرئيسية
            </Link>
            </Button>
        </motion.div>
        {showBackButton && (
          <motion.div variants={itemVariants}>
            <Button variant="outline" size="lg" onClick={() => window.history.back()} className="border-primary text-primary hover:bg-primary/10 transform hover:scale-105 transition-transform px-8 py-3 text-base">
                <ChevronLeft className="ml-2 h-5 w-5" /> العودة للخلف
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}