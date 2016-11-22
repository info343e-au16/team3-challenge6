var API_KEY = '79f72e16c30006b1ee4923040c292af9';
// added url pieces

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            results: [],
            genres: [],
            cart: [],
            cartNumber: 0
        };
    }
    
    componentDidMount() {
        var saveCartJSON = localStorage.getItem('saveCart');
        var saveCart = JSON.parse(saveCartJSON);

        if (saveCart) {
            var cartNumber = this.getCartNumber(saveCart);
            this.setState({
                cart: saveCart,
                cartNumber: cartNumber
            });
        }

        this.getGenres();  
        this.topTwenty();
    }

    render() {
        return (
            <div className="container">
                <Header />
                
                <SearchForm 
                    onSearch={(movie) => this.movieURL(movie)}
                />

                <Genre 
                    genres={this.state.genres}
                    onGenreClick={(id) => (id === "popular") ? this.topTwenty() : this.genreURL(id)}
                /> 

                <CartButton
                    cartNumber={this.state.cartNumber}
                />

                <Movies
                    movies={this.state.movies}
                    save={(id) => this.addToCart(id)}
                />

                {
                    this.state.page ? (
                        <Footer 
                            page={this.state.page}
                            totalPages={this.state.totalPages}
                            onRightClick={(page) => this.switchPage(this.state.url, 1)}
                            onLeftClick={(page) => this.switchPage(this.state.url, -1)}
                        />
                    ) : null
                }

            </div>
        );
    }

    addToCart(id) {
        var cart = this.state.cart;
        var notInCart = true;
        var index;

        var product = {};
        for (var i = 0; i < cart.length; i++) {
            if (cart[i]["id"] === id) {
                notInCart = false;
                index = i;
            } 
        }
        
        if (notInCart) {
            product = {id: id, quantity: 1};
            cart.push(product);
        } else {
            var newQuantity = cart[index]["quantity"] + 1;
            product = {id: id, quantity: newQuantity}
            cart[index] = product;
        }
        
        var cartNumber = this.getCartNumber(cart);

        this.setState({
            cart: cart,
            cartNumber: cartNumber
        });

        var savedJson = JSON.stringify(cart);
        localStorage.setItem('saveCart', savedJson);
    }

    getGenres() {
        var url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY + "&language=en-US"; 

        fetch(url)
            .then((response) => {
                return response.json();
            }).then((json) => {   
                this.setState({
                    genres: json.genres
                });
            }).catch((error) => {
            });
    }

    getPages() {
        if(this.state.movies) {
            var currentPage = this.state.results.page; 
            var totalPages = this.state.results.total_pages;
            
            this.setState({
                page: currentPage,
                totalPages: totalPages
            });

        }
    }

    switchPage(url, next) {       
        var newURL = url + "&page=" + (this.state.page + next);
        this.searchMovie(newURL);
    }

    searchMovie(url) {
            // fetches data as json and pieces apart information that is displayed
            fetch(url)
            .then((response) => {
                return response.json();
            }).then((json) => {   
                this.setState({
                    results: json,
                    movies: json.results,
                    url: url
                });
                this.getPages();
            }).catch((error) => {
            });

    }

    movieURL(movie) {
        // way to ask api for a movie
        var url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=en-US&query=" + movie;
        this.searchMovie(url);
    }

    genreURL(id) {
        var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=" + id;
        this.searchMovie(url);
    }

    topTwenty() {
        this.searchMovie("https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY);
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

ReactDOM.render(<App />, app);
