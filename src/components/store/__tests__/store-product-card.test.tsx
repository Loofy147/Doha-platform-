import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoreProductCard from '../store-product-card';
import { useToast } from '@/hooks/use-toast';
import { type Product } from '@/lib/data/mock-store-data';
import { WishlistProvider } from '@/context/wishlist-context';

// Mock the useToast hook
const mockedToast = jest.fn();
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockedToast,
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
    return ({children, href, ...props}) => <a href={href} {...props}>{children}</a>;
});

const mockProduct: Product = {
  id: 'prod1',
  name: 'فستان سهرة أنيق',
  description: 'فستان سهرة طويل بتصميم فريد.',
  price: '5,000 دج',
  rawPrice: 5000,
  imageSrc: 'https://picsum.photos/seed/prod1/400/400',
  dataAiHint: 'elegant evening dress',
  category: 'أزياء',
  type: 'بيع',
  sellerId: 'store1',
  storeSlug: 'fancy-fashion',
  isNew: true,
  isBestseller: false,
  averageRating: 4.5,
  reviewCount: 15,
  stockCount: 10,
  dateAdded: new Date().toISOString(),
};

// Helper to render with WishlistProvider
const renderWithWishlist = (component: React.ReactElement) => {
  return render(<WishlistProvider>{component}</WishlistProvider>);
};

describe('StoreProductCard', () => {
  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    mockedToast.mockClear();
    mockOnViewDetails.mockClear();
    localStorage.clear();
  });

  it('renders product information correctly', () => {
    renderWithWishlist(<StoreProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);
    expect(screen.getByText('فستان سهرة أنيق')).toBeInTheDocument();
    expect(screen.getByText('بيع / أزياء')).toBeInTheDocument();
  });

  it('toggles item in wishlist and shows correct toast notifications', () => {
    renderWithWishlist(<StoreProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);
    const wishlistButton = screen.getByRole('button', { name: /إضافة إلى المفضلة/i });
    const heartIcon = wishlistButton.querySelector('svg');

    // Initially not in wishlist
    expect(heartIcon).not.toHaveClass('fill-destructive');

    // Add to wishlist
    fireEvent.click(wishlistButton);
    expect(mockedToast).toHaveBeenCalledWith(expect.objectContaining({
        title: `💖 ${mockProduct.name}`,
        description: 'تمت إضافة المنتج إلى قائمة أمنياتك!',
    }));
    expect(heartIcon).toHaveClass('fill-destructive');

    // Remove from wishlist
    fireEvent.click(wishlistButton);
    expect(mockedToast).toHaveBeenCalledWith(expect.objectContaining({
        title: `💔 ${mockProduct.name}`,
        description: 'تمت إزالة المنتج من قائمة أمنياتك.',
    }));
    expect(heartIcon).not.toHaveClass('fill-destructive');
  });

  it('shows a toast notification when added to cart', () => {
    renderWithWishlist(<StoreProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);
    const addToCartButton = screen.getByRole('button', { name: `إضافة ${mockProduct.name} للسلة` });
    fireEvent.click(addToCartButton);
    expect(mockedToast).toHaveBeenCalledWith(expect.objectContaining({
        title: `🛍️ ${mockProduct.name}`,
    }));
  });
});