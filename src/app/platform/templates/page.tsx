'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  Camera,
  Dumbbell,
  ShoppingBasket,
  LayoutDashboard,
  ChevronLeft,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface TemplateInfo {
  slug: string;
  name: string;
  description: string;
  icon: React.ElementType<LucideProps>;
  color?: string;
}

const mainTemplates: TemplateInfo[] = [
  { slug: 'fashion', name: 'متجر الأزياء والملابس', description: 'لعرض تشكيلات الملابس، العبايات، والإكسسوارات بأناقة.', icon: Shirt, color: 'text-pink-500' },
  { slug: 'bakery', name: 'متجر الحلويات والمخبوزات', description: 'لتسليط الضوء على الكيك، المعجنات، والأطعمة المنزلية الشهية.', icon: CakeSlice, color: 'text-yellow-500' },
  { slug: 'crafts', name: 'متجر الحرف اليدوية والفنون', description: 'لعرض المنتجات المصنوعة يدويًا، اللوحات الفنية، والتصميمات الإبداعية.', icon: Palette, color: 'text-purple-500' },
  { slug: 'salon', name: 'صالون التجميل والخدمات الشخصية', description: 'لتقديم خدمات العناية بالشعر، البشرة، المكياج، وحجز المواعيد.', icon: Scissors, color: 'text-red-500' },
  { slug: 'rental', name: 'متجر تأجير المنتجات', description: 'لتأجير فساتين السهرة، تجهيزات الحفلات، أو أي منتجات أخرى.', icon: CalendarClock, color: 'text-blue-500' },
  { slug: 'training-consulting', name: 'خدمات التدريب والاستشارات', description: 'للمدربات والمستشارات لتقديم دوراتهن وجلساتهن الاستشارية.', icon: GraduationCap, color: 'text-indigo-500' },
  { slug: 'home-services', name: 'خدمات منزلية متخصصة', description: 'لتقديم خدمات التنظيف، الترتيب، الطبخ، أو الرعاية المنزلية.', icon: HomeIcon, color: 'text-green-500' },
  { slug: 'legal', name: 'محامية / مستشارة قانونية', description: 'لعرض الخدمات القانونية وتقديم الاستشارات وإدارة المواعيد.', icon: Scale, color: 'text-gray-600' },
  { slug: 'medical', name: 'طبيبة / أخصائية صحية', description: 'لعرض التخصصات الطبية، حجز المواعيد، وتقديم معلومات صحية.', icon: Stethoscope, color: 'text-teal-500' },
  { slug: 'styling', name: 'مستشارة تسوق وتنسيق أزياء', description: 'لتقديم خدمات تنسيق الملابس، بناء خزانة ملابس، والتسوق الشخصي.', icon: Wand2, color: 'text-orange-500' },
  { slug: 'event-planning', name: 'مخططة مناسبات وحفلات', description: 'لتقديم خدمات تخطيط وتنظيم الأفراح والمناسبات الخاصة.', icon: PartyPopper, color: 'text-rose-500' },
];

const additionalTemplates: TemplateInfo[] = [
    { slug: 'family-consulting', name: 'مستشارة علاقات أسرية وتربية', description: 'لتقديم استشارات وجلسات دعم للأفراد والأسر.', icon: Users2, color: 'text-cyan-500' },
    { slug: 'makeup-hair-artist', name: 'فنانة مكياج وشعر للمناسبات', description: 'لحجز خدمات المكياج وتسريحات الشعر للمناسبات.', icon: Paintbrush, color: 'text-fuchsia-500' },
    { slug: 'eco-friendly', name: 'متجر منتجات صديقة للبيئة', description: 'لعرض وبيع منتجات مصنعة بطرق مستدامة.', icon: Leaf, color: 'text-lime-500' },
    { slug: 'photography', name: 'خدمات التصوير الفوتوغرافي', description: 'لجلسات التصوير الشخصية، العائلية، أو للمنتجات.', icon: Camera, color: 'text-sky-500' },
    { slug: 'fitness-coach', name: 'مدربة رياضية / أخصائية لياقة', description: 'لتقديم برامج تدريب شخصية وجماعية.', icon: Dumbbell, color: 'text-amber-600' },
    { slug: 'craft-supplies', name: 'متجر أدوات ومستلزمات حرفية', description: 'لبيع الخامات والأدوات اللازمة لممارسة الحرف.', icon: ShoppingBasket, color: 'text-stone-500' },
];


export default function StoreTemplatesPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <LayoutDashboard size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          قوالب متاجر لمسة ضحى
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          استعرضي مجموعة متنوعة من القوالب المصممة خصيصًا لمساعدتكِ في بناء متجر إلكتروني جذاب واحترافي يعكس طبيعة عملكِ على منصة لمسة ضحى.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-primary mb-6 border-b-2 border-primary/30 pb-2">القوالب الرئيسية المقترحة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainTemplates.map((template) => (
            <Link key={template.slug} href={`/platform/templates/${template.slug}`} passHref>
              <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer border-border hover:border-primary/70 group">
                <CardHeader className="flex-row items-center gap-4 pb-3">
                  <template.icon size={32} className={`${template.color || 'text-primary'} transition-transform group-hover:scale-110`} />
                  <CardTitle className="text-lg text-primary group-hover:text-accent-pink transition-colors">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm text-muted-foreground line-clamp-3">{template.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="p-0 h-auto text-xs text-primary group-hover:text-accent-pink">
                        عرض تفاصيل القالب <ChevronLeft size={14} className="mr-1 group-hover:-translate-x-0.5 transition-transform"/>
                    </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-primary mb-6 border-b-2 border-primary/30 pb-2">أفكار لقوالب إضافية</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalTemplates.map((template) => (
            <Link key={template.slug} href={`/platform/templates/${template.slug}`} passHref>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer border-border hover:border-primary/50 group">
                <CardHeader className="flex-row items-center gap-4 pb-3">
                   <template.icon size={28} className={`${template.color || 'text-secondary'} transition-transform group-hover:scale-110`} />
                  <CardTitle className="text-md text-secondary group-hover:text-accent-purple transition-colors">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2">{template.description}</CardDescription>
                </CardContent>
                 <CardFooter>
                     <Button variant="link" size="sm" className="p-0 h-auto text-xs text-secondary group-hover:text-accent-purple">
                        استكشفي القالب <ChevronLeft size={12} className="mr-1 group-hover:-translate-x-0.5 transition-transform"/>
                    </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
