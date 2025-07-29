import type { NavItem } from '../_types'

// Navigation constants
export const NAV_ITEMS: readonly NavItem[] = [
  { href: '#about', label: 'About' },
  { href: '#explore', label: 'Explore' },
  { href: '#getstarted', label: 'Get Started' },
  { href: '#whatsnew', label: "What's New" },
  { href: '#world', label: 'World' },
  { href: '#insights', label: 'Insights' },
] as const 