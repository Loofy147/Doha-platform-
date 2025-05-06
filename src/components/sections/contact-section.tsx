import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            We'd love to hear from you! Visit us or send us a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <MessageSquare size={24} className="text-accent" /> Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</label>
                  <Input type="text" name="name" id="name" autoComplete="name" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</label>
                  <Input type="email" name="email" id="email" autoComplete="email" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                  <Textarea name="message" id="message" rows={4} className="mt-1" />
                </div>
                <div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center gap-2">
                  <MapPin size={24} className="text-accent" /> Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">123 Bakery Street, Algiers, Algeria</p>
                <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden border">
                  <Image
                    src="https://picsum.photos/800/450"
                    alt="Map showing bakery location"
                    width={800}
                    height={450}
                    className="object-cover w-full h-full"
                    data-ai-hint="city map street"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-foreground/80">
                <p className="flex items-center gap-3">
                  <Phone size={20} className="text-accent" />
                  <span>+213 (0) 555 123 456</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail size={20} className="text-accent" />
                  <span>info@hamidmerdjbakery.dz</span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock size={20} className="text-accent" />
                  <span>Monday - Saturday: 7:00 AM - 7:00 PM</span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock size={20} className="text-accent" />
                  <span>Sunday: Closed</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
