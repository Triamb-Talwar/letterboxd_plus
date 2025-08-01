import axios from 'axios';

const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMBD_ACESS_TOKEN;
const RAWG_API_KEY = process.env.REACT_APP_RAWG_API_KEY; // Match your working env var!

export const searchMedia = async (type, query) => {
  try {
    const encodedQuery = query.trim();

    switch (type) {
      case 'Movies': {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(encodedQuery)}`;
        const res = await fetch(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          },
        });

        if (!res.ok) {
          console.error(`[ERROR] TMDb movie search failed: ${res.status}`);
          return [];
        }

        const data = await res.json();
        return data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
          rating: null,
          year: movie.release_date?.slice(0, 4),
        }));
      }

      case 'Shows': {
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(encodedQuery)}`);
        const data = await res.json();
        return data.map(({ show }) => ({
          id: show.id,
          title: show.name,
          image: show.image?.medium || null,
          rating: null,
          year: show.premiered?.slice(0, 4),
        }));
      }

      case 'Books': {
        const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(encodedQuery)}`);
        const data = await res.json();
        return data.docs.slice(0, 10).map((book) => ({
          id: book.key,
          title: book.title,
          image: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
          rating: null,
          year: book.first_publish_year || null,
        }));
      }

      case 'Games': {
        const res = await axios.get(`https://api.rawg.io/api/games`, {
          params: {
            key: RAWG_API_KEY,
            search: encodedQuery,
          },
        });

        return res.data.results.map((game) => ({
          id: game.id,
          title: game.name,
          image: game.background_image || null,
          rating: game.rating || null,
          year: game.released?.slice(0, 4),
        }));
      }

      default:
        return [];
    }
  } catch (err) {
    console.error(`[ERROR] Search failed for ${type}:`, err);
    return [];
  }
};
