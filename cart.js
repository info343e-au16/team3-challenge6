var API_KEY = '79f72e16c30006b1ee4923040c292af9';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }
    
    componentDidMount() {
        var saveCartJSON = localStorage.getItem('saveCart');
        var saveCart = JSON.parse(saveCartJSON);

        if (saveCart) {
            this.setState({
                saved: saveCart
            });
        }
    }

    render() {
        return (
            <div className="container">
            <Header />
            
            </div>
        );
    }

    showMovie(id) {
            var url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_KEY + "&language=en-US";

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
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
