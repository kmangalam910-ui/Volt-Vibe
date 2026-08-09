import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import useAboutLogic from '../hooks/useAboutLogic';
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

const About = () => {
  const { stats, values, milestones, team } = useAboutLogic();

  return (
    <div className='min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between font-sans'>
      <main className='grow'>
        {/* Hero Section */}
        <section className='relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8'>
          <div className='absolute inset-0 bg-radial from-red-600/20 via-transparent to-transparent opacity-60 pointer-events-none' />
          <div className='max-w-7xl mx-auto relative z-10 text-center'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md'>
              <Sparkles className='w-4 h-4' /> Empowering Your Digital Lifestyle
            </div>
            <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight mb-6'>
              Welcome to <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-amber-400'>Volt Vibe</span>
            </h1>
            <p className='max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed mb-8'>
              We are on a mission to power your world with state-of-the-art electronics, high-fidelity audio, smart devices, and accessories that spark joy and elevate everyday living.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Link 
                to='/products' 
                className='inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300'
              >
                Explore Collection <ArrowRight className='w-5 h-5' />
              </Link>
              <Link 
                to='/contact' 
                className='inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 px-7 py-3.5 rounded-full font-semibold transition-all duration-300'
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className='bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300'>
                  <div className={`p-3 rounded-xl bg-gray-50 ${stat.color} mb-3`}>
                    <IconComp className='w-7 h-7' />
                  </div>
                  <h3 className='text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1'>{stat.value}</h3>
                  <p className='text-xs sm:text-sm font-medium text-gray-500'>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Story Section */}
        <section className='py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <div className='inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-wider text-xs bg-red-50 px-3 py-1 rounded-full'>
                <Award className='w-4 h-4' /> Who We Are
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 leading-tight'>
                Passionate About Tech. Driven by Quality and Innovation.
              </h2>
              <p className='text-gray-600 leading-relaxed text-base sm:text-lg'>
                Founded with a vision to redefine the electronics shopping experience, <strong className='text-gray-900 font-semibold'>Volt Vibe</strong> brings together cutting-edge design, uncompromised performance, and unbeatable value.
              </p>
              <p className='text-gray-600 leading-relaxed text-base'>
                Whether you're upgrading your workspace setup, seeking immersive noise-canceling headphones, or discovering smart home gear, every item in our collection is rigorously tested for reliability and tech excellence.
              </p>
              
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-red-500 shrink-0 mt-1' />
                  <div>
                    <h4 className='font-bold text-gray-900 text-sm'>Curated Selection</h4>
                    <p className='text-xs text-gray-500 mt-0.5'>Only top-rated, certified devices</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-red-500 shrink-0 mt-1' />
                  <div>
                    <h4 className='font-bold text-gray-900 text-sm'>Fast & Secure Checkout</h4>
                    <p className='text-xs text-gray-500 mt-0.5'>Encrypted 256-bit safe payments</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-red-500 shrink-0 mt-1' />
                  <div>
                    <h4 className='font-bold text-gray-900 text-sm'>Hassle-Free Returns</h4>
                    <p className='text-xs text-gray-500 mt-0.5'>30-day money-back guarantee</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-red-500 shrink-0 mt-1' />
                  <div>
                    <h4 className='font-bold text-gray-900 text-sm'>Expert Support</h4>
                    <p className='text-xs text-gray-500 mt-0.5'>Real humans ready to assist you</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='relative'>
              <div className='relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white'>
                <img 
                  src='https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' 
                  alt='Volt Vibe Tech Team'
                  className='w-full h-112 object-cover hover:scale-105 transition duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8'>
                  <div className='text-white'>
                    <div className='text-xs font-bold uppercase tracking-wider text-red-400 mb-1'>Global HQ & Innovation Hub</div>
                    <p className='text-lg font-semibold'>Engineered for tech enthusiasts, built for performance.</p>
                  </div>
                </div>
              </div>
              <div className='absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs'>
                <p className='text-3xl font-extrabold mb-1'>5+ Years</p>
                <p className='text-xs text-red-100 font-medium'>Delivering cutting-edge gadgetry & electronic excellence worldwide.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className='bg-gray-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4'>Our Core Values</h2>
              <p className='text-gray-600 text-base sm:text-lg'>
                The guiding principles behind every decision we make, product we stock, and customer interaction we have.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {values.map((val, idx) => {
                const ValIcon = val.icon;
                return (
                  <div 
                    key={idx} 
                    className={`bg-white p-8 rounded-2xl border ${val.gradient} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
                  >
                    <div>
                      <div className='w-12 h-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center mb-6 font-bold'>
                        <ValIcon className='w-6 h-6' />
                      </div>
                      <h3 className='text-xl font-bold text-gray-900 mb-3'>{val.title}</h3>
                      <p className='text-sm text-gray-600 leading-relaxed'>{val.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline / Milestones */}
        <section className='py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <span className='text-xs font-bold uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full'>Our Journey</span>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-4'>Milestones of Volt Vibe</h2>
            <p className='text-gray-600 text-base'>How we grew from a small passion project into a premier electronics brand.</p>
          </div>

          <div className='relative border-l-2 border-red-200 ml-4 md:ml-32 space-y-12'>
            {milestones.map((ms, idx) => (
              <div key={idx} className='relative pl-8 md:pl-12 group'>
                {/* Bullet badge */}
                <div className='absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-red-500 border-4 border-white shadow flex items-center justify-center text-white text-xs font-bold group-hover:scale-125 transition duration-300' />
                
                <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 max-w-2xl'>
                  <span className='inline-block px-3 py-1 bg-red-50 text-red-600 font-extrabold text-xs rounded-md mb-2'>
                    {ms.year}
                  </span>
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>{ms.title}</h3>
                  <p className='text-sm text-gray-600 leading-relaxed'>{ms.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className='bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4'>Meet the People Behind Volt Vibe</h2>
              <p className='text-gray-600 text-base'>Driven by a shared love for technology, design, and exceptional customer service.</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {team.map((member, idx) => (
                <div key={idx} className='bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group'>
                  <div className='relative h-64 overflow-hidden'>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className='w-full h-full object-cover group-hover:scale-105 transition duration-500' 
                    />
                    <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium'>
                      {member.tag}
                    </div>
                  </div>
                  <div className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900'>{member.name}</h3>
                    <p className='text-sm font-semibold text-red-500 mb-3'>{member.role}</p>
                    <p className='text-xs text-gray-600 leading-relaxed'>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Banner / CTA */}
        <section className='bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-5xl mx-auto text-center'>
            <h2 className='text-3xl sm:text-4xl font-extrabold mb-4'>Ready to Upgrade Your Tech Experience?</h2>
            <p className='text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto'>
              Discover our newest lineup of premium gadgets, wireless audio, smart wearables, and gaming essentials.
            </p>
            <Link 
              to='/products'
              className='inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-base shadow-xl hover:scale-105 transition-all duration-300'
            >
              Shop All Products Now <ArrowRight className='w-5 h-5' />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

