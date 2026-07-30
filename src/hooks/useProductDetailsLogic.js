import { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DataContext } from '../store/contextStore';
import { cartActions } from '../store/cartSlice';

export const generateCustomProductDetails = (product) => {
  if (!product) return null;

  const id = Number(product.id) || 1;
  const category = (product.category || 'ELECTRONICS').toUpperCase();

  let specs = [];
  let highlights = [];

  switch (category) {
    case 'CPU':
      specs = [
        { label: 'Cores / Threads', value: `${8 + (id % 8) * 2} Cores / ${16 + (id % 8) * 4} Threads` },
        { label: 'Base Clock', value: `${(3.2 + (id % 5) * 0.2).toFixed(1)} GHz` },
        { label: 'Boost Clock', value: `${(4.8 + (id % 6) * 0.1).toFixed(1)} GHz` },
        { label: 'Socket Type', value: id % 2 === 0 ? 'AM5' : 'LGA1700' },
        { label: 'TDP Power', value: `${65 + (id % 4) * 30}W` },
        { label: 'L3 Cache', value: `${32 + (id % 4) * 16} MB` },
      ];
      highlights = [
        'Advanced architecture engineered for gaming and heavy multi-tasking',
        'Native PCIe 5.0 and high-speed DDR5 dual-channel memory support',
        'Precision Boost Overdrive & Unlocked overclocking capability',
        'Includes Volt Vibe thermal dissipation tech'
      ];
      break;

    case 'GPU':
      specs = [
        { label: 'VRAM Capacity', value: `${8 + (id % 4) * 4} GB GDDR6X` },
        { label: 'Memory Bus', value: `${192 + (id % 3) * 64}-bit` },
        { label: 'Boost Clock', value: `${2450 + (id % 10) * 30} MHz` },
        { label: 'Video Outputs', value: '3x DisplayPort 1.4a, 1x HDMI 2.1' },
        { label: 'Recommended PSU', value: `${650 + (id % 4) * 100}W` },
        { label: 'Cooling System', value: 'Triple Fan Vapor Chamber' },
      ];
      highlights = [
        'Real-time Hardware Ray Tracing & AI Upscaling acceleration',
        'Dual BIOS for Silent and Extreme Performance modes',
        'Custom ARGB Lighting with Volt Sync support',
        'Reinforced aluminum structural backplate'
      ];
      break;

    case 'RAM':
      specs = [
        { label: 'Capacity', value: `${16 + (id % 3) * 16} GB Kit (2x${8 + (id % 3) * 8}GB)` },
        { label: 'Memory Type', value: id % 2 === 0 ? 'DDR5' : 'DDR4' },
        { label: 'Speed', value: `${5200 + (id % 5) * 400} MHz` },
        { label: 'Tested Latency', value: `CL${16 + (id % 4) * 2}` },
        { label: 'Working Voltage', value: '1.35V' },
        { label: 'Heat Spreader', value: 'Anodized Aircraft Aluminum' },
      ];
      highlights = [
        'Intel XMP 3.0 & AMD EXPO one-click overclocking profiles',
        'Hand-screened ICs for maximum stability and speed',
        'Dynamic multi-zone RGB lighting strip',
        'Limited Lifetime Manufacturer Warranty'
      ];
      break;

    case 'MOTHERBOARD':
      specs = [
        { label: 'Form Factor', value: 'ATX / Micro-ATX' },
        { label: 'Chipset', value: id % 2 === 0 ? 'AMD B650 / X670' : 'Intel Z790 / B760' },
        { label: 'Expansion Slots', value: '2x PCIe 5.0 x16, 2x PCIe 4.0 x1' },
        { label: 'Storage Support', value: '4x M.2 NVMe, 6x SATA 6Gb/s' },
        { label: 'Networking', value: 'Wi-Fi 6E + Bluetooth 5.3 + 2.5G LAN' },
        { label: 'Audio Codec', value: 'Realtek ALC4080 7.1 Surround Sound' },
      ];
      highlights = [
        'Heavy-duty VRM power stages with enlarged heatsinks',
        'Quick Release slot & tool-less M.2 latch mechanism',
        '2.5Gb Ethernet port for low-latency online gaming',
        'Pre-mounted I/O shield for effortless installation'
      ];
      break;

    case 'SSD':
      specs = [
        { label: 'Capacity', value: `${500 * (1 + (id % 4))} GB` },
        { label: 'Form Factor', value: 'M.2 2280 NVMe' },
        { label: 'Interface', value: 'PCIe Gen 4.0 x4' },
        { label: 'Sequential Read', value: `${5000 + (id % 5) * 500} MB/s` },
        { label: 'Sequential Write', value: `${4200 + (id % 5) * 400} MB/s` },
        { label: 'TBW Endurance', value: `${600 + (id % 3) * 600} TBW` },
      ];
      highlights = [
        'Lightning-fast PCIe Gen4 NVMe storage speed',
        'Graphene thermal pad for sustained high performance',
        'AES 256-bit hardware-based data encryption',
        '5-Year Limited Manufacturer Warranty'
      ];
      break;

    default:
      specs = [
        { label: 'Model Series', value: `Volt-Vibe Ultra ${id}` },
        { label: 'Category', value: product.category || 'Gear' },
        { label: 'Build Material', value: 'Premium Alloy & Ergonomic Polymer' },
        { label: 'Input Power', value: '100V - 240V Universal Input' },
        { label: 'Warranty Period', value: '2 Years Official Coverage' },
        { label: 'Certifications', value: 'CE, FCC, RoHS Compliant' },
      ];
      highlights = [
        'Designed with premium materials for maximum durability',
        'Plug & play compatibility with universal standard connectors',
        'Energy Star certified efficient power usage',
        'Includes Volt Vibe premium protective packaging'
      ];
      break;
  }

  const rating = (4.5 + (id % 5) * 0.1).toFixed(1);
  const reviewsCount = 85 + (id * 13) % 240;
  const stockCount = (id % 12) + 2;
  const isLowStock = stockCount <= 4;
  const sku = `VV-PRD-${1000 + id}`;

  return {
    specs,
    highlights,
    rating,
    reviewsCount,
    stockCount,
    isLowStock,
    sku,
    brand: 'Volt Vibe Tech',
    warranty: '2-Year Official Warranty',
    returnPolicy: '30 Days Money Back Guarantee'
  };
};

const useProductDetailsLogic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, fetchProducts } = useContext(DataContext);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAdded, setIsAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
    setIsAdded(false);
    setShowToast(false);
    setActiveTab('overview');
  }, [id]);

  const product = products.find((p) => String(p.id) === String(id));
  const customDetails = generateCustomProductDetails(product);

  const relatedProducts = products
    .filter((p) => p.category === product?.category && String(p.id) !== String(id))
    .slice(0, 4);

  const handleIncrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(cartActions.addToCart({ ...product, quantity }));
    
    setIsAdded(true);
    setShowToast(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsAdded(false);
      setShowToast(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    navigate('/checkout', { state: { directItem: { ...product, quantity } } });
  };

  return {
    product,
    customDetails,
    relatedProducts,
    quantity,
    activeTab,
    setActiveTab,
    isAdded,
    showToast,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleAddToCart,
    handleBuyNow,
    navigate
  };
};

export default useProductDetailsLogic;
