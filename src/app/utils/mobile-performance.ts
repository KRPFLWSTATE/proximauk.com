/**
 * Mobile Performance Utilities
 * Detects mobile devices and optimizes animations/rendering accordingly
 */

// Detect if device is mobile
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Detect if device is low-end
export const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  // @ts-ignore - deviceMemory is not in standard types yet
  const memory = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  
  return (memory && memory < 4) || (cores && cores < 4);
};

// Get optimal animation count based on device
export const getOptimalAnimationCount = (baseCount: number): number => {
  if (isLowEndDevice()) return Math.floor(baseCount * 0.3);
  if (isMobile()) return Math.floor(baseCount * 0.5);
  return baseCount;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get optimal animation duration (slower on mobile for smoothness)
export const getAnimationDuration = (baseDuration: number): number => {
  if (prefersReducedMotion()) return 0;
  if (isMobile()) return baseDuration * 1.2; // Slightly slower on mobile
  return baseDuration;
};

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport (for lazy animation)
export const isInViewport = (element: HTMLElement | null): boolean => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
