import { useEffect } from 'react';

const useTheme = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      document.body.classList.remove('ion-color-light', 'ion-color-dark');
      document.body.classList.add(storedTheme);
    }
  }, []);
};

export default useTheme;