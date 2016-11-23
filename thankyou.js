// Renders thank you elements when payment has "processed"

class ThankYou extends React.Component {

    render() {
        return (
            <div className="container">
                <Header />
                <ThankYouMessage />
            </div>
        );
    }
}

var app = document.getElementById('app');

ReactDOM.render(<ThankYou />, app);