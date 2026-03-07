# Redwater Revenue Site - Agent Brief

Quick reference for Claude agents working on this codebase.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| SEO | react-helmet-async |
| Animations | Custom MotionWrapper (Framer Motion style) |
| Hosting | GitHub Pages (auto-deploy via Actions) |

## File Structure

```
App.tsx          # All routes, components, pages (single-file app)
constants.tsx    # NAV_ITEMS, PILLARS, SERVICES_DATA, FAQS, etc.
index.tsx        # React entry point
index.html       # HTML shell
public/          # Static assets (images, robots.txt, sitemap.xml)
```

## Routes

| Path | Component | Indexed |
|------|-----------|---------|
| `/` | HomePage | Yes |
| `/services/:serviceId` | ServicePage | Yes |
| `/book` | BookPage | No |
| `/precall` | PreCallPage | No |
| `/privacy` | PrivacyPage | No |
| `/terms` | TermsPage | No |

## Lead Capture Webhook

All forms POST to GoHighLevel:
```
https://services.leadconnectorhq.com/hooks/11am6QHObrEmx0qnQg7g/webhook-trigger/f67e2e01-2427-4cd4-b9c2-3ae8861dd8f0
```

**Payload:**
```json
{
  "company": "string",
  "name": "string",
  "phone": "string",
  "email": "string",
  "source": "Modal Form - home | Footer Form - home | Book Page | etc.",
  "smsConsent": true/false,
  "timestamp": "ISO string"
}
```

After form submit, redirects to booking calendar:
```
https://link.redwaterrev.com/widget/bookings/redwaterrev/demo
```

## SEO Patterns

### Indexed Pages
Use the `SEOHead` component:
```tsx
<SEOHead
  title="Page Title"
  description="Meta description"
  canonical="/path"
  structuredData={schemaObject}  // optional
/>
```

### Non-Indexed Pages (book, precall, privacy, terms)
Use Helmet directly with noindex:
```tsx
<Helmet>
  <title>Page Title | Redwater Revenue</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
</Helmet>
```

### Structured Data
- HomePage: Organization schema + FAQPage schema
- ServicePage: Service schema

## Brand Guidelines

### Colors
| Name | Tailwind | Hex |
|------|----------|-----|
| Primary Red | `red-600` | #DC2626 |
| Accent Red | `red-500` | #EF4444 |
| Dark BG | `slate-900` | #0F172A |
| Card BG | `white` | #FFFFFF |
| Body Text | `slate-600` | #475569 |
| Muted Text | `slate-400` | #94A3B8 |

### Typography
- Headings: `font-extrabold` or `font-black`
- Body: `font-medium` or default
- Uppercase labels: `text-xs font-bold uppercase tracking-wider`

### Components
- Cards: `rounded-2xl` or `rounded-3xl`, `shadow-sm` to `shadow-2xl`
- Buttons: `rounded-xl`, red or slate bg
- Sections: `py-24` vertical padding

## Adding a New Page

1. Create component above `export default App`:
```tsx
const NewPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Title | Redwater Revenue</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-white pt-28 pb-16">
        {/* Content */}
      </div>
    </>
  );
};
```

2. Add route in the `<Routes>` block:
```tsx
<Route path="/new-page" element={<NewPage />} />
```

3. Commit and push - GitHub Actions deploys automatically.

## Legal Entity

- **Company:** Red Water LLC
- **Owners:** Nick Rougeau, Jack Rougeau
- **Contact:** nick@redwaterrev.com
- **Jurisdiction:** Louisiana, USA

## SMS Compliance

Forms include optional SMS consent checkbox. Privacy policy at `/privacy` contains full TCPA/CTIA compliance language including:
- STOP to opt out
- HELP for assistance
- Message frequency disclosure
- Consent not required for purchase