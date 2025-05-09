// src/components/store/seller-contact-modal.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface SellerContactModalProps {
  storeName: string;
  storeAccentColor?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const contactSchema = z.object({
  name: z.string().min(2, { message: "الرجاء إدخال اسمك." }),
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح." }),
  message: z.string().min(10, { message: "يجب أن تتكون الرسالة من 10 أحرف على الأقل." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function SellerContactModal({
  storeName,
  storeAccentColor,
  isOpen,
  onOpenChange,
}: SellerContactModalProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Message to seller:", data);
    toast({
      title: "تم إرسال رسالتك بنجاح!",
      description: `تم إرسال رسالتك إلى ${storeName} (محاكاة). سيتواصلون معكِ قريبًا.`,
      variant: 'default',
    });
    reset();
    onOpenChange(false);
  };

  const accent = storeAccentColor || 'hsl(var(--primary))';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl" style={{color: accent}}>
            <MessageSquare size={24} /> تواصلي مع {storeName}
          </DialogTitle>
          <DialogDescription>
            لديكِ استفسار أو طلب خاص؟ املئي النموذج أدناه.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div>
            <Label htmlFor="contact-name">اسمكِ</Label>
            <Input id="contact-name" {...register('name')} placeholder="اسمكِ الكامل" />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-email">بريدك الإلكتروني</Label>
            <Input id="contact-email" type="email" {...register('email')} placeholder="you@example.com" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-message">رسالتكِ</Label>
            <Textarea id="contact-message" {...register('message')} placeholder="اكتبي استفساركِ هنا..." rows={4} />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                إلغاء
              </Button>
            </DialogClose>
            <Button type="submit" style={{backgroundColor: accent}} className="text-white hover:opacity-90" disabled={isSubmitting}>
              <Send size={16} className="ml-2" /> {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
