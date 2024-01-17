import { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        const data = await response.json();
        setMovies(data.movies || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'recommended',
      text: 'Recommendations',
      formatter: (cellContent, row) => {
        return cellContent ? 'Yes' : 'No';
      },
    },
  ];

  return (
    <div>
      <h1>Movies</h1>
      {movies.length > 0 ? (
        <BootstrapTable keyField='name' data={movies} columns={columns} />
      ) : (
        <p>No movies available</p>
      )}
    </div>
  );
}

export default Movies;
