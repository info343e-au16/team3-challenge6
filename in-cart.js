class InCarts extends React.Component {
    render() {
        return (
            <ul>
                {
                this.props.movies.map((movie) => (
                    <li key={movie.id}>
                        <div> 
                            <h2>{movie.title}</h2>
                              <button onClick={(e) => this.save(e, movie.id)}>Save</button>

                            <div>
                                <img src= {"http://image.tmdb.org/t/p/w154" + movie.poster_path} />
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    </li>
                ))
                }
            </ul>
        )
    }

    save(e, id) {
        console.log(id);
        this.props.save(id);
    }
}