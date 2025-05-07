// src/app/dashboard/store-template/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, LayoutTemplate, Save, Eye, Upload, Briefcase, Scissors, CookingPot, Shirt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import type { StoreType } from '@/lib/data/mock-store-data'; 

interface TemplateOption {
  id: StoreType;
  name: string;
  description: string;
  icon: React.ElementType;
  previewImage?: string; // Optional: for visual selection
  dataAiHintPreview?: string;
}

const availableTemplates: TemplateOption[] = [
  { id: 'general', name: 'القالب العام', description: 'تصميم مرن يناسب معظم أنواع المنتجات والخدمات.', icon: LayoutTemplate, previewImage: 'https://picsum.photos/seed/tplgeneral/300/200', dataAiHintPreview: 'store layout general' },
  { id: 'bakery', name: 'قالب مخبوزات وحلويات', description: 'مصمم خصيصًا لعرض المخبوزات والحلويات بشكل جذاب، مع تركيز على الصور الشهية.', icon: CookingPot, previewImage: 'https://picsum.photos/seed/tplbakery/300/200', dataAiHintPreview: 'bakery display cakes' },
  { id: 'fashion', name: 'قالب أزياء وإكسسوارات', description: 'لعرض الملابس والإكسسوارات بأناقة، مع خيارات لعرض المقاسات والألوان.', icon: Shirt, previewImage: 'https://picsum.photos/seed/tplfashion/300/200', dataAiHintPreview: 'fashion boutique clothes' },
  { id: 'salon', name: 'قالب صالون وخدمات تجميل', description: 'لعرض خدمات التجميل، حجز المواعيد، وعرض أعمال سابقة.', icon: Scissors, previewImage: 'https://picsum.photos/seed/tplsalon/300/200', dataAiHintPreview: 'beauty salon tools' },
  { id: 'crafts', name: 'قالب حرف يدوية وفنون', description: 'يبرز التفاصيل الفنية للمنتجات المصنوعة يدويًا وقصص الحرفيين.', icon: Palette, previewImage: 'https://picsum.photos/seed/tplcrafts/300/200', dataAiHintPreview: 'handmade crafts art' },
  // Add more templates as needed: rental, service, etc.
];

const themeStyleOptions = [
    { label: "فاتح وأنيق (افتراضي)", value: "light" },
    { label: "داكن وفخم", value: "elegant" }, // This would map to a dark theme variant
    { label: "مرح وحيوي", value: "playful" },
    { label: "عصري وبسيط", value: "modern-minimal" },
    { label: "مظلم ليلي", value: "dark" },
];

const accentColorOptions = [
    { label: "وردي دافئ (لمسة ضحى)", value: "hsl(var(--accent-pink))", name: "Pink" },
    { label: "بنفسجي أنيق", value: "hsl(var(--accent-purple))", name: "Purple" },
    { label: "أصفر مشرق", value: "hsl(var(--accent-yellow))", name: "Yellow" },
    { label: "أخضر زمردي", value: "hsl(145 63% 49%)", name: "Emerald" },
    { label: "أزرق سماوي", value: "hsl(202 80% 55%)", name: "SkyBlue" },
    { label: "برتقالي دافئ", value: "hsl(25 85% 55%)", name: "Orange" },
];


