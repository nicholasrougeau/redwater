import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface StatProps {
  label: string;
  value: string;
  subtext: string;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}