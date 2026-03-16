// Base palette
export const BASE_PALETTE = {
  paleSky: '#B9D6F2',
  prussianBlue: '#061A40',
  sapphire: '#0353A4',
  cornflowerOcean: '#006DAA',
  deepSpaceBlue: '#003559',
} as const;

// Semantic color system
export const COLORS = {
  // Primary ocean blues (from palette)
  primary: '#006DAA',        // Cornflower Ocean
  secondary: '#0353A4',      // Sapphire
  accent: '#B9D6F2',         // Pale Sky
  
  // Financial semantic colors
  income: '#10b981',         // Emerald (success)
  expense: '#ef4444',        // Red (danger)
  budget: '#f59e0b',         // Amber (warning)
  savings: '#006DAA',        // Cornflower Ocean
  investment: '#0353A4',     // Sapphire
  ai: '#B9D6F2',            // Pale Sky (AI features)
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#006DAA',
} as const;

// Chart colors for Recharts
export const CHART_COLORS = [
  '#006DAA', // Cornflower Ocean (primary)
  '#0353A4', // Sapphire (secondary)
  '#10b981', // Emerald (positive)
  '#ef4444', // Red (negative)
  '#f59e0b', // Amber (warning)
  '#B9D6F2', // Pale Sky (neutral)
  '#22d3ee', // Cyan (additional)
  '#fb923c', // Orange (additional)
];

// Extended blue shades for gradients/variations
export const BLUE_SHADES = {
  50: '#B9D6F2',   // Pale Sky
  100: '#A0C8ED',
  200: '#87BAE8',
  300: '#6EACE3',
  400: '#3B8DD0',
  500: '#006DAA',  // Cornflower Ocean
  600: '#0353A4',  // Sapphire
  700: '#003559',  // Deep Space Blue
  800: '#062340',
  900: '#061A40',  // Prussian Blue
};

/**
 * Get transaction type color
 */
export function getTransactionColor(type: 'income' | 'expense') {
  return type === 'income' ? COLORS.income : COLORS.expense;
}

/**
 * Get badge classes for transaction type
 */
export function getBadgeClasses(type: 'income' | 'expense') {
  return type === 'income'
    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    : 'bg-red-500/10 text-red-400 border border-red-500/20';
}

/**
 * Get status color class
 */
export function getStatusColor(status: 'success' | 'warning' | 'danger' | 'info') {
  const colors = {
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    danger: 'text-red-400',
    info: 'text-blue-400',
  };
  return colors[status];
}

/**
 * Get progress bar color based on percentage
 */
export function getProgressColor(percentage: number) {
  if (percentage >= 90) return 'bg-red-500';
  if (percentage >= 70) return 'bg-amber-500';
  if (percentage >= 50) return 'bg-yellow-500';
  return 'bg-emerald-500';
}

/**
 * Get budget status color
 */
export function getBudgetStatus(percentage: number): {
  color: string;
  bgClass: string;
  textClass: string;
  label: string;
} {
  if (percentage >= 100) {
    return {
      color: COLORS.danger,
      bgClass: 'bg-red-500',
      textClass: 'text-red-400',
      label: 'Exceeded',
    };
  }
  if (percentage >= 80) {
    return {
      color: COLORS.warning,
      bgClass: 'bg-amber-500',
      textClass: 'text-amber-400',
      label: 'Warning',
    };
  }
  if (percentage >= 50) {
    return {
      color: COLORS.info,
      bgClass: 'bg-blue-500',
      textClass: 'text-blue-400',
      label: 'On Track',
    };
  }
  return {
    color: COLORS.success,
    bgClass: 'bg-emerald-500',
    textClass: 'text-emerald-400',
    label: 'Good',
  };
}