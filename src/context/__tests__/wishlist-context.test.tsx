import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WishlistProvider, useWishlist } from '../wishlist-context';
import { type Product } from '@/lib/data/mock-store-data';

const mockProduct1: Product = {
  id: 'prod1',
  name: 'Elegant Evening Gown',
  description: 'A beautiful evening gown.',
  price: '5,000 DZD',
  rawPrice: 5000,
  imageSrc: 'https://picsum.photos/seed/prod1/400/400',
  dataAiHint: 'elegant evening dress',
  category: 'Fashion',
  type: 'Sale',
  sellerId: 'store1',
  storeSlug: 'fancy-fashion',
  stockCount: 10,
  dateAdded: new Date().toISOString(),
};

const mockProduct2: Product = {
  id: 'prod2',
  name: 'Handmade Silver Earrings',
  description: 'Unique silver earrings.',
  price: '1,500 DZD',
  rawPrice: 1500,
  imageSrc: 'https://picsum.photos/seed/prod2/400/400',
  dataAiHint: 'silver earrings',
  category: 'Accessories',
  type: 'Sale',
  sellerId: 'store1',
  storeSlug: 'fancy-fashion',
  stockCount: 25,
  dateAdded: new Date().toISOString(),
};

const TestComponent = () => {
  const { state, dispatch } = useWishlist();
  return (
    <div>
      <div data-testid="item-count">{state.items.length}</div>
      <ul>
        {state.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: mockProduct1 })}>
        Add Product 1
      </button>
      <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: 'prod1' } })}>
        Remove Product 1
      </button>
    </div>
  );
};

describe('WishlistContext', () => {
  it('should add an item to the wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    act(() => {
      screen.getByText('Add Product 1').click();
    });

    expect(screen.getByText('Elegant Evening Gown')).toBeInTheDocument();
    expect(screen.getByTestId('item-count').textContent).toBe('1');
  });

  it('should not add a duplicate item', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    act(() => {
      screen.getByText('Add Product 1').click();
    });
    act(() => {
      screen.getByText('Add Product 1').click();
    });

    expect(screen.getAllByText('Elegant Evening Gown')).toHaveLength(1);
    expect(screen.getByTestId('item-count').textContent).toBe('1');
  });

  it('should remove an item from the wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    act(() => {
      screen.getByText('Add Product 1').click();
    });
    expect(screen.getByText('Elegant Evening Gown')).toBeInTheDocument();

    act(() => {
      screen.getByText('Remove Product 1').click();
    });

    expect(screen.queryByText('Elegant Evening Gown')).not.toBeInTheDocument();
    expect(screen.getByTestId('item-count').textContent).toBe('0');
  });

  it('should load items from localStorage', () => {
    localStorage.setItem('wishlist', JSON.stringify([mockProduct1, mockProduct2]));

    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    expect(screen.getByText('Elegant Evening Gown')).toBeInTheDocument();
    expect(screen.getByText('Handmade Silver Earrings')).toBeInTheDocument();
    expect(screen.getByTestId('item-count').textContent).toBe('2');

    // Clean up localStorage
    localStorage.removeItem('wishlist');
  });

  it('should save items to localStorage when the wishlist changes', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    act(() => {
      screen.getByText('Add Product 1').click();
    });

    const savedWishlist = localStorage.getItem('wishlist');
    expect(savedWishlist).toBe(JSON.stringify([mockProduct1]));
  });
});