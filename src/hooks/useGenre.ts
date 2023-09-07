import genres from '../data/genres'

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

//No longer going to call server for this data, since it basically never changes. So let's render it ourselves since it is static data
// const useGenres = () => useData<Genre>('/genres');

//Want to return this object since that is what we've defined already in the past for the other components and don't want to change everything again
const useGenres = () => ({data: genres, isLoading: false, error: null})

export default useGenres;
