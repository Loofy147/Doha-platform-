import '@testing-library/jest-dom';
import React from 'react';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock Element.animate
if (typeof Element.prototype.animate === 'undefined') {
  Element.prototype.animate = jest.fn().mockImplementation(() => ({
    finished: Promise.resolve(),
    cancel: jest.fn(),
  }));
}

// Global mock for next/link to handle passHref
jest.mock('next/link', () => {
  return ({ children, href, passHref, ...props }) => {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Global mock for framer-motion to filter out invalid DOM props
jest.mock('framer-motion', () => {
  const motion = {
    div: React.forwardRef(({ children, ...props }, ref) => {
      const { initial, animate, variants, transition, whileInView, viewport, ...rest } = props;
      return <div ref={ref} {...rest}>{children}</div>;
    }),
    section: React.forwardRef(({ children, ...props }, ref) => {
        const { initial, animate, variants, transition, whileInView, viewport, ...rest } = props;
        return <section ref={ref} {...rest}>{children}</section>;
    }),
    h2: React.forwardRef(({ children, ...props }, ref) => {
        const { initial, animate, variants, transition, ...rest } = props;
        return <h2 ref={ref} {...rest}>{children}</h2>;
    }),
    span: React.forwardRef(({ children, ...props }, ref) => {
        const { initial, animate, variants, transition, ...rest } = props;
        return <span ref={ref} {...rest}>{children}</span>;
    }),
  };

  return {
    ...jest.requireActual('framer-motion'),
    motion,
    useInView: () => ({}),
  };
});