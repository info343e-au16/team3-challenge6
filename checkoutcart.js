// This component renders the checkout cart display

class CheckoutCart extends React.Component {
    render() {
        return (
            <div className="container checkout">
                <div className="row">
                    <div className="span12">
                        <fieldset>
                        <legend>Checkout Cart</legend>
                        <p><a href="cart.html">Edit Cart</a></p>
                        <ul>
                            {
                            this.props.movies.map((movie) => (
                                <li key={movie.id + movie.format}>
                                    <div> 
                                        <h5>{movie.title} ({movie.format}) ({movie.quantity}) {movie.totalPrice}</h5>
                                    </div>
                                </li>
                            ))
                            }
                            <hr></hr>
                            <li>
                                <h5>Total payment: {this.props.grandTotal}</h5>
                            </li>
                        </ul>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }
}