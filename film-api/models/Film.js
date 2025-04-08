import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  Source: { type: String, required: true },
  Value: { type: String, required: true }
});

const MovieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Rated: { type: String },
  Released: { type: String },
  Runtime: { type: String },
  Genre: { type: String },
  Director: { type: String },
  Writer: { type: String },
  Actors: { type: String },
  Plot: { type: String },
  Language: { type: String },
  Country: { type: String },
  Awards: { type: String },
  Poster: { type: String },
  Ratings: [RatingSchema],
  Metascore: { type: String },
  imdbRating: { type: String },
  imdbVotes: { type: String },
  imdbID: { type: String, unique: true },
  Type: { type: String },
  DVD: { type: String },
  BoxOffice: { type: String },
  Production: { type: String },
  Website: { type: String },
  Response: { type: String }
});

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;