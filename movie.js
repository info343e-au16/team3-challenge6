class ShowResults extends React.Component {
    render() {
        return (
            <div> 
                <h2>{this.props.title}</h2>

                <div>
                    <img src= {this.props.poster} />
                    <p>{this.props.overview}</p>
                </div>
            </div>
        );
    }
}