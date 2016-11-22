var API_KEY = '79f72e16c30006b1ee4923040c292af9';
var movies = []; 

class Cart extends React.Component {
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

                <InCart
                    movies={this.state.movies}
                    update={(id, type) => this.updateQuantity(id, type)}
                    delete={(id) => this.deleteAll(id)}
                    grandTotal={this.state.grandTotal}
                />
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
                    var poster = json.poster_path;
                    var overview = json.overview;
                    
                    movie = {id: id, title: title, poster: poster, overview: overview, quantity: quantity, totalPrice: totalPrice};
                    movies.push(movie);
                    
                    this.setState({
                        movies: movies
                    });
                }).catch((error) => {
            });
    }

    updateQuantity(id, type) {
        var saveCartJSON = localStorage.getItem('saveCart');
        
        var saveCart = JSON.parse(saveCartJSON);
        saveCart = this.updateArray(saveCart, id, type);
                
        var cart = saveCart;
        var cartNumber = this.getCartNumber(cart);

        this.setState({
            cart: saveCart,
            cartNumber: cartNumber,
            grandTotal: numeral(cartNumber * 14.95).format('$0,0.00')
        });

        var savedJson = JSON.stringify(saveCart);
        localStorage.setItem('saveCart', savedJson);
        

        var movies = this.state.movies;
        movies = this.updateArray(movies, id, type);
                
        this.setState({
            movies: movies
        });

    }

    updateArray(array, id, type) {
        var newArray = array;
        
        for (var i = 0; i < array.length; i++) {
            
            if (array[i]["id"] === id) {
                if (type == "plus") {
                    array[i]["quantity"] += 1;
                    
                // Quantity of movie cannot be less than 1 in the cart
                } else if (array[i]["quantity"] > 1) {
                    array[i]["quantity"] -= 1;
                } 
            }
            
            if (array[i].totalPrice !== undefined) {
                var newTotalPrice = numeral(array[i].quantity * 14.95).format('$0,0.00');
                
                array[i].totalPrice = newTotalPrice;
            }
        }
        return newArray;
    }
    
    deleteAll(id) {
        var saveCartJSON = localStorage.getItem('saveCart');
       
        var saveCart = JSON.parse(saveCartJSON); 
        saveCart = this.spliceArray(saveCart, id);

        var savedJson = JSON.stringify(saveCart);
        localStorage.setItem('saveCart', savedJson);
        
        var movies = this.state.movies;
        movies = this.spliceArray(movies, id);
        
        var cartNumber = this.getCartNumber(saveCart);

        this.setState({
            movies: movies,
            cartNumber: cartNumber,
            grandTotal: numeral(cartNumber * 14.95).format('$0,0.00')
        });
    }

    spliceArray(array, id) {
        var splicedArray = array;

        for (var i=splicedArray.length-1; i>=0; i--) {
            if (splicedArray[i]["id"] === id) {
                splicedArray.splice(i, 1);
            }
        }
        return splicedArray;
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

ReactDOM.render(<Cart />, app);
