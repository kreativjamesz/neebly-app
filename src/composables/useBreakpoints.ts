import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core';

// Create a composable function
export function useBreakpointsComposable() {
  // Initialize breakpoints with Vuetify's breakpoint system
  const breakpoints = useBreakpoints(breakpointsVuetifyV3);

  // Define responsive conditions
  const isMobile = breakpoints.smaller('sm'); // smaller than 'sm'
  const isTabletOrLarger = breakpoints.greaterOrEqual('sm'); // 'sm' and larger
  const isLargerDesktop = breakpoints.greaterOrEqual('lg'); // 'lg' and larger
  const isTablet = breakpoints.between('sm', 'md'); // between 'sm' and 'md'
  
  return {
    isMobile,
    isTabletOrLarger,
    isLargerDesktop,
    isTablet
  };
}
