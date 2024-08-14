import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
	const savedFavorites = localStorage.getItem('favorites');
	return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
	localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
	setFavorites(prevFavorites =>
	  prevFavorites.includes(id) ? prevFavorites.filter(favId => favId !== id) : [...prevFavorites, id]
	);
	enqueueSnackbar('Favorites updated successfully!', { variant: 'success' });
  };

  return {
	favorites,
	toggleFavorite,
  };
};