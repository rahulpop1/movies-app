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
        const sortedMovies = data.movies ? data.movies.sort((a, b) => a.name.localeCompare(b.name)) : [];
        setMovies(sortedMovies);
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
      sort: true,
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <h1 className="text-center mb-4 text-primary">Movie Recommendations</h1>
          {movies.length > 0 ? (
            <BootstrapTable
              keyField='name'
              data={movies}
              columns={columns}
              striped
              hover
              bootstrap4
              classes="table table-bordered table-responsive-md table-dark"
            />
          ) : (
            <p className="text-center text-danger">No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movies;
