var API_KEY = '79f72e16c30006b1ee4923040c292af9';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    
    componentDidMount() {
        this.searchMovie("");
    }

    render() {
        return (
            <div className="container">
            <Header />

            <SearchForm 
                onSearch={(movie) => this.onSearch(movie)}
            
            />

                {
                    this.state.title ? (
                        <ShowResults
                            title={this.state.title}
                            poster={this.state.poster}
                            overview={this.state.overview}
                        />
                    ) : null
                }    
            </div>
        );
    }

    onSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;

        this.searchMovie(queryValue);
    }

    searchMovie(movie) {
            // gets url for movie query
            var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + movie;
            // fetches data as json and pieces apart information that is displayed
            fetch(url)
            .then((response) => {
                return response.json();
            }).then((json) => {   
                var title = json.results[0].title;         
                var poster = "http://image.tmdb.org/t/p/w154" + json.results[0].poster_path;
                var overview = json.results[0].overview;
                
                // update state
                this.setState({
                    title: title,
                    poster: poster,
                    overview: overview
                });
            }).catch((error) => {
            });
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
