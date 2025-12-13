import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  icon?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  icon = false,
  type = "button",
  disabled = false
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // White text on Orange gradient background
    primary: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_35px_rgba(234,88,12,0.6)] hover:scale-[1.02]",
    
    // Dark transparent with orange border
    secondary: "bg-slate-900/80 backdrop-blur-sm text-slate-200 border border-slate-700 hover:border-accent-500 hover:text-white hover:bg-slate-800",
    
    ghost: "bg-transparent text-slate-400 hover:text-accent-400"
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative flex items-center gap-2 z-10">
        {children}
        {icon && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -z-0 bg-gradient-to-r from-accent-400 via-white/20 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
      )}
      {/* Shine effect */}
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer" />
      )}
    </motion.button>
  );
};