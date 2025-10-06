import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoreServiceCard from '../store-service-card';
import { useToast } from '@/hooks/use-toast';
import { type Service } from '@/lib/data/mock-store-data';
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

const mockService: Service = {
  id: 'serv1',
  name: 'جلسة تصوير احترافية',
  description: 'جلسة تصوير لمدة ساعة.',
  price: '10,000 دج',
  rawPrice: 10000,
  imageSrc: 'https://picsum.photos/seed/serv1/400/225',
  dataAiHint: 'professional photography session',
  category: 'خدمات',
  type: 'خدمة',
  sellerId: 'store2',
  storeSlug: 'creative-shots',
  duration: 'ساعة واحدة',
  location: 'عبر الإنترنت',
  dateAdded: new Date().toISOString(),
};

// Helper to render with WishlistProvider
const renderWithWishlist = (component: React.ReactElement) => {
  return render(<WishlistProvider>{component}</WishlistProvider>);
};

describe('StoreServiceCard', () => {
  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    mockedToast.mockClear();
    mockOnViewDetails.mockClear();
    localStorage.clear();
  });

  it('renders service information correctly', () => {
    renderWithWishlist(<StoreServiceCard service={mockService} onViewDetails={mockOnViewDetails} />);
    expect(screen.getByText('جلسة تصوير احترافية')).toBeInTheDocument();
    expect(screen.getByText('خدمة / خدمات')).toBeInTheDocument();
  });

  it('toggles item in wishlist and shows correct toast notifications', () => {
    renderWithWishlist(<StoreServiceCard service={mockService} onViewDetails={mockOnViewDetails} />);
    const wishlistButton = screen.getByRole('button', { name: /إضافة إلى المفضلة/i });
    const heartIcon = wishlistButton.querySelector('svg');

    // Initially not in wishlist
    expect(heartIcon).not.toHaveClass('fill-destructive');

    // Add to wishlist
    fireEvent.click(wishlistButton);
    expect(mockedToast).toHaveBeenCalledWith(expect.objectContaining({
        title: `💖 ${mockService.name}`,
        description: 'تمت إضافة الخدمة إلى قائمة أمنياتك!',
    }));
    expect(heartIcon).toHaveClass('fill-destructive');

    // Remove from wishlist
    fireEvent.click(wishlistButton);
    expect(mockedToast).toHaveBeenCalledWith(expect.objectContaining({
        title: `💔 ${mockService.name}`,
        description: 'تمت إزالة الخدمة من قائمة أمنياتك.',
    }));
    expect(heartIcon).not.toHaveClass('fill-destructive');
  });

  it('shows a toast notification when service is booked', () => {
    renderWithWishlist(<StoreServiceCard service={mockService} onViewDetails={mockOnViewDetails} />);
    const bookServiceButton = screen.getByRole('button', { name: `حجز خدمة ${mockService.name}` });
    fireEvent.click(bookServiceButton);
    expect(mockedToast).toHaveBeenCalledWith(expect.objectContaining({
        title: `🗓️ ${mockService.name}`,
    }));
  });
});