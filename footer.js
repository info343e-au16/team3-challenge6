// This component renders the footer

class Footer extends React.Component {
    render() {
        return (
            <footer> 
                {
                    (this.props.page !== 1) ? (
                        <button onClick={(e) => this.onLeftClick(e)}><i className="fa fa-hand-o-left"> Last</i></button>
                    ) : null
                }
                Page {this.props.page} out of {this.props.totalPages}
                {
                    (this.props.page !== this.props.totalPages) ? (
                        <button onClick={(e) => this.onRightClick(e)}>Next <i className="fa fa-hand-o-right"></i></button>                 
                    ) : null
                }
            </footer>
        );
    }

    onLeftClick(e, id) {
        e.preventDefault(); 
        this.props.onLeftClick(id); 
    }    
    
    onRightClick(e, id) {
        e.preventDefault(); 
        this.props.onRightClick(id); 
    }
}