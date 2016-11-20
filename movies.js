class Movies extends React.Component {
    render() {
        return (
            <ul>
                {
                this.props.movies.map((movie) => (
                    <li key={movie.id}>
                        <div> 
                            <h2>{movie.title}</h2>

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
}