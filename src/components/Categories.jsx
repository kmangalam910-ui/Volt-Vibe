import React from 'react';
import useCategoriesLogic from '../hooks/useCategoriesLogic';
import { 
  LayoutGrid, 
  Cpu, 
  Layers, 
  HardDrive, 
  CircuitBoard, 
  Database, 
  Monitor, 
  Box, 
  Mouse, 
  Keyboard, 
  Volume2, 
  Printer, 
  Laptop, 
  Headphones,
  Zap,
  Sparkles
} from 'lucide-react';

const getCategoryIcon = (category) => {
  const norm = (category || '').toUpperCase();
  switch (norm) {
    case 'ALL':
      return <LayoutGrid className="w-4 h-4" />;
    case 'CPU':
      return <Cpu className="w-4 h-4" />;
    case 'GPU':
      return <Layers className="w-4 h-4" />;
    case 'RAM':
      return <HardDrive className="w-4 h-4" />;
    case 'MOTHERBOARD':
      return <CircuitBoard className="w-4 h-4" />;
    case 'SSD':
      return <Database className="w-4 h-4" />;
    case 'PC':
      return <Monitor className="w-4 h-4" />;
    case 'CABINATE':
    case 'CABINET':
      return <Box className="w-4 h-4" />;
    case 'MOUSE':
      return <Mouse className="w-4 h-4" />;
    case 'KEYBOARD':
      return <Keyboard className="w-4 h-4" />;
    case 'SPEAKERS':
      return <Volume2 className="w-4 h-4" />;
    case 'PRINTERS':
      return <Printer className="w-4 h-4" />;
    case 'LAPTOP':
      return <Laptop className="w-4 h-4" />;
    case 'ACCESSORIES':
      return <Headphones className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

const Categories = () => {
  const { categoryOnlyData, activeCategory, handleCategoryClick } = useCategoriesLogic();

  return (
    <section className="bg-gradient-to-b from-[#0b1324] via-[#0f172a] to-[#0b1324] py-10 px-4 border-y border-slate-800/60 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
            <Zap className="w-3.5 h-3.5 text-red-500" />
            Explore Hardware
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Shop By Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Click any category below to instantly filter our high-performance component catalog
          </p>
        </div>

        {/* Categories Pills Container */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2">
          {categoryOnlyData.map((item, index) => {
            const isActive = activeCategory.toUpperCase() === item.toUpperCase();

            return (
              <button
                key={index}
                onClick={() => handleCategoryClick(item)}
                className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-400 scale-105'
                    : 'bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-red-500/60 hover:text-white hover:shadow-md hover:shadow-red-500/15 hover:scale-105 active:scale-95'
                }`}
              >
                <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-red-400'}`}>
                  {getCategoryIcon(item)}
                </span>
                <span>{item.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;