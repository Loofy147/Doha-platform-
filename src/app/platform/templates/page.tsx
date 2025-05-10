// src/app/platform/templates/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Shirt,
  CakeSlice,
  Palette,
  Scissors,
  CalendarClock,
  GraduationCap,
  Home as HomeIcon,
  Scale,
  Stethoscope,
  Wand2,
  PartyPopper,
  Users2,
  Paintbrush,
  Leaf,
  Camera as CameraIcon, // Renamed to avoid conflict
  Dumbbell,
  ShoppingBasket,
  LayoutDashboard,
  ChevronLeft,
  Briefcase,
  Sparkles,
  Search,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TemplateInfo {
  slug: string;
  name: string;
  description: string;
  icon: React.ElementType<LucideProps>;
  color?: string; // Tailwind text color class e.g. text-pink-500
  bgColor?: string; // Tailwind background color class e.g. bg-pink-500/10
  tags?: string[];
  livePreviewLink?: string; // For future full previews
}

const mainTemplates: TemplateInfo[] = [
  { slug: 'fashion', name: 'متجر الأزياء والملابس', description: 'لعرض تشكيلات الملابس، العبايات، والإكسسوارات بأناقة.', icon: Shirt, color: 'text-pink-500', bgColor: 'bg-pink-500/5', tags: ['أزياء', 'فساتين', 'إكسسوارات'] },
  { slug: 'bakery', name: 'متجر الحلويات والمخبوزات', description: 'لتسليط الضوء على الكيك، المعجنات، والأطعمة المنزلية الشهية.', icon: CakeSlice, color: 'text-yellow-600', bgColor: 'bg-yellow-600/5', tags: ['حلويات', 'كيك', 'مخبوزات'] },
  { slug: 'crafts', name: 'متجر الحرف اليدوية والفنون', description: 'لعرض المنتجات المصنوعة يدويًا، اللوحات الفنية، والتصميمات الإبداعية.', icon: Palette, color: 'text-purple-500', bgColor: 'bg-purple-500/5', tags: ['فنون', 'يدوي', 'ديكور'] },
  { slug: 'salon', name: 'صالون التجميل والخدمات الشخصية', description: 'لتقديم خدمات العناية بالشعر، البشرة، المكياج، وحجز المواعيد.', icon: Scissors, color: 'text-red-500', bgColor: 'bg-red-500/5', tags: ['تجميل', 'شعر', 'مكياج', 'حجز'] },
  { slug: 'rental', name: 'متجر تأجير المنتجات', description: 'لتأجير فساتين السهرة، تجهيزات الحفلات، أو أي منتجات أخرى.', icon: CalendarClock, color: 'text-blue-500', bgColor: 'bg-blue-500/5', tags: ['إيجار', 'فساتين سهرة', 'معدات'] },
  { slug: 'training-consulting', name: 'خدمات التدريب والاستشارات', description: 'للمدربات والمستشارات لتقديم دوراتهن وجلساتهن الاستشارية.', icon: GraduationCap, color: 'text-indigo-500', bgColor: 'bg-indigo-500/5', tags: ['تدريب', 'استشارات', 'دورات'] },
  { slug: 'home-services', name: 'خدمات منزلية متخصصة', description: 'لتقديم خدمات التنظيف، الترتيب، الطبخ، أو الرعاية المنزلية.', icon: HomeIcon, color: 'text-green-500', bgColor: 'bg-green-500/5', tags: ['خدمات منزلية', 'تنظيف', 'رعاية'] },
  { slug: 'legal', name: 'محامية / مستشارة قانونية', description: 'لعرض الخدمات القانونية وتقديم الاستشارات وإدارة المواعيد.', icon: Scale, color: 'text-gray-600', bgColor: 'bg-gray-600/5', tags: ['قانون', 'محاماة', 'استشارة قانونية'] },
  { slug: 'medical', name: 'طبيبة / أخصائية صحية', description: 'لعرض التخصصات الطبية، حجز المواعيد، وتقديم معلومات صحية.', icon: Stethoscope, color: 'text-teal-500', bgColor: 'bg-teal-500/5', tags: ['صحة', 'طب', 'عيادة'] },
  { slug: 'styling', name: 'مستشارة تسوق وتنسيق أزياء', description: 'لتقديم خدمات تنسيق الملابس، بناء خزانة ملابس، والتسوق الشخصي.', icon: Wand2, color: 'text-orange-500', bgColor: 'bg-orange-500/5', tags: ['موضة', 'تنسيق أزياء', 'ستايلست'] },
  { slug: 'event-planning', name: 'مخططة مناسبات وحفلات', description: 'لتقديم خدمات تخطيط وتنظيم الأفراح والمناسبات الخاصة.', icon: PartyPopper, color: 'text-rose-500', bgColor: 'bg-rose-500/5', tags: ['مناسبات', 'حفلات', 'أفراح'] },
];

