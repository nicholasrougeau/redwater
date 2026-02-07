/**
 * Post-build script to generate static HTML files for SPA routes
 * This ensures GitHub Pages serves 200 status (not 404) for service pages
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// Service page IDs - must match SERVICES_DATA in constants.tsx
const serviceIds = [
  'functional-website',
  'missed-call-text-back',
  'all-in-one-inbox',
  'business-phone',
  'local-seo',
  'review-funnel',
  'one-click-marketing',
  'lead-follow-up'
];

// Read the built index.html
const indexPath = join(distDir, 'index.html');
if (!existsSync(indexPath)) {
  console.error('Error: dist/index.html not found. Run build first.');
  process.exit(1);
}

const indexHtml = readFileSync(indexPath, 'utf-8');

// Create service page directories and copy index.html
const servicesDir = join(distDir, 'services');
if (!existsSync(servicesDir)) {
  mkdirSync(servicesDir, { recursive: true });
}

for (const serviceId of serviceIds) {
  const serviceDir = join(servicesDir, serviceId);
  if (!existsSync(serviceDir)) {
    mkdirSync(serviceDir, { recursive: true });
  }

  const servicePath = join(serviceDir, 'index.html');
  writeFileSync(servicePath, indexHtml);
  console.log(`Created: /services/${serviceId}/index.html`);
}

console.log(`\nGenerated ${serviceIds.length} service pages for SPA routing.`);
