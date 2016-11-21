var API_KEY = '79f72e16c30006b1ee4923040c292af9';
// added url pieces

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            genres: [],
            cart: [],
            cartNumber: 0
        };
    }
    
    componentDidMount() {
        var saveCartJSON = localStorage.getItem('saveCart');
        var saveCart = JSON.parse(saveCartJSON);
        var cartNumber = saveCart.length;

        if (saveCart) {
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

            </div>
        );
    }

    addToCart(id) {
        var cart = this.state.cart;

        if (cart.indexOf(id) < 0) {
            cart.push(id);

            var cartNumber = cart.length;

            this.setState({
                cart: cart,
                cartNumber: cartNumber
            });

            console.log(this.state);
            var savedJson = JSON.stringify(cart);
            localStorage.setItem('saveCart', savedJson);
        }
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

    searchMovie(url) {
            // fetches data as json and pieces apart information that is displayed
            fetch(url)
            .then((response) => {
                return response.json();
            }).then((json) => {   
                this.setState({
                    movies: json.results
                });
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
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
