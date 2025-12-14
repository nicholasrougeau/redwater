import React from 'react';
import { Hero } from '../sections/Hero';
import { Problems } from '../sections/Problems';
import { Solutions } from '../sections/Solutions';
import { Results } from '../sections/Results';
import { RevenueCalculator } from '../sections/RevenueCalculator';
import { CTA } from '../sections/CTA';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Problems />
      <Solutions />
      <Results />
      <RevenueCalculator />
      <div id="cta">
        <CTA />
      </div>
    </>
  );
};
