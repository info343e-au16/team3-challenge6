var API_KEY = '79f72e16c30006b1ee4923040c292af9';
// added url pieces

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        };
    }
    
    componentDidMount() {
        this.topTwenty();
    }

    render() {
        return (
            <div className="container">
            <Header />

            <SearchForm 
                onSearch={(movie) => this.movieURL(movie)}
            />
            
            <Movies
                movies={this.state.movies}
            />
  
            </div>
        );
    }

    onGenreSearch() {
        var queryValue = this.refs.query.value;

        this.genreURL(queryValue);
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
        var url = "https://api.themoviedb.org/3/genre/" + id + "/movies?=" + API_KEY + "&language=en-US&sort_by=created_at.asc";
        this.searchMovie(url);
    }

    topTwenty() {
        this.searchMovie("https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY);
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
