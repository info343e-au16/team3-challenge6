// This component renders the footer

class Footer extends React.Component {
    render() {
        return (
            <div> 
                <p>Page {this.props.page} out of {this.props.totalPages}</p> 
            </div>
        );
    }
}