const additionalTemplates: TemplateInfo[] = [
    { slug: 'family-consulting', name: 'مستشارة علاقات أسرية وتربية', description: 'لتقديم استشارات وجلسات دعم للأفراد والأسر.', icon: Users2, color: 'text-cyan-500', bgColor: 'bg-cyan-500/5', tags: ['استشارات أسرية', 'تربية'] },
    { slug: 'makeup-hair-artist', name: 'فنانة مكياج وشعر للمناسبات', description: 'لحجز خدمات المكياج وتسريحات الشعر للمناسبات.', icon: Paintbrush, color: 'text-fuchsia-500', bgColor: 'bg-fuchsia-500/5', tags: ['مكياج', 'شعر', 'مناسبات'] },
    { slug: 'eco-friendly', name: 'متجر منتجات صديقة للبيئة', description: 'لعرض وبيع منتجات مصنعة بطرق مستدامة.', icon: Leaf, color: 'text-lime-500', bgColor: 'bg-lime-500/5', tags: ['صديق للبيئة', 'مستدام'] },
    { slug: 'photography', name: 'خدمات التصوير الفوتوغرافي', description: 'لجلسات التصوير الشخصية، العائلية، أو للمنتجات.', icon: CameraIcon, color: 'text-sky-500', bgColor: 'bg-sky-500/5', tags: ['تصوير', 'فوتوغرافيا'] },
    { slug: 'fitness-coach', name: 'مدربة رياضية / أخصائية لياقة', description: 'لتقديم برامج تدريب شخصية وجماعية.', icon: Dumbbell, color: 'text-amber-600', bgColor: 'bg-amber-600/5', tags: ['رياضة', 'لياقة', 'تدريب شخصي'] },
    { slug: 'craft-supplies', name: 'متجر أدوات ومستلزمات حرفية', description: 'لبيع الخامات والأدوات اللازمة لممارسة الحرف.', icon: ShoppingBasket, color: 'text-stone-500', bgColor: 'bg-stone-500/5', tags: ['أدوات حرفية', 'خامات'] },
];

