import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductReviewsSection } from '../product-reviews-section';
import { type Review } from '@/lib/data/mock-store-data';

const mockReviews: Review[] = [
  {
    id: 'rev1',
    authorName: 'Fatima',
    rating: 5,
    comment: 'Amazing product!',
    date: new Date().toISOString(),
    itemId: 'item1',
    storeId: 'store1',
    authorAvatar: 'https://i.pravatar.cc/40?u=fatima',
    dataAiHintAvatar: 'avatar of fatima'
  },
  {
    id: 'rev2',
    authorName: 'Aisha',
    rating: 4,
    comment: 'Very good, but could be better.',
    date: new Date().toISOString(),
    itemId: 'item1',
    storeId: 'store1',
    authorAvatar: 'https://i.pravatar.cc/40?u=aisha',
    dataAiHintAvatar: 'avatar of aisha'
  },
];

describe('ProductReviewsSection', () => {
  // Provide a default empty variant for the tests
  const itemVariants = {};

  it('renders the section title', () => {
    render(
      <ProductReviewsSection
        reviews={mockReviews}
        effectiveAccentColor="blue"
        totalReviewCount={5}
        itemVariants={itemVariants}
      />
    );
    expect(screen.getByText('آراء العميلات')).toBeInTheDocument();
  });

  it('renders the correct number of reviews', () => {
    render(
      <ProductReviewsSection
        reviews={mockReviews}
        effectiveAccentColor="blue"
        totalReviewCount={5}
        itemVariants={itemVariants}
      />
    );
    expect(screen.getByText('Amazing product!')).toBeInTheDocument();
    expect(screen.getByText('Very good, but could be better.')).toBeInTheDocument();
  });

  it('displays the total review count in a button', () => {
    render(
      <ProductReviewsSection
        reviews={mockReviews}
        effectiveAccentColor="blue"
        totalReviewCount={5}
        itemVariants={itemVariants}
      />
    );
    expect(screen.getByRole('button', { name: /عرض كل التقييمات \(5\)/i })).toBeInTheDocument();
  });

  it('shows a message when there are no reviews', () => {
    render(
      <ProductReviewsSection
        reviews={[]}
        effectiveAccentColor="blue"
        totalReviewCount={0}
        itemVariants={itemVariants}
      />
    );
    expect(
      screen.getByText('لا توجد تقييمات لهذا المنتج بعد. كوني أول من يضيف تقييمًا!')
    ).toBeInTheDocument();
  });
});