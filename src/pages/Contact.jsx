import React from 'react';
import Footer from '../components/Footer';
import useContactLogic from '../hooks/useContactLogic';
import { 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  ShieldCheck, 
  Headphones, 
  Sparkles,
  Copy,
  Check,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

const Contact = () => {
  const {
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
  } = useContactLogic();

  return (
    <div className='min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between font-sans'>
      <main className='grow'>
        {/* Header Hero Section */}
        <section className='relative bg-gray-900 text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden'>
          <div className='absolute inset-0 bg-radial from-red-600/20 via-transparent to-transparent opacity-60 pointer-events-none' />
          <div className='max-w-7xl mx-auto text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-md'>
              <Headphones className='w-4 h-4' /> 24/7 Dedicated Support
            </div>
            <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight mb-4'>
              Get in Touch with <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-amber-400'>Volt Vibe</span>
            </h1>
            <p className='max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed mb-6'>
              Have a question about a product, order status, or need expert tech advice? We're here to help you every step of the way.
            </p>
            <div className='inline-flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-xl text-xs sm:text-sm text-gray-300 border border-gray-700'>
              <span className='w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse' />
              Official Contact Email: <strong className='text-white'>{CONTACT_EMAIL}</strong>
              <button 
                onClick={handleCopyEmail}
                className='ml-2 text-gray-400 hover:text-white transition cursor-pointer'
                title='Copy email address'
              >
                {copiedEmail ? <Check className='w-4 h-4 text-emerald-400' /> : <Copy className='w-4 h-4' />}
              </button>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {contactCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <div key={idx} className='bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300'>
                  <div>
                    <div className='w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 font-bold'>
                      <IconComponent className='w-6 h-6' />
                    </div>
                    <h3 className='text-lg font-bold text-gray-900 mb-1'>{card.title}</h3>
                    <p className='text-xs text-gray-500 mb-3'>{card.subtext}</p>
                    <p className='text-sm font-semibold text-gray-800 break-words mb-4'>{card.value}</p>
                  </div>
                  {card.action ? (
                    <a 
                      href={card.action}
                      target={card.action.startsWith('http') ? '_blank' : '_self'}
                      rel='noreferrer'
                      className='inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-red-600 text-white text-xs font-bold transition duration-300 text-center'
                    >
                      {card.actionText}
                    </a>
                  ) : (
                    <span className='inline-flex items-center justify-center w-full py-2 px-4 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold text-center border border-emerald-200'>
                      ● Open Now
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Section: Form + Direct Help Info */}
        <section className='py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            {/* Left Column: Interactive Contact Form (7 cols) */}
            <div className='lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm'>
              <div className='mb-8'>
                <div className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full mb-3'>
                  <MessageSquare className='w-4 h-4' /> Send Us a Message
                </div>
                <h2 className='text-2xl sm:text-3xl font-extrabold text-gray-900'>How Can We Help You Today?</h2>
                <p className='text-sm text-gray-500 mt-1'>
                  Fill out the form below. Inquiries are automatically dispatched to <span className='font-semibold text-gray-800'>{CONTACT_EMAIL}</span>.
                </p>
              </div>

              {submittedData ? (
                <div className='bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fadeIn'>
                  <div className='w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md'>
                    <CheckCircle2 className='w-8 h-8' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900'>Thank You, {submittedData.name}!</h3>
                  <p className='text-sm text-gray-600 leading-relaxed max-w-md mx-auto'>
                    Your message regarding <strong className='text-gray-900'>"{submittedData.subject}"</strong> has been successfully received. A copy of your inquiry has been queued for dispatch to <strong className='text-gray-900'>{CONTACT_EMAIL}</strong>.
                  </p>
                  <div className='bg-white p-4 rounded-xl border border-emerald-100 text-left text-xs space-y-2 text-gray-700'>
                    <p><strong>Submitted Email:</strong> {submittedData.email}</p>
                    {submittedData.phone && <p><strong>Phone:</strong> {submittedData.phone}</p>}
                    <p><strong>Message Snippet:</strong> {submittedData.message.slice(0, 100)}...</p>
                  </div>
                  <button 
                    onClick={resetFormSubmission}
                    className='inline-flex items-center justify-center bg-gray-900 hover:bg-red-600 text-white px-6 py-2.5 rounded-full text-xs font-bold transition duration-300 cursor-pointer'
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  {formError && (
                    <div className='p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium'>
                      {formError}
                    </div>
                  )}

                  {/* Topic selection pills */}
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>
                      Select Subject Category
                    </label>
                    <div className='flex flex-wrap gap-2'>
                      {quickTopics.map((topic, idx) => (
                        <button
                          key={idx}
                          type='button'
                          onClick={() => handleTopicSelect(topic)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                            formData.subject === topic
                              ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label htmlFor='name' className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5'>
                        Full Name *
                      </label>
                      <input 
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='John Doe'
                        className='w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white'
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor='email' className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5'>
                        Your Email Address *
                      </label>
                      <input 
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='john@example.com'
                        className='w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white'
                        required
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label htmlFor='phone' className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5'>
                        Phone Number (Optional)
                      </label>
                      <input 
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='+1 (555) 000-0000'
                        className='w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white'
                      />
                    </div>

                    <div>
                      <label htmlFor='subject' className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5'>
                        Subject Topic
                      </label>
                      <input 
                        type='text'
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        className='w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white'
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='message' className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5'>
                      Your Message *
                    </label>
                    <textarea 
                      id='message'
                      name='message'
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder='Write your message, question, or order inquiry here...'
                      className='w-full p-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white'
                      required
                    />
                  </div>

                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold text-base shadow-lg shadow-red-500/25 transition cursor-pointer disabled:opacity-50'
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className='w-5 h-5' /> Submit Inquiry
                      </>
                    )}
                  </button>
                  <p className='text-xs text-center text-gray-400'>
                    Your form submission will be routed directly to support at <span className='text-gray-600 font-medium'>{CONTACT_EMAIL}</span>.
                  </p>
                </form>
              )}
            </div>

            {/* Right Column: HQ Office Card & Contact Guarantees (5 cols) */}
            <div className='lg:col-span-5 space-y-6'>
              {/* Official Contact Info Card */}
              <div className='bg-gray-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden'>
                <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-red-600/20 rounded-full blur-2xl pointer-events-none' />
                <h3 className='text-2xl font-bold mb-4 flex items-center gap-2'>
                  <Sparkles className='w-6 h-6 text-red-500' /> Volt Vibe HQ
                </h3>
                <p className='text-sm text-gray-300 leading-relaxed mb-6'>
                  Our main office and tech display hub is located in the heart of Style City. Drop by during business hours or send us a quick mail.
                </p>

                <div className='space-y-4 text-sm'>
                  <div className='flex items-start gap-3'>
                    <MapPin className='w-5 h-5 text-red-500 shrink-0 mt-0.5' />
                    <div>
                      <p className='font-bold text-white'>Physical Address</p>
                      <p className='text-gray-300 text-xs mt-0.5'>123 Electronics St, Style City, NY 10001</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <Mail className='w-5 h-5 text-red-500 shrink-0 mt-0.5' />
                    <div>
                      <p className='font-bold text-white'>Official Email</p>
                      <a href={`mailto:${CONTACT_EMAIL}`} className='text-red-400 hover:underline text-xs mt-0.5 block font-mono'>
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <Phone className='w-5 h-5 text-red-500 shrink-0 mt-0.5' />
                    <div>
                      <p className='font-bold text-white'>Telephone</p>
                      <p className='text-gray-300 text-xs mt-0.5'>+1 (800) 865-8842 / (123) 456-7890</p>
                    </div>
                  </div>
                </div>

                <div className='mt-8 pt-6 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400'>
                  <span>Avg Response: &lt; 2 Hours</span>
                  <span className='text-emerald-400 font-medium'>● Online & Active</span>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className='bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4'>
                <h4 className='font-bold text-gray-900 text-lg flex items-center gap-2'>
                  <ShieldCheck className='w-5 h-5 text-red-500' /> Support Assurances
                </h4>
                <div className='space-y-3 text-xs text-gray-600'>
                  <div className='flex items-start gap-2.5'>
                    <CheckCircle2 className='w-4 h-4 text-red-500 shrink-0 mt-0.5' />
                    <span><strong>100% Privacy Protection:</strong> We never share or sell your email address.</span>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <CheckCircle2 className='w-4 h-4 text-red-500 shrink-0 mt-0.5' />
                    <span><strong>Direct Technical Support:</strong> Speak directly with certified hardware experts.</span>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <CheckCircle2 className='w-4 h-4 text-red-500 shrink-0 mt-0.5' />
                    <span><strong>Fast Resolutions:</strong> 98% of inquiries resolved within 24 hours.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className='bg-gray-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <span className='text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full'>
                Got Questions?
              </span>
              <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-2'>
                Frequently Asked Questions
              </h2>
              <p className='text-gray-600 text-sm sm:text-base'>
                Quick answers to common questions about orders, shipping, returns, and warranties.
              </p>
            </div>

            <div className='space-y-4'>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className='bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition duration-200'
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className='w-full p-6 text-left flex justify-between items-center font-bold text-gray-900 text-base sm:text-lg hover:text-red-600 transition cursor-pointer'
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className='w-5 h-5 text-red-500 shrink-0 ml-4' />
                      ) : (
                        <ChevronDown className='w-5 h-5 text-gray-400 shrink-0 ml-4' />
                      )}
                    </button>
                    {isOpen && (
                      <div className='px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4'>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