const allTemplates = [...mainTemplates, ...additionalTemplates];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.05, delayChildren: 0.2 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function StoreTemplatesPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredTemplates, setFilteredTemplates] = React.useState(allTemplates);

  React.useEffect(() => {
    if (searchTerm === '') {
      setFilteredTemplates(allTemplates);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      setFilteredTemplates(
        allTemplates.filter(
          (template) =>
            template.name.toLowerCase().includes(lowerSearchTerm) ||
            template.description.toLowerCase().includes(lowerSearchTerm) ||
            template.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
        )
      );
    }
  }, [searchTerm]);


  return (
    <motion.div 
      className="space-y-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header className="text-center" variants={itemVariants}>
        <LayoutDashboard size={48} className="mx-auto text-primary mb-4 animate-pulse" style={{animationDuration: '2s'}} />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          معرض قوالب متاجر لمسة ضحى
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
          اكتشفي تشكيلتنا المتنوعة من القوالب المصممة بعناية لتناسب مختلف أنواع الأعمال والخدمات. كل قالب هو نقطة انطلاق لمتجر إلكتروني احترافي وجذاب يعكس هويتكِ الفريدة على منصة لمسة ضحى.
        </p>
      </motion.header>

      <motion.div className="mb-8 sticky top-20 z-30 py-4 bg-background/80 backdrop-blur-md rounded-lg shadow-sm" variants={itemVariants}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="ابحثي عن قالب (مثال: أزياء، حلويات، استشارات)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-primary transition-shadow shadow-inner text-foreground bg-card"
                />
            </div>
        </div>
      </motion.div>

      {filteredTemplates.length > 0 ? (
        <motion.section
          variants={{ visible: { transition: { staggerChildren: 0.07 }}}}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredTemplates.map((template, index) => {
              const Icon = template.icon;
              return (
                <motion.div key={template.slug} variants={itemVariants}>
                  <Link href={`/platform/templates/${template.slug}`} passHref>
                    <Card className={cn(
                        "h-full flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent group rounded-xl overflow-hidden",
                        template.bgColor || 'bg-card',
                        `hover:border-current focus-within:border-current focus-within:ring-2 focus-within:ring-offset-2`
                    )}
                    style={{
                        // @ts-ignore
                        '--hover-border-color': template.color ? template.color.replace('text-', 'border-') : 'hsl(var(--primary))',
                        '--focus-ring-color': template.color ? template.color.replace('text-', 'ring-') : 'hsl(var(--primary))',
                        borderColor: 'var(--card-border-color, transparent)' // Initial state
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.setProperty('--card-border-color', template.color ? `hsl(var(--${template.color.split('-')[1]}))` : 'hsl(var(--primary))');
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.setProperty('--card-border-color', 'transparent');
                    }}
                    >
                      <CardHeader className="flex-row items-center gap-4 pb-3 p-5">
                        <div className={cn("p-3 rounded-full transition-transform duration-300 group-hover:scale-110", template.bgColor?.replace('bg-', 'bg-opacity-20-') || 'bg-primary/10')}
                             style={{ backgroundColor: template.color ? `${template.color.replace('text-', 'hsl(var(--')}).replace(']', ')/0.1')}` : 'hsla(var(--primary)/0.1)' }}
                        >
                            <Icon size={28} className={cn("transition-colors duration-300", template.color || 'text-primary')} />
                        </div>
                        <CardTitle className={cn("text-lg group-hover:text-primary transition-colors", template.color || 'text-primary')}>{template.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow px-5 pb-4">
                        <CardDescription className="text-sm text-muted-foreground line-clamp-3">{template.description}</CardDescription>
                        {template.tags && template.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {template.tags.map(tag => (
                              <span key={tag} className={cn("text-xs px-2 py-0.5 rounded-full border", template.bgColor?.replace('bg-', 'border-') || 'border-primary/30', template.color ? template.color.replace('text-','text-opacity-80-') : 'text-primary/80') }
                                  style={{ borderColor: template.color ? `${template.color.replace('text-', 'hsl(var(--')}).replace(']', ')/0.3')}` : 'hsla(var(--primary)/0.3)', color: template.color ? `${template.color.replace('text-', 'hsl(var(--')}).replace(']', '))}` : 'hsl(var(--primary))' }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-5 border-t mt-auto" style={{borderColor: template.color ? `${template.color.replace('text-', 'hsl(var(--')}).replace(']', ')/0.2')}` : 'hsla(var(--primary)/0.2)'}}>
                          <Button variant="link" className="p-0 h-auto text-sm font-medium group-hover:underline transition-all" style={{color: template.color || 'hsl(var(--primary))'}}>
                              استكشفي القالب <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-0.5 transition-transform"/>
                          </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      ) : (
         <motion.div className="text-center py-16" variants={itemVariants}>
            <Search size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">لم يتم العثور على قوالب</h3>
            <p className="text-foreground/70">
              عذرًا، لا توجد قوالب تطابق بحثكِ الحالي. جربي كلمات بحث أخرى.
            </p>
        </motion.div>
      )}

       <motion.div className="mt-16 text-center" variants={itemVariants}>
        <Button variant="outline" size="lg" asChild className="border-accent-purple text-accent-purple hover:bg-accent-purple/10 group transform hover:scale-105">
          <Link href="/dashboard/store-template">
             <Sparkles size={20} className="ml-2"/> خصصي تصميم متجركِ الآن
          </Link>
        </Button>
      </motion.div>

    </motion.div>
  );
}
