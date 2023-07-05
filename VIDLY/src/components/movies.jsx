import React, { Component } from 'react';
// import * as genresAPI from "../services/fakeMovieService";
import { getMovies } from '../services/fakeMovieService';

// class Movies extends Component {
//     render() { 
//         return (<h2>Movies Component</h2>);
//     }
// }
 
// export default Movies;

class Movies extends Component{

    state = {
      movies: getMovies()
    };
  
    // componentDidMount(){
    //   const movies = genresAPI.getMovies();
    //   this.setState( { movies } );
    // }
  
    handleDelete = (id) => {
      this.setState(prevState => {
        const updatedMovies = prevState.movies.map(movie => {
          if (movie._id === id) {
            if(movie.numberInStock > 1){
              return {
                ...movie,
                numberInStock: movie.numberInStock - 1
              };
            }
            else{
              return null;
            }
          }
          return movie;
        }).filter(Boolean);
        return { movies: updatedMovies };
      });
    }
  
    render(){
        const count = this.state.movies.length;

        if(count === 0)
        {
            return (<p>There is no movies left.</p>)
        }
  
      const movies = this.state.movies;
      return(
        // <div className="movies-container">
          <React.Fragment>
            <h1 className="title">This is a movie list</h1>
            <table className="movies-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                { movies.map( movie => (
                <tr key={movie._id}>
                    <td>{ movie.title }</td>
                    <td>{ movie.genre.name }</td>
                    <td>{ movie.numberInStock }</td>
                    <td>{ movie.dailyRentalRate }</td> 
                    <td> <button onClick={() => this.handleDelete(movie._id)} className="btn btn-secondary btn-sm">Delete</button>
    </td>             
                </tr>
                ) ) }
                </tbody>
            </table>
          </React.Fragment>
        // </div>
      );
    }
  
  }
  
  export default Movies;