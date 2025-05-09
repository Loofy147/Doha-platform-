// src/components/sections/client-contact-section.tsx
'use client';

import { ContactSection } from './contact-section';
// Removed motion import as ContactSection's root is now a motion component

export default function ClientContactSection() {
  // ContactSection now handles its own top-level animation
  return <ContactSection />;
}
