// src/app/dashboard/reviews/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface Review {
  id: string;
  productName: string;
  productId: string;
  customerName: string;
  customerAvatar: string;
  dataAiHintAvatar: string;
  rating: number;
  comment: string;
  date: string; // ISO date string
  isFeatured?: boolean;
  sellerResponse?: string;
}

const mockReviews: Review[] = [
  {
    id: 'rev1',
    productName: 'أقراط فضية مرصعة بحجر الفيروز',
    productId: 'sprod1',
    customerName: 'عائشة ب.',
    customerAvatar: 'https://picsum.photos/seed/aisha_rev/40/40',
    dataAiHintAvatar: 'woman portrait elegant',
    rating: 5,
    comment: 'الأقراط جميلة جدًا وجودتها رائعة! وصلتني بسرعة والتغليف كان أنيقًا. شكرًا جزيلًا!',
    date: '2024-05-10T14:30:00Z',
    isFeatured: true,
  },
  {
    id: 'rev2',
    productName: 'فستان سهرة أحمر طويل (للإيجار)',
    productId: 'sprod2',
    customerName: 'سارة م.',
    customerAvatar: 'https://picsum.photos/seed/sara_rev/40/40',
    dataAiHintAvatar: 'woman happy review',
    rating: 4,
    comment: 'الفستان كان جميلًا للمناسبة، لكن تمنيت لو كان المقاس مضبوطًا أكثر قليلاً. خدمة العملاء كانت متعاونة.',
    date: '2024-05-08T10:00:00Z',
    sellerResponse: "شكرًا لكِ سارة على تقييمك! نأسف لمشكلة المقاس وسنأخذ ملاحظتكِ بعين الاعتبار لتحسين خدمتنا في المستقبل. سعداء بتعاونكِ."
  },
  {
    id: 'rev3',
    productName: 'ورشة تعليم أساسيات الكروشيه',
    productId: 'sserv1',
    customerName: 'نورة ك.',
    customerAvatar: 'https://picsum.photos/seed/noura_rev/40/40',
    dataAiHintAvatar: 'woman learning',
    rating: 5,
    comment: 'الورشة كانت أكثر من رائعة! المدربة مبدعة وصبورة، تعلمت الكثير واستمتعت بوقتي. أنصح بها بشدة لكل من ترغب بتعلم الكروشيه.',
    date: '2024-05-05T18:20:00Z',
  },
];

const ratingStars = (rating: number, starSize: number = 16) => (
  <div className="flex">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={starSize}
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ))}
  </div>
);

export default function SellerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [isLoading, setIsLoading] = useState(true);
  const [filterRating, setFilterRating] = useState('الكل');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredReviews = reviews.filter(review => 
    filterRating === 'الكل' || review.rating === parseInt(filterRating)
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-6 w-2/3 mb-8" />
        <Card><CardHeader><Skeleton className="h-8 w-1/4 mb-2" /><Skeleton className="h-4 w-1/2" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
        <Card><CardHeader><Skeleton className="h-8 w-1/4 mb-2" /><Skeleton className="h-4 w-1/2" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
          <Star size={36} className="ml-3 text-yellow-400" /> تقييمات العملاء
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          اطلعي على آراء عملائكِ حول منتجاتكِ وخدماتكِ. التقييمات تساعدكِ على تحسين جودة عروضكِ وبناء ثقة أكبر.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <Label htmlFor="ratingFilter" className="text-sm font-medium">تصفية حسب التقييم:</Label>
        <Select value={filterRating} onValueChange={setFilterRating}>
          <SelectTrigger id="ratingFilter" className="w-[180px] bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="الكل">كل التقييمات</SelectItem>
            <SelectItem value="5">5 نجوم</SelectItem>
            <SelectItem value="4">4 نجوم</SelectItem>
            <SelectItem value="3">3 نجوم</SelectItem>
            <SelectItem value="2">نجمتان</SelectItem>
            <SelectItem value="1">نجمة واحدة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredReviews.length > 0 ? (
        <div className="space-y-6">
          {filteredReviews.map(review => (
            <Card key={review.id} className={`shadow-md hover:shadow-lg transition-shadow ${review.isFeatured ? 'border-2 border-yellow-400 bg-yellow-50/50' : 'border-border/50'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={review.customerAvatar} alt={review.customerName} data-ai-hint={review.dataAiHintAvatar} />
                      <AvatarFallback>{review.customerName.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-md font-semibold text-foreground">{review.customerName}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        قيمت منتج/خدمة: <Link href={`/dashboard/products/edit/${review.productId}`} className="text-accent-purple hover:underline">{review.productName}</Link>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    {ratingStars(review.rating)}
                    <p className="text-xs text-muted-foreground mt-1">{new Date(review.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">{review.comment}</p>
                {review.sellerResponse && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-md border-l-4 border-primary">
                    <p className="text-xs font-semibold text-primary mb-1">رد المبدعة:</p>
                    <p className="text-sm text-primary/90 whitespace-pre-line">{review.sellerResponse}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-end gap-2">
                {/* Placeholder for future actions */}
                {!review.sellerResponse && (
                    <Button variant="outline" size="sm" onClick={() => alert('سيتم إضافة ميزة الرد على التقييم قريبًا.')}>
                        <MessageSquare size={16} className="ml-2"/> أضيفي ردًا
                    </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => alert('سيتم إضافة ميزة إبراز التقييم قريبًا.')}>
                  {review.isFeatured ? <ThumbsDown size={16} className="ml-2 text-red-500"/> : <ThumbsUp size={16} className="ml-2 text-green-500"/>}
                  {review.isFeatured ? 'إزالة من المميزة' : 'تمييز التقييم'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-10 text-center">
            <Star size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">لا توجد تقييمات تطابق بحثكِ</h3>
            <p className="text-foreground/70">
              {filterRating === 'الكل' ? 'لم تتلقي أي تقييمات بعد. شجعي عملائكِ على ترك تقييماتهم!' : 'لا توجد تقييمات بهذه النجوم حاليًا.'}
            </p>
          </CardContent>
        </Card>
      )}
       <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
                إجمالي التقييمات المعروضة: {filteredReviews.length}
            </p>
            {/* Add pagination if many reviews */}
      </div>
    </div>
  );
}