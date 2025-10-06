// Optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

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
    play: jest.fn(),
    pause: jest.fn(),
    reverse: jest.fn(),
    finish: jest.fn(),
    updatePlaybackRate: jest.fn(),
    persist: jest.fn(),
    startTime: 0,
    currentTime: 0,
    timeline: null,
    playbackRate: 1,
    playState: 'idle',
    onfinish: null,
    oncancel: null,
    onremove: null,
  }));
}