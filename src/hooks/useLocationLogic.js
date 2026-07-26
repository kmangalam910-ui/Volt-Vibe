import { useCallback, useState } from 'react';
import axios from 'axios';

const useLocationLogic = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [location, setLocation] = useState(null);

  const getLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = new Error('Geolocation is not supported by this browser.');
        console.error(err);
        reject(err);
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
          const response = await axios.get(url);
          const exactLocation = response.data.address;
          setLocation(exactLocation);
          setOpenDropdown(false);
          resolve(exactLocation);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      }, (err) => {
        console.error(err);
        reject(err);
      });
    });
  }, []);

  return {
    location,
    getLocation,
    openDropdown,
    setOpenDropdown,
  };
};

export default useLocationLogic;
