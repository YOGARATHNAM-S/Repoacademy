import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';
import RINGS_MODULE from 'vanta/dist/vanta.rings.min';

// Fix for Vanta.js requiring global THREE object
window.THREE = window.THREE || THREE;

// Handle both ESM default and CJS module.exports patterns
const RINGS = RINGS_MODULE.default || RINGS_MODULE;

export default function VantaBackground() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!vantaRef.current) return;

    // Destroy previous effect before creating a new one
    if (vantaEffect.current) {
      vantaEffect.current.destroy();
      vantaEffect.current = null;
    }

    const isDark = theme === 'dark';

    try {
      vantaEffect.current = RINGS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: isDark ? 0x020617 : 0xf1f5f9,
        color: isDark ? 0x7c3aed : 0x8b5cf6,
        color2: isDark ? 0x6366f1 : 0xa78bfa,
      });
    } catch (e) {
      console.warn('Vanta RINGS failed to initialize:', e);
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [theme]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
