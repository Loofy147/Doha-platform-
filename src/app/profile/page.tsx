'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Award, MessageCircle, Users, Heart, Sun, Zap, UserCircle2, Settings2, ShoppingCart, ListOrdered, Lock, MapPin, CreditCard, Bell, Edit3, LogOut, ShieldCheck, Gift } from 'lucide-react';
import Link from 'next/link';

interface BadgeInfo {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  earned: boolean;
  color: string;
}

const mockBadges: BadgeInfo[] = [
  { id: 'star-shopper', name: 'المتسوقة النجمة', icon: Award, description: 'لإتمام 5 عمليات شراء ناجحة هذا الشهر.', earned: true, color: 'text-yellow-500' },
  { id: 'review-queen', name: 'ملكة التقييمات', icon: MessageCircle, description: 'لكتابة 10 تقييمات مفيدة للمنتجات.', earned: true, color: 'text-blue-500' },
  { id: 'community-friend', name: 'صديقة لمسة ضحى', icon: Users, description: 'للمشاركة الفعالة في مجتمعنا.', earned: false, color: 'text-green-500' },
  { id: 'loyal-customer', name: 'العميلة الوفية', icon: Heart, description: 'لأنكِ جزء من عائلتنا منذ أكثر من عام!', earned: true, color: 'text-red-500' },
  { id: 'early-bird', name: 'مُبادِرة الصباح', icon: Sun, description: 'لإتمام عملية شراء قبل الساعة 9 صباحًا.', earned: false, color: 'text-orange-500' },
  { id: 'trendsetter', name: 'رائدة الأناقة', icon: Zap, description: 'لشراء أحدث المنتجات فور إضافتها.', earned: true, color: 'text-purple-500' },
];

const userProfileData = {
  name: 'نورة العبدالله',
  email: 'noura.a@example.com',
  joinDate: '15 مارس 2023',
  avatarSrc: 'https://picsum.photos/128/128?random=userProfile',
  dataAiHint: 'woman smiling portrait',
  points: 1250,
};

const earnedBadges = mockBadges.filter(badge => badge.earned);

