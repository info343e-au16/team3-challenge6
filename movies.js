// This component renders the movie title, poster, and overview.

class Movies extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    {
                    this.props.movies.map((movie) => (
                        <li key={movie.id}>
                            <div className="movie-container">
            
                                <div className="movie-thumb"> 
                                    <img src= {"http://image.tmdb.org/t/p/w154" + movie.poster_path} />
                                </div>
            
                                <div>
                                    <h2>{movie.title}</h2>
            
                                    <p>{movie.overview}</p>
            
                                    <div className="button-container">
                                        <button onClick={(e) => this.save(e, movie.id, "DVD")}>Add DVD - $14.95</button>
                                    </div>
        
                                    <div className="button-container">
                                        <button onClick={(e) => this.save(e, movie.id, "Blue-Ray")}>Add Blue-Ray - $29.95</button>
                                    </div>
                                        
                                </div>
                            </div>
                        </li>
                    ))
                    }
                </ul>
            </div>
        )
    }

    save(e, id, format) {
        this.props.save(id, format);
    }
}