export default function StoreTemplateSettingsPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  // In a real app, these would be fetched for the current seller's store
  const [selectedTemplate, setSelectedTemplate] = useState<StoreType>('general');
  const [selectedThemeStyle, setSelectedThemeStyle] = useState<string>('light');
  const [selectedAccentColor, setSelectedAccentColor] = useState<string>('hsl(var(--accent-pink))');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>("https://picsum.photos/seed/mylogo/200/100"); // Placeholder
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>("https://picsum.photos/seed/mybanner/1200/300"); // Placeholder

  const storeSlug = "my-mock-store"; // Placeholder

  useEffect(() => {
    setIsClient(true);
    // Fetch current store settings here
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
          setLogoFile(file);
          setLogoPreview(reader.result as string);
        } else if (type === 'banner') {
          setBannerFile(file);
          setBannerPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      toast({ title: `تم تحديث ${type === 'logo' ? 'الشعار' : 'البانر'} مؤقتًا.`});
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate saving data
    console.log("Store Template Settings Submitted:", { selectedTemplate, selectedThemeStyle, selectedAccentColor, logoFile, bannerFile });
    toast({
      title: "تم حفظ إعدادات تصميم المتجر بنجاح!",
      description: "سيتم تطبيق التغييرات على مظهر متجركِ.",
      variant: 'default',
    });
  };

  if (!isClient) {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <header className="mb-10">
                <Skeleton className="h-10 w-1/2 mb-2" />
                <Skeleton className="h-6 w-3/4" />
            </header>
            <div className="space-y-10">
                <Card className="shadow-xl"><CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>
                <Card className="shadow-xl"><CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader><CardContent><Skeleton className="h-28 w-full" /></CardContent></Card>
            </div>
             <CardFooter className="border-t pt-8 mt-10 pb-8 flex justify-end"> <Skeleton className="h-12 w-32" /> </CardFooter>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
            <LayoutTemplate size={36} className="ml-3 text-accent-yellow" /> تصميم واجهة متجركِ
          </h1>
          <p className="mt-2 text-lg text-foreground/80">
            اختاري القالب الذي يعكس روح علامتك التجارية، وخصصي الألوان والشعار لمتجر ينبض بالحياة.
          </p>
        </div>
        <Link href={`/store/${storeSlug}`} passHref target="_blank">
          <Button variant="outline" className="border-accent-pink text-accent-pink hover:bg-accent-pink/10">
            <Eye size={18} className="ml-2"/> معاينة المتجر 
          </Button>
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Template Selection */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center"><LayoutTemplate className="ml-2 text-accent-purple" /> اختيار قالب المتجر</CardTitle>
            <CardDescription>كل قالب مصمم ليبرز جمال منتجاتك وخدماتك بطريقة فريدة.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all hover:shadow-2xl ${selectedTemplate === template.id ? 'ring-2 ring-offset-2' : 'border-border'}`}
                  onClick={() => setSelectedTemplate(template.id)}
                  style={selectedTemplate === template.id ? {borderColor: selectedAccentColor || 'hsl(var(--primary))', ringColor: selectedAccentColor || 'hsl(var(--primary))'} : {}}
                >
                  <CardHeader className="p-4">
                    {template.previewImage && (
                      <div className="aspect-video relative mb-3 rounded-md overflow-hidden border">
                        <Image src={template.previewImage} alt={template.name} fill className="object-cover" data-ai-hint={template.dataAiHintPreview} />
                      </div>
                    )}
                    <CardTitle className="text-lg flex items-center gap-2">
                      <template.icon size={20} style={{color: selectedTemplate === template.id ? selectedAccentColor : 'hsl(var(--primary))'}} /> 
                      {template.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appearance Customization */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center"><Palette className="ml-2 text-accent-pink" /> تخصيص مظهر المتجر</CardTitle>
            <CardDescription>أضيفي لمستك الشخصية عبر الألوان، الشعار، والبانر الخاص بمتجرك.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div>
                <Label htmlFor="selectedThemeStyle">نمط التصميم العام</Label>
                <Select value={selectedThemeStyle} onValueChange={setSelectedThemeStyle}>
                    <SelectTrigger id="selectedThemeStyle" className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                    {themeStyleOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="selectedAccentColor">اللون المميز لمتجركِ</Label>
                <Select value={selectedAccentColor} onValueChange={setSelectedAccentColor}>
                    <SelectTrigger id="selectedAccentColor" className="mt-1">
                        <div className="flex items-center gap-2">
                            <span style={{backgroundColor: selectedAccentColor}} className="w-4 h-4 rounded-full border"/>
                            <SelectValue />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                    {accentColorOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                                <span style={{backgroundColor: opt.value}} className="w-4 h-4 rounded-full border"/>
                                {opt.label}
                            </div>
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="md:col-span-2 space-y-2">
                <Label htmlFor="logoFile" className="flex items-center gap-2"><Upload size={18}/> شعار المتجر</Label>
                <Input id="logoFile" name="logoFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} className="mt-1" />
                <p className="text-xs text-muted-foreground">الأبعاد الموصى بها: 200x100 بكسل. يدعم PNG, JPG.</p>
                {logoPreview && <Image data-ai-hint="store logo preview" src={logoPreview} alt="معاينة الشعار" width={150} height={75} className="mt-2 object-contain border rounded-md p-1 bg-muted/30"/>}
            </div>
            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="bannerFile" className="flex items-center gap-2"><Upload size={18}/> بانر المتجر (الصورة العلوية)</Label>
                <Input id="bannerFile" name="bannerFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'banner')} className="mt-1" />
                <p className="text-xs text-muted-foreground">الأبعاد الموصى بها: 1200x300 بكسل.</p>
                {bannerPreview && <Image data-ai-hint="store banner preview" src={bannerPreview} alt="معاينة البانر" width={600} height={150} className="mt-2 w-full object-cover border rounded-md p-1 bg-muted/30"/>}
            </div>
          </CardContent>
        </Card>

        <CardFooter className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-card mt-10 pb-8">
            <p className="text-sm text-muted-foreground">
                اختاري القالب أولاً، ثم خصصي الألوان والهوية البصرية لمتجرك.
            </p>
          <div className="flex gap-3">
            <Button variant="outline" type="button" size="lg" asChild>
                <Link href="/dashboard/settings">العودة للإعدادات العامة</Link>
            </Button>
            <Button type="submit" size="lg" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground shadow-md hover:shadow-lg transition-shadow">
              <Save className="ml-2 h-5 w-5" /> حفظ تصميم المتجر
            </Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
