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
            
            var grandTotal = this.getGrandTotal(saveCart)

            this.setState({
                grandTotal: grandTotal
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
            var format = product.format;
            var totalPrice = 0;
        
            if (format === "DVD") {
                totalPrice = numeral(quantity * 14.95).format('$0,0.00');
            } else {
                totalPrice = numeral(quantity * 29.95).format('$0,0.00');
            }
            
            // fetches data as json and pieces apart information that is displayed
            fetch(url)
                .then((response) => {
                    return response.json();
                }).then((json) => {   
                    var id = json.id;
                    var title = json.title;
                    
                    movie = {id: id, title: title, quantity: quantity, format: format, totalPrice: totalPrice};
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
    
    getGrandTotal(saveCart) {
            var grandTotal = 0;

            for (var index in saveCart) {
                if (saveCart[index]["format"] === "DVD") {
                    grandTotal += (saveCart[index]["quantity"] * 14.95);
                } else {
                    grandTotal += (saveCart[index]["quantity"] * 29.95);
                }
            }
        
            return grandTotal = numeral(grandTotal).format('$0,0.00');
    }
}

var app = document.getElementById('app');

ReactDOM.render(<Checkout />, app);
