'use strict';

/**
 * Tiny colour helpers used to derive readable tokens from the admin-selected
 * theme colours (contrast-safe text, rgb triplets for translucent tints).
 */

interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Parses `#abc`, `#aabbcc` or `rgb()/rgba()` strings. Returns null when unusable. */
export function parseColor(color?: string | null): Rgb | null {
  if (!color) return null;
  const value = color.trim();

  const hexMatch = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  const rgbMatch = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(value);
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
  }

  return null;
}

/** WCAG relative luminance (0 = black, 1 = white). */
export function luminance(color?: string | null): number {
  const rgb = parseColor(color);
  if (!rgb) return 1;
  const channel = (raw: number) => {
    const c = Math.min(Math.max(raw, 0), 255) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

export function isLightColor(color?: string | null): boolean {
  return luminance(color) > 0.45;
}

/** Picks dark or light ink so text stays readable on top of `color`. */
export function readableInk(color: string | null | undefined, dark = '#0f172a', light = '#ffffff'): string {
  return isLightColor(color) ? dark : light;
}

/** `"15 81 50"` — usable inside `rgb(var(--primary-rgb) / 0.12)`. */
export function rgbTriplet(color: string | null | undefined, fallback = '15 81 50'): string {
  const rgb = parseColor(color);
  if (!rgb) return fallback;
  return `${Math.round(rgb.r)} ${Math.round(rgb.g)} ${Math.round(rgb.b)}`;
}
