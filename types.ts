
import React from 'react';

export interface FoundationPillar {
  title: string;
  painPoint: string;
  solution: string;
  icon: React.ReactNode;
  serviceId?: string;
}

export interface ProofPoint {
  stat: string;
  description: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
  isService?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServicePageData {
  id: string;
  title: string;
  tagline: string;
  dropdownDescription: string;
  stats: ServiceStat[];
  description: string;
  features: {
    title: string;
    text: string;
    icon: React.ReactNode;
  }[];
  videoUrl?: string;
}
