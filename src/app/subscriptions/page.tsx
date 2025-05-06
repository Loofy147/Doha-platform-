'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Gift, Sparkles } from "lucide-react";
import Link from "next/link";

const subscriptionPlans = [
  {
    name: "Basic Seller",
    price: "Free",
    features: [
      "List up to 10 products/services",
      "Basic store customization",
      "Standard commission rate (15%)",
      "Access to community forums",
    ],
    cta: "Start Selling",
    href: "/auth/register?role=seller",
    popular: false,
  },
  {
    name: "Pro Seller",
    price: "DA 2,500/month",
    features: [
      "List up to 50 products/services",
      "Advanced store customization",
      "Reduced commission rate (10%)",
      "Priority support",
      "Featured listings opportunities",
      "Access to exclusive workshops",
    ],
    cta: "Go Pro",
    href: "/checkout?plan=pro",
    popular: true,
  },
  {
    name: "Elite Seller",
    price: "DA 5,000/month",
    features: [
      "Unlimited product/service listings",
      "Premium store themes & analytics",
      "Lowest commission rate (5%)",
      "Dedicated account manager",
      "Top placement in search results",
      "Early access to new features",
      "AI-powered marketing insights",
    ],
    cta: "Go Elite",
    href: "/checkout?plan=elite",
    popular: false,
  }
];

export default function SubscriptionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <Gift size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          WomenCommerce Subscription Plans
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Choose a plan that best suits your business needs and unlock powerful tools to grow on WomenCommerce. For buyers, browsing and purchasing is always free!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col shadow-lg rounded-lg overflow-hidden ${plan.popular ? 'border-2 border-accent-yellow ring-2 ring-accent-yellow/50' : 'border-primary/20'}`}>
            {plan.popular && (
              <div className="bg-accent-yellow text-accent-yellow-foreground text-center py-1.5 text-sm font-semibold">
                Most Popular
              </div>
            )}
            <CardHeader className="p-6 bg-card/50">
              <CardTitle className="text-2xl font-semibold text-primary">{plan.name}</CardTitle>
              <CardDescription className="text-3xl font-bold text-accent-pink mt-2">{plan.price}</CardDescription>
               <p className="text-sm text-muted-foreground mt-1">{plan.name === "Basic Seller" ? "Perfect for getting started" : (plan.name === "Pro Seller" ? "For growing businesses" : "For established sellers seeking maximum growth")}</p>
            </CardHeader>
            <CardContent className="p-6 flex-grow space-y-3">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 mt-auto">
              <Button asChild className={`w-full ${plan.popular ? 'bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground' : 'bg-primary hover:bg-primary/90'}`} size="lg">
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-secondary/20 rounded-lg">
        <Sparkles size={32} className="mx-auto text-accent mb-4" />
        <h2 className="text-2xl font-semibold text-primary mb-3">Are you a Buyer?</h2>
        <p className="text-foreground/80 mb-6 max-w-xl mx-auto">
          Enjoy browsing, discovering unique items, and supporting women entrepreneurs on WomenCommerce for FREE! Create an account to save your favorites and manage your purchases.
        </p>
        <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <Link href="/auth/register?role=buyer">Create Buyer Account</Link>
        </Button>
      </div>
    </div>
  );
}
