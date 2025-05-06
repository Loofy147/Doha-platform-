'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Rss, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredPost = {
  id: "feat1",
  title: "5 Essential Tips for Starting Your Online Store on WomenCommerce",
  date: "October 26, 2023",
  excerpt: "Embarking on your e-commerce journey? Here are five crucial tips to set up your WomenCommerce store for success, from product photography to customer engagement.",
  author: "The WomenCommerce Team",
  category: "Seller Tips",
  imageSrc: "https://picsum.photos/800/450?random=20",
  dataAiHint: "woman working laptop",
  slug: "/blog/5-tips-starting-online-store"
};

const recentPosts = [
  {
    id: "post1",
    title: "How to Price Your Handmade Products Fairly and Profitably",
    date: "October 20, 2023",
    category: "Business Strategy",
    imageSrc: "https://picsum.photos/400/225?random=21",
    dataAiHint: "calculator money",
    slug: "/blog/pricing-handmade-products"
  },
  {
    id: "post2",
    title: "The Power of Storytelling in Marketing Your Brand",
    date: "October 15, 2023",
    category: "Marketing",
    imageSrc: "https://picsum.photos/400/225?random=22",
    dataAiHint: "writing notes",
    slug: "/blog/storytelling-marketing"
  },
  {
    id: "post3",
    title: "Navigating Shipping and Logistics for Small Businesses",
    date: "October 10, 2023",
    category: "Operations",
    imageSrc: "https://picsum.photos/400/225?random=23",
    dataAiHint: "delivery boxes",
    slug: "/blog/shipping-logistics-small-business"
  },
   {
    id: "post4",
    title: "Spotlight: Success Story from a WomenCommerce Seller",
    date: "October 5, 2023",
    category: "Community",
    imageSrc: "https://picsum.photos/400/225?random=24",
    dataAiHint: "woman smiling store",
    slug: "/blog/seller-success-story"
  }
];

const categories = ["All", "Seller Tips", "Business Strategy", "Marketing", "Operations", "Community", "Platform Updates"];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <FileText size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          WomenCommerce Blog
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Insights, tips, and stories to help you thrive in the world of e-commerce and entrepreneurship.
        </p>
      </header>

      {/* Featured Post */}
      <section className="mb-16">
        <Card className="overflow-hidden shadow-xl lg:grid lg:grid-cols-2 lg:items-center">
          <div className="relative h-64 sm:h-80 lg:h-full lg:order-last">
            <Image
              src={featuredPost.imageSrc}
              alt={featuredPost.title}
              fill
              className="object-cover"
              data-ai-hint={featuredPost.dataAiHint}
            />
          </div>
          <CardContent className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <CardDescription className="text-sm text-accent-purple font-medium mb-1">{featuredPost.category} • {featuredPost.date}</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-primary mb-3 hover:text-primary/80 transition-colors">
              <Link href={featuredPost.slug}>{featuredPost.title}</Link>
            </CardTitle>
            <p className="text-foreground/70 mb-4 text-sm sm:text-base leading-relaxed">{featuredPost.excerpt}</p>
            <p className="text-xs text-muted-foreground mb-6">By {featuredPost.author}</p>
            <Button asChild variant="outline" className="self-start border-primary text-primary hover:bg-primary/10">
              <Link href={featuredPost.slug}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Blog Grid & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Recent Posts */}
        <main className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-semibold text-primary border-b pb-2">Recent Posts</h2>
          {recentPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden shadow-lg flex flex-col sm:flex-row">
              <div className="relative h-48 w-full sm:w-1/3 sm:h-auto flex-shrink-0">
                <Image src={post.imageSrc} alt={post.title} fill className="object-cover" data-ai-hint={post.dataAiHint} />
              </div>
              <CardContent className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <CardDescription className="text-xs text-accent-purple font-medium mb-1">{post.category} • {post.date}</CardDescription>
                  <CardTitle className="text-lg font-semibold text-primary mb-2 hover:text-primary/80 transition-colors">
                     <Link href={post.slug}>{post.title}</Link>
                  </CardTitle>
                </div>
                <Button asChild variant="link" className="p-0 h-auto text-sm self-start mt-3 text-accent-pink hover:underline">
                  <Link href={post.slug}>Read article &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
           <div className="text-center mt-12">
            <Button variant="outline" size="lg">Load More Posts (Coming Soon)</Button>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">Search Blog</h3>
            <div className="relative">
              <Input type="search" placeholder="Search articles..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">Categories</h3>
            <ul className="space-y-1.5">
              {categories.map((category) => (
                <li key={category}>
                  <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-primary hover:bg-primary/5">
                    <Link href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <Card className="bg-secondary/20 p-6">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-xl text-primary flex items-center"><Rss size={22} className="mr-2 text-accent"/>Subscribe to our Newsletter</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm text-foreground/70 mb-3">Get the latest blog posts, tips, and platform updates straight to your inbox.</p>
              <form className="space-y-3">
                <Input type="email" placeholder="your.email@example.com" />
                <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
