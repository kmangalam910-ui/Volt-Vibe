import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const CONTACT_EMAIL = "kmangalam910@gmail.com";

const contactCards = [
  {
    icon: Mail,
    title: 'Email Us Direct',
    subtext: 'Our team replies within 2 hours',
    value: CONTACT_EMAIL,
    action: `mailto:${CONTACT_EMAIL}`,
    actionText: 'Send Email'
  },
  {
    icon: Phone,
    title: 'Customer Phone Line',
    subtext: 'Toll-Free Support Line',
    value: '+1 (800) 865-8842',
    action: 'tel:+18008658842',
    actionText: 'Call Support'
  },
  {
    icon: MapPin,
    title: 'Global Headquarters',
    subtext: 'Volt Vibe Electronics Inc.',
    value: '123 Electronics St, Style City, NY 10001',
    action: 'https://maps.google.com',
    actionText: 'Get Directions'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    subtext: 'Customer Care Desk',
    value: 'Mon - Sat: 9:00 AM - 8:00 PM EST',
    action: null,
    actionText: 'Open Now'
  }
];

const faqs = [
  {
    q: "How can I track my Volt Vibe order?",
    a: "Once your order is dispatched, you will receive a tracking link via email and SMS. You can also view live order progress under your Account Order History."
  },
  {
    q: "What is your return & warranty policy?",
    a: "We offer a 30-day hassle-free return window on all unused items in original packaging. Every device comes with a minimum 1-Year official Volt Vibe Manufacturer Warranty."
  },
  {
    q: "How fast will my order arrive?",
    a: "Standard shipping takes 2-4 business days. Priority Express shipping arrives within 24-48 hours. Orders over $100 qualify for free standard shipping!"
  },
  {
    q: "Are all electronics original & genuine?",
    a: "Yes! 100% guaranteed authentic. We source directly from authorized manufacturers and verified electronic distributors."
  }
];

const quickTopics = [
  "Order Tracking",
  "Warranty Claim",
  "Product Inquiry",
  "Returns & Refunds",
  "Wholesale Inquiry"
];

const useContactLogic = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Tracking',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (formError) setFormError('');
  };

  const handleTopicSelect = (topic) => {
    setFormData(prev => ({
      ...prev,
      subject: topic
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const toggleFaq = (idx) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  const resetFormSubmission = () => {
    setSubmittedData(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in your Name, Email, and Message.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Order Tracking',
        message: ''
      });
    }, 900);
  };

  return {
    CONTACT_EMAIL,
    contactCards,
    faqs,
    quickTopics,
    formData,
    copiedEmail,
    openFaq,
    isSubmitting,
    submittedData,
    formError,
    handleChange,
    handleTopicSelect,
    handleCopyEmail,
    toggleFaq,
    resetFormSubmission,
    handleSubmit
  };
};

export default useContactLogic;
