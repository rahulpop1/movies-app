import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';


const Movies = () => {
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      async function fetchMovies() {
        try {
          const response = await axios.get('/api/movies');
          setMovies(response.data.movies);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      }
  
      fetchMovies();
  
      // Update the row data after the initial render
      setMovies(movies.map((movie) => {
        return {
          ...movie,
          recommended: movie.name === 'Tu Jhoothi Main Makkar',
        };
      }));
    }, []);
  
    const columns = [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Recommendations', accessor: 'recommended' },
    ];
  
    const tableInstance = useTable({ columns, data: movies });
  
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  export default Movies;

  