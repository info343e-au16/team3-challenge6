// This component renders the "in cart" buttons where the user can choose to
// add, remove, or delete the amount of movies in their cart. 

class InCart extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    {
                    this.props.movies.map((movie) => (
                        <li key={movie.id + movie.format}>
                            <div className="movie-container"> 
            
                                <div className="movie-thumb">
                                    <img src= {"http://image.tmdb.org/t/p/w154" + movie.poster} />
                                </div>
            
                                <div>
                                    <h2>{movie.title}</h2>
            
                                    <p>{movie.overview}</p>
            
                                    <p>Quantity:</p>
            
                                    <button onClick={(e) => this.update(e, movie.id, "min", movie.format)}>-</button>
        
                                    <span className="quantity">{movie.quantity}</span>
                                    
                                    <button onClick={(e) => this.update(e, movie.id, "plus", movie.format)}>+</button>
                                    
                                    <div className="button-container">
                                        <button onClick={(e) => this.delete(e, movie.id, movie.format)}>Remove All</button>
                                    </div>
                                        
                                    <div>
                                        Format: {movie.format} 
                                    </div>
                                    
                                    <p>Movie total price: <strong>{movie.totalPrice}</strong></p>
                                    
                                </div>
                            </div>
                        </li>
                    ))
                    }
                </ul>
                <div>
                    <li>
                        <p className="total">Total price: {this.props.grandTotal}</p>
                        <a href="checkout.html"><button className="checkout-button">Checkout</button></a>
                    </li>
                </div>
            </div>            
        )
    }
    
    update(e, id, type, format) {
        this.props.update(id, type, format);
    }

    delete(e, id, format) {
        this.props.delete(id, format);
    }
}