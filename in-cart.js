class InCart extends React.Component {
    render() {
        return (
            <ul>
                {
                this.props.movies.map((movie) => (
                    <li key={movie.id}>
                        <div> 
                            <h2>{movie.title}</h2>

                            <div>
                                <img src= {"http://image.tmdb.org/t/p/w154" + movie.poster} />
                                <p>{movie.overview}</p>

                                    <p>Quantity:</p>
                                    <button onClick={(e) => this.minus(e, movie.id, "min")}>-</button>
                                    {movie.quantity}
                                    <button onClick={(e) => this.add(e, movie.id, "plus")}>+</button>
                                    
                                    <div>
                                       <button onClick={(e) => this.delete(e, movie.id )}>Remove All</button>
                                    </div>
                                       

                                <p>Total price: {movie.totalPrice}</p>
                            </div>
                        </div>
                    </li>
                ))
                }
            </ul>
        )
    }
    
    minus(e, id, type) {
        this.props.minus(id, type);
    }

    add(e, id, type) {
        this.props.add(id, type);
    }

    delete(e, id) {
        this.props.delete(id);
    }
}