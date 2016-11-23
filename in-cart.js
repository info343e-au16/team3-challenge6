// This component renders the "in cart" buttons where the user can choose to
// add, remove, or delete the amount of movies in their cart. 

class InCart extends React.Component {
    render() {
        return (
            <ul>
                {
                this.props.movies.map((movie) => (
                    <li key={movie.id + movie.format}>
                        <div> 
                            <h2>{movie.title}</h2>
                            <div>
                                <img src= {"http://image.tmdb.org/t/p/w154" + movie.poster} />
                                <p>{movie.overview}</p>
                                    <p>Quantity:</p>
                                    <button onClick={(e) => this.update(e, movie.id, "min", movie.format)}>-</button>
                                    {movie.quantity}
                                    <button onClick={(e) => this.update(e, movie.id, "plus", movie.format)}>+</button>
                                <div>
                                    <button onClick={(e) => this.delete(e, movie.id, movie.format)}>Remove All</button>
                                </div>
                                <div>Format: {movie.format} </div>
                                <p>Movie total price: {movie.totalPrice}</p>
                            </div>
                        </div>
                    </li>
                ))
                }
                <li>
                    <p className="total">Total price: {this.props.grandTotal}</p>
                </li>
            </ul>
        )
    }
    
    update(e, id, type, format) {
        this.props.update(id, type, format);
    }

    delete(e, id, format) {
        this.props.delete(id, format);
    }
}