export default function ProfilePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Basic skeleton or loading state
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-10 bg-muted rounded w-1/4 mb-8"></div>
          <div className="bg-card shadow-lg rounded-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-24 w-24 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          </div>
          <div className="h-12 bg-muted rounded w-full mb-6"></div>
          <div className="bg-card shadow-lg rounded-lg p-6 md:p-8">
             <div className="h-40 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
          <UserCircle2 size={36} className="ml-3 text-accent-pink" /> ملفي الشخصي
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          أهلاً بكِ في مساحتكِ الخاصة على منصة لمسة ضحى.
        </p>
      </header>

      <Card className="mb-8 shadow-xl border border-primary/10">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-accent-pink shadow-md">
              <AvatarImage src={userProfileData.avatarSrc} alt={userProfileData.name} data-ai-hint={userProfileData.dataAiHint} />
              <AvatarFallback>{userProfileData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-right">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">{userProfileData.name}</h2>
              <p className="text-md text-muted-foreground">{userProfileData.email}</p>
              <p className="text-sm text-muted-foreground mt-1">تاريخ الانضمام: {userProfileData.joinDate}</p>
              <div className="mt-3 text-lg font-semibold text-accent-yellow">
                ✨ نقاط الولاء: {userProfileData.points.toLocaleString()} نقطة
              </div>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 self-center md:self-start border-accent-purple text-accent-purple hover:bg-accent-purple/10">
              <Edit3 size={18} className="ml-2" /> تعديل الملف الشخصي
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="badges">أوسمتي</TabsTrigger>
          <TabsTrigger value="orders">طلباتي</TabsTrigger>
          <TabsTrigger value="wishlist">قائمة الأمنيات</TabsTrigger>
          <TabsTrigger value="settings">إدارة الحساب</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">نظرة عامة على نشاطك</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">أنشطة حديثة (قيد التطوير)</h3>
                <p className="text-sm text-muted-foreground">سيتم عرض أحدث طلباتكِ، تقييماتكِ، والرسائل هنا.</p>
              </div>
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">مكافآت حصرية (قيد التطوير)</h3>
                <p className="text-sm text-muted-foreground">قد تكون لديكِ عروض خاصة أو كوبونات بناءً على نقاطكِ ونشاطكِ.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center"><Gift size={22} className="ml-2 text-accent-pink" /> الأوسمة التي حصلتِ عليها</CardTitle>
              <CardDescription>تقديرًا لتفاعلكِ وإسهاماتكِ في مجتمع لمسة ضحى!</CardDescription>
            </CardHeader>
            <CardContent>
              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.map((badge) => (
                    <Card key={badge.id} className="p-4 flex flex-col items-center text-center bg-card hover:shadow-md transition-shadow">
                      <badge.icon size={40} className={`mb-2 ${badge.color}`} />
                      <h3 className="font-semibold text-foreground mb-1">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">لم تحصلي على أي أوسمة بعد. تفاعلي أكثر لتجميعها!</p>
              )}
              
              <Separator className="my-6" />
              <h3 className="text-lg font-semibold text-primary mb-3">أوسمة يمكنكِ الحصول عليها</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockBadges.filter(b => !b.earned).map((badge) => (
                    <Card key={badge.id} className="p-4 flex flex-col items-center text-center bg-muted/30 opacity-70">
                      <badge.icon size={40} className={`mb-2 ${badge.color}`} />
                      <h3 className="font-semibold text-foreground/80 mb-1">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </Card>
                  ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center"><ShoppingCart size={22} className="ml-2 text-accent-purple"/> سجل طلباتكِ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">هنا ستجدين جميع طلباتكِ السابقة والحالية من منصة لمسة ضحى.</p>
              {/* Placeholder for orders list */}
              <div className="h-40 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
                <p className="text-muted-foreground">لا توجد طلبات حاليًا (عرض تجريبي).</p>
              </div>
              <Button asChild className="mt-4">
                <Link href="/order">عرض جميع الطلبات</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wishlist">
           <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center"><Heart size={22} className="ml-2 text-accent-pink"/> قائمة أمنياتكِ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">احفظي المنتجات والخدمات التي تثير إعجابكِ للعودة إليها لاحقًا.</p>
              {/* Placeholder for wishlist items */}
              <div className="h-40 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
                <p className="text-muted-foreground">قائمة أمنياتك فارغة (عرض تجريبي).</p>
              </div>
               <Button variant="outline" className="mt-4">
                <Link href="/products">ابدئي التصفح وأضيفي للمفضلة</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center"><Settings2 size={22} className="ml-2 text-accent-yellow"/> إدارة حسابكِ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Link href="/profile/edit" className="block">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <UserCircle2 size={24} className="text-accent-pink" />
                    <div>
                      <h3 className="font-semibold text-foreground">معلومات الحساب</h3>
                      <p className="text-sm text-muted-foreground">تعديل اسمك، بريدك الإلكتروني، وصورتك الشخصية.</p>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/profile/security" className="block">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={24} className="text-accent-purple" />
                    <div>
                      <h3 className="font-semibold text-foreground">الأمان وكلمة المرور</h3>
                      <p className="text-sm text-muted-foreground">تغيير كلمة المرور وإدارة إعدادات الأمان.</p>
                    </div>
                  </div>
                </Card>
              </Link>
               <Link href="/profile/addresses" className="block">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <MapPin size={24} className="text-green-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">دفتر العناوين</h3>
                      <p className="text-sm text-muted-foreground">إدارة عناوين الشحن والفواتير الخاصة بكِ.</p>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/profile/payment-methods" className="block">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <CreditCard size={24} className="text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">طرق الدفع</h3>
                      <p className="text-sm text-muted-foreground">إضافة وتعديل طرق الدفع المحفوظة.</p>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/profile/notifications" className="block">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Bell size={24} className="text-orange-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">تفضيلات الإشعارات</h3>
                      <p className="text-sm text-muted-foreground">تحكمي في الإشعارات التي ترغبين في تلقيها.</p>
                    </div>
                  </div>
                </Card>
              </Link>
              <Separator />
              <Button variant="destructive" className="w-full sm:w-auto" onClick={() => alert('تسجيل الخروج (محاكاة)')}>
                <LogOut size={18} className="ml-2"/> تسجيل الخروج
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}