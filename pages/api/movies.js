import moviesData from '../../data/movies.json';

export default function handler(req, res) {
  res.status(200).json(moviesData);
}
