// This component renders the "in cart" buttons where the user can choose to
// add, remove, or delete the amount of movies in their cart. 

class InCart extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6"> 
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
                                                <button onClick={(e) => this.update(e, movie.id, "min")}>-</button>
                                                {movie.quantity}
                                                <button onClick={(e) => this.update(e, movie.id, "plus")}>+</button>
                                            <div>
                                                <button onClick={(e) => this.delete(e, movie.id )}>Remove All</button>
                                            </div>
                                            <p>Movie total price: {movie.totalPrice}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <li>
                            <p className="total">Total price: {this.props.grandTotal}</p>
                        </li>
                    </div>
                </div>
            </div>            
        )
    }
    
    update(e, id, type) {
        this.props.update(id, type);
    }

    delete(e, id) {
        this.props.delete(id);
    }
}