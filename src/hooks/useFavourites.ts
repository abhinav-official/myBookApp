import { useState } from 'react';
import { useSnackbar } from 'notistack';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const { enqueueSnackbar } = useSnackbar();

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