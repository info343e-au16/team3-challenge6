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
        
        if (saveCart) {
            this.setState({
                cart: saveCart
            });
        }
        for (var i = 0; i < saveCart.length; i++) {
            this.getMovies(saveCart[i]);
        }
        
    }

    render() {
        return (
            <div className="container">

                <Header />

                <InCart
                    movies={this.state.movies}
                />
            </div>
        );
    }

    getMovies(id) {
            var url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_KEY + "&language=en-US";
            var movie = {};
        
            // fetches data as json and pieces apart information that is displayed
            fetch(url)
            .then((response) => {
                return response.json();
            }).then((json) => {   
                var id = json.id;
                var title = json.title;
                var poster = json.poster_path;
                console.log(poster);
                var overview = json.overview;
                
                movie = {id: id, title: title, poster: poster, overview: overview};
                movies.push(movie);
                
                console.log(movies);
                
                this.setState({
                    movies: movies
                });
            }).catch((error) => {
            });
    }
}

var app = document.getElementById('app');

ReactDOM.render(<Cart />, app);
