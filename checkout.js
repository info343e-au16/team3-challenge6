// This component renders a checkout page

var API_KEY = '79f72e16c30006b1ee4923040c292af9';
var movies = [];

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            movies: []
        };
    }
    
    componentDidMount() {
        var saveCartJSON = localStorage.getItem('saveCart');
        var saveCart = JSON.parse(saveCartJSON);
        
        var cartNumber = 0;
        
        if (saveCart) {
            this.setState({
                cart: saveCart
            });
            
            for (var i = 0; i < saveCart.length; i++) {
                this.getMovies(saveCart[i]);
            }
            
            cartNumber = this.getCartNumber(saveCart);

            this.setState({
                grandTotal: numeral(cartNumber * 14.95).format('$0,0.00')
            });
        }
        
        this.setState({
            cartNumber: cartNumber
        });
    }

    
    render() {
        return (
            <div className="container">
                <Header
                    cartNumber={this.state.cartNumber}
                />

                <CheckoutCart
                    movies={this.state.movies}
                    grandTotal={this.state.grandTotal}
                />

                <Payment />
            </div>
        );
    }

    getMovies(product) {
            var url = "https://api.themoviedb.org/3/movie/" + product.id + "?api_key=" + API_KEY + "&language=en-US";
            var movie = {};
            var quantity = product.quantity;
            var totalPrice = numeral(quantity * 14.95).format('$0,0.00');
            
            // fetches data as json and pieces apart information that is displayed
            fetch(url)
                .then((response) => {
                    return response.json();
                }).then((json) => {   
                    var id = json.id;
                    var title = json.title;
                    
                    movie = {id: id, title: title, quantity: quantity, totalPrice: totalPrice};
                    movies.push(movie);
                    
                    this.setState({
                        movies: movies
                    });
                }).catch((error) => {
            });
    }

    getCartNumber(cart) {
        var cartNumber = 0;
        
        for (var i = 0; i < cart.length; i++) {
            cartNumber += cart[i]["quantity"];
        }
        return cartNumber;
    }
}

var app = document.getElementById('app');

ReactDOM.render(<Checkout />, app);
