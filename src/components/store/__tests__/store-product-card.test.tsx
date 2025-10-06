import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoreProductCard from '../store-product-card';
import { useToast } from '@/hooks/use-toast';
import { type Product } from '@/lib/data/mock-store-data';

// Mock the useToast hook to return a consistent, spyable toast function
const mockedToast = jest.fn();
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockedToast,
  }),
}));

// Mock next/link to render as a simple anchor tag
jest.mock('next/link', () => {
    return ({children, href, ...props}) => {
        return <a href={href} {...props}>{children}</a>
    }
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

describe('StoreProductCard', () => {
  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    // Clear mock history before each test
    mockedToast.mockClear();
    mockOnViewDetails.mockClear();
  });

  it('renders product information correctly', () => {
    render(<StoreProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    expect(screen.getByText('فستان سهرة أنيق')).toBeInTheDocument();
    expect(screen.getByText('بيع / أزياء')).toBeInTheDocument();
    expect(screen.getByText('5,000 دج')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(15 تقييمات)')).toBeInTheDocument();
    expect(screen.getByText('جديد!')).toBeInTheDocument();
  });

  it('calls onViewDetails when the details button is clicked', () => {
    render(<StoreProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    const detailsButton = screen.getByRole('button', { name: /تفاصيل/i });
    fireEvent.click(detailsButton);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockProduct);
  });

  it('shows a toast notification when added to wishlist', () => {
    render(<StoreProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    const wishlistButton = screen.getByRole('button', { name: /إضافة إلى المفضلة/i });
    fireEvent.click(wishlistButton);

    expect(mockedToast).toHaveBeenCalledWith(
        expect.objectContaining({
            title: `💖 ${mockProduct.name}`,
            description: "تمت إضافة المنتج إلى قائمة أمنياتك (محاكاة)!",
        })
    );
  });

    it('shows a toast notification when added to cart', () => {
    render(<StoreProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    const addToCartButton = screen.getByRole('button', { name: `إضافة ${mockProduct.name} للسلة` });
    fireEvent.click(addToCartButton);

    expect(mockedToast).toHaveBeenCalledWith(
        expect.objectContaining({
            title: `🛍️ ${mockProduct.name}`,
            description: "تمت الإضافة للسلة!",
        })
    );
  });

  it('displays a discount correctly', () => {
    const discountedProduct: Product = {
      ...mockProduct,
      discountPercentage: '20',
      rawPrice: 5000,
      price: '4,000 دج'
    };
    render(<StoreProductCard product={discountedProduct} onViewDetails={mockOnViewDetails} />);

    expect(screen.getByText('خصم 20%')).toBeInTheDocument();
    expect(screen.getByText('4,000 دج')).toBeInTheDocument();
    expect(screen.getByText('5,000 دج')).toHaveClass('line-through');
  });
});