'use client';

import { useState } from 'react';
import { Contact } from './Contact';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormError('');

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch {
      setFormStatus('error');
      setFormError('Failed to send message. Please try again.');
    }
  };

  return (
    <Contact
      formData={formData}
      formStatus={formStatus}
      formError={formError}
      onSubmit={handleSubmit}
      onFormDataChange={setFormData}
    />
  );
}
