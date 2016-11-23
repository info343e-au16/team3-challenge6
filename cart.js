// Renders cart page

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
            
            for (var index in saveCart) {
                this.getMovies(saveCart[index]);
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

                <InCart
                    movies={this.state.movies}
                    update={(id, type, format) => this.updateQuantity(id, type, format)}
                    delete={(id, format) => this.deleteAll(id, format)}
                    grandTotal={this.state.grandTotal}
                />
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
                    var poster = json.poster_path;
                    var overview = json.overview;
                    
                    movie = {id: id, title: title, poster: poster, overview: overview, quantity: quantity, totalPrice: totalPrice, format: format};
                    movies.push(movie);
                    
                    this.setState({
                        movies: movies
                    });
                });
    }

    updateQuantity(id, type, format) {
        var saveCartJSON = localStorage.getItem('saveCart');
        var saveCart = JSON.parse(saveCartJSON);
        
        saveCart = this.updateArray(saveCart, id, type, format);
                
        var cartNumber = this.getCartNumber(saveCart);
        
        var grandTotal = this.getGrandTotal(saveCart);
        
        this.setState({
            cart: saveCart,
            cartNumber: cartNumber,
            grandTotal: grandTotal
        });
        
        // Save updated quantity in localStorage
        var savedJson = JSON.stringify(saveCart);
        localStorage.setItem('saveCart', savedJson);
        
        // Save updated quantity in state
        var movies = this.state.movies;
        movies = this.updateArray(movies, id, type, format);
                
        this.setState({
            movies: movies
        });

    }

    updateArray(array, id, type, format) {
        var newArray = array;
        for (var index in array) {
            if (array[index]["id"] === id && array[index]["format"] === format) {
                if (type == "plus") {
                    array[index]["quantity"] += 1;
                    
                // Quantity of movie cannot be less than 1 in the cart
                } else if (array[index]["quantity"] > 1) {
                    array[index]["quantity"] -= 1;
                } 
                
                if (array[index].totalPrice !== undefined) {
                    var newTotalPrice = 0;
                    
                    if (format === "DVD") {
                        newTotalPrice = numeral(array[index]["quantity"] * 14.95).format('$0,0.00');
                    } else {
                        newTotalPrice = numeral(array[index]["quantity"] * 29.95).format('$0,0.00');
                    }
                    
                    array[index].totalPrice = newTotalPrice;
                }
            }
        }
        return newArray;
    }
    
    deleteAll(id, format) {
        // Edits an array that represents localStorage
        var saveCartJSON = localStorage.getItem('saveCart');
        var saveCart = JSON.parse(saveCartJSON); 
        saveCart = this.spliceArray(saveCart, id, format);
        
        // Update localStorage with updated array
        var savedJson = JSON.stringify(saveCart);
        localStorage.setItem('saveCart', savedJson);
        
        // Updates the state witht the new values
        var movies = this.state.movies;
        movies = this.spliceArray(movies, id, format);
        
        var cartNumber = this.getCartNumber(movies);
        var grandTotal = this.getGrandTotal(movies);
        
        this.setState({
            movies: movies,
            cartNumber: cartNumber,
            grandTotal: grandTotal
        });
    }


    // http://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
    // Finds the index that matches the location, then removes it
    spliceArray(array, id, format) {
        var splicedArray = array;

        for (var i = splicedArray.length - 1; i >= 0; i--) {
            if (splicedArray[i]["id"] === id && splicedArray[i]["format"] === format) {
                splicedArray.splice(i, 1);
            }
        }
        return splicedArray;
    }

    getCartNumber(cart) {
        var cartNumber = 0;
        
        for (var index in cart) {
            cartNumber += cart[index]["quantity"];
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

ReactDOM.render(<Cart />, app);
