import { useState } from 'react';

const useAddressLogic = ({ location, getLocation, setOpenDropdown, openDropdown }) => {
  const [showLocation, setShowLocation] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [savedAddress, setSavedAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
    setManualAddress('');
  };

  const getShowLocation = async () => {
    try {
      setIsLoading(true);
      const loc = await getLocation();
      if (loc) {
        setShowLocation(true);
        setSavedAddress('');
      }
    } catch (err) {
      // swallow - getLocation already logs
    } finally {
      setIsLoading(false);
      setOpenDropdown(false);
      setManualAddress('');
    }
  };

  const handleManualAddress = async (e) => {
    e.preventDefault();
    const trimmedAddress = manualAddress.trim();
    if (!trimmedAddress) return;

    setIsLoading(true);
    // simulate a small delay for UX, or could be replaced with an API call
    await new Promise((r) => setTimeout(r, 350));
    setSavedAddress(trimmedAddress);
    setShowLocation(false);
    setOpenDropdown(false);
    setManualAddress('');
    setIsLoading(false);
  };

  const locationText = savedAddress || (showLocation && location ? [location.county, location.state].filter(Boolean).join(', ') : 'Add Address');

  return {
    manualAddress,
    setManualAddress,
    locationText,
    isLoading,
    toggleDropdown,
    closeDropdown,
    getShowLocation,
    handleManualAddress,
  };
};

export default useAddressLogic;
