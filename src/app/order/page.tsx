
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Truck, CalendarDays, Clock, User, Phone, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dummy product data - replace with actual product fetching in a real app
const availableProducts = [
  { id: 'khobz_dar', name: 'Traditional Khobz Dar', price: 150 },
  { id: 'msemmen', name: 'Sweet Msemmen', price: 80 },
  { id: 'baguette', name: 'Artisan Baguette', price: 120 },
  { id: 'maamoul', name: 'Date Maamoul Cookies (Box)', price: 250 },
  { id: 'baklava', name: 'Crispy Baklava (Portion)', price: 300 },
  { id: 'kalb_el_louz', name: 'Kalb el Louz (Slice)', price: 200 },
  { id: 'makrout', name: 'Algerian Makrout (Box)', price: 220 },
  { id: 'ghraiba', name: 'Ghraiba Cookies (Box)', price: 180 },
];

const orderFormSchema = z.object({
  customerName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phoneNumber: z.string().regex(/^\+?[0-9\s-]{7,15}$/, { message: 'Please enter a valid phone number.' }),
  deliveryOption: z.enum(['pickup', 'delivery'], { required_error: 'Please select a delivery option.' }),
  deliveryAddress: z.string().optional(),
  preferredDate: z.string().refine((date) => !isNaN(Date.parse(date)), {message: 'Please select a valid date.'}),
  preferredTime: z.string().min(1, { message: 'Please select a preferred time.' }),
  orderedItems: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1.' }),
  })).min(1, { message: 'Please select at least one item to order.' }),
  specialInstructions: z.string().optional(),
}).refine(data => data.deliveryOption === 'pickup' || (data.deliveryOption === 'delivery' && data.deliveryAddress && data.deliveryAddress.length >= 10), {
  message: 'Delivery address is required for delivery option and must be at least 10 characters.',
  path: ['deliveryAddress'],
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

export default function OrderPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      orderedItems: [],
      deliveryOption: 'pickup',
    }
  });

  const deliveryOption = watch('deliveryOption');

  useEffect(() => {
    const currentOrderedItems = Object.entries(selectedItems)
      .filter(([, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({ productId, quantity }));
    setValue('orderedItems', currentOrderedItems);

    const newTotalPrice = currentOrderedItems.reduce((acc, item) => {
      const product = availableProducts.find(p => p.id === item.productId);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);
    setTotalPrice(newTotalPrice);

  }, [selectedItems, setValue]);


  const handleQuantityChange = (productId: string, change: number) => {
    setSelectedItems(prev => {
      const currentQuantity = prev[productId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change); // Ensure quantity doesn't go below 0
      if (newQuantity === 0) {
        const { [productId]: _, ...rest } = prev; // Remove item if quantity is 0
        return rest;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };


  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Order Submitted:', data);
    toast({
      title: 'Order Placed Successfully!',
      description: "Thank you for your order. We will contact you shortly to confirm.",
      variant: 'default',
    });
    reset();
    setSelectedItems({});
  };

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center">
              <ShoppingBag size={32} className="mr-3 text-accent" /> Loading Order Form...
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
            <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
            <div className="h-20 bg-muted rounded animate-pulse w-full"></div>
            <div className="h-12 bg-muted rounded animate-pulse w-1/2 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center">
            <ShoppingBag size={32} className="mr-3 text-accent" /> Place Your Order
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-8 space-y-8">
            {/* Product Selection Section */}
            <section>
              <h3 className="text-xl font-semibold text-primary mb-4">Select Your Items</h3>
              <div className="space-y-4">
                {availableProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg bg-card/50">
                    <div>
                      <p className="font-medium text-card-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">DA {product.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" size="icon" onClick={() => handleQuantityChange(product.id, -1)} disabled={(selectedItems[product.id] || 0) === 0}>-</Button>
                      <span className="w-8 text-center">{(selectedItems[product.id] || 0)}</span>
                      <Button type="button" variant="outline" size="icon" onClick={() => handleQuantityChange(product.id, 1)}>+</Button>
                    </div>
                  </div>
                ))}
              </div>
              {errors.orderedItems && <p className="mt-2 text-sm text-destructive">{errors.orderedItems.message}</p>}
            </section>

            {/* Order Details Section */}
            <section>
              <h3 className="text-xl font-semibold text-primary mb-4">Order Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="customerName" className="flex items-center mb-1"><User size={16} className="mr-2 text-accent" /> Full Name</Label>
                  <Input id="customerName" {...register('customerName')} placeholder="e.g. Hamid Merdj" />
                  {errors.customerName && <p className="mt-1 text-sm text-destructive">{errors.customerName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="flex items-center mb-1"><Phone size={16} className="mr-2 text-accent" /> Phone Number</Label>
                  <Input id="phoneNumber" type="tel" {...register('phoneNumber')} placeholder="e.g. +213 555 123 456" />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-destructive">{errors.phoneNumber.message}</p>}
                </div>
                <div>
                  <Label htmlFor="preferredDate" className="flex items-center mb-1"><CalendarDays size={16} className="mr-2 text-accent" /> Preferred Date</Label>
                  <Input id="preferredDate" type="date" {...register('preferredDate')} min={new Date().toISOString().split('T')[0]} />
                  {errors.preferredDate && <p className="mt-1 text-sm text-destructive">{errors.preferredDate.message}</p>}
                </div>
                <div>
                  <Label htmlFor="preferredTime" className="flex items-center mb-1"><Clock size={16} className="mr-2 text-accent" /> Preferred Time</Label>
                   <Controller
                    name="preferredTime"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="preferredTime">
                            <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="08:00-10:00">08:00 - 10:00 AM</SelectItem>
                            <SelectItem value="10:00-12:00">10:00 - 12:00 PM</SelectItem>
                            <SelectItem value="14:00-16:00">02:00 - 04:00 PM</SelectItem>
                            <SelectItem value="16:00-18:00">04:00 - 06:00 PM</SelectItem>
                        </SelectContent>
                        </Select>
                    )}
                    />
                  {errors.preferredTime && <p className="mt-1 text-sm text-destructive">{errors.preferredTime.message}</p>}
                </div>
              </div>
            </section>

            {/* Delivery Options Section */}
            <section>
              <h3 className="text-xl font-semibold text-primary mb-4">Delivery Option</h3>
              <Controller
                name="deliveryOption"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Label htmlFor="pickup" className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors data-[state=checked]:bg-accent/20 data-[state=checked]:border-accent">
                      <RadioGroupItem value="pickup" id="pickup" className="mr-3"/>
                      <Truck size={20} className="mr-2 text-accent" /> Pick up from Bakery
                    </Label>
                    <Label htmlFor="delivery" className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors data-[state=checked]:bg-accent/20 data-[state=checked]:border-accent">
                      <RadioGroupItem value="delivery" id="delivery" className="mr-3"/>
                      <MapPin size={20} className="mr-2 text-accent" /> Home Delivery
                    </Label>
                  </RadioGroup>
                )}
              />
              {errors.deliveryOption && <p className="mt-2 text-sm text-destructive">{errors.deliveryOption.message}</p>}
              
              {deliveryOption === 'delivery' && (
                <div className="mt-4">
                  <Label htmlFor="deliveryAddress" className="flex items-center mb-1"><MapPin size={16} className="mr-2 text-accent" /> Delivery Address</Label>
                  <Textarea id="deliveryAddress" {...register('deliveryAddress')} placeholder="Enter your full address for delivery" />
                  {errors.deliveryAddress && <p className="mt-1 text-sm text-destructive">{errors.deliveryAddress.message}</p>}
                </div>
              )}
            </section>
            
            {/* Special Instructions Section */}
            <section>
                <Label htmlFor="specialInstructions" className="text-lg font-medium text-primary mb-1">Special Instructions (Optional)</Label>
                <Textarea id="specialInstructions" {...register('specialInstructions')} placeholder="Any specific requests? e.g., less sugar, gift wrapping, etc."/>
            </section>

          </CardContent>
          <CardFooter className="p-8 border-t flex flex-col items-center">
            <p className="text-2xl font-bold text-primary mb-6">
              Total: DA {totalPrice.toLocaleString()}
            </p>
            <Button type="submit" size="lg" className="w-full max-w-xs bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
