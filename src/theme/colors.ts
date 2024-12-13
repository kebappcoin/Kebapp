export const colors = {
  brand: '#FAC515',
  background: {
    primary: '#0a0b0d',
    secondary: '#1a1b1e',
    tertiary: '#2a2b2e',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    brand: '#FAC515',
  },
  border: {
    primary: 'rgba(250, 197, 21, 0.2)',
    secondary: 'rgba(250, 197, 21, 0.1)',
  },
  gradient: {
    brand: ['#FAC515', '#FDE68A'],
    dark: ['#0a0b0d', '#1a1b1e'],
  },
} as const;

export const getContrastColor = (bgColor: string) => {
  // Convert hex to RGB
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};