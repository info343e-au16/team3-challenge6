class CartButton extends React.Component {
    render() {
        return (
            <div>
                <a href="cart.html" aria-label="Shop" className="get-yours-link-mobile" target="_blank">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    ({this.props.cartNumber})
                </a> 
            </div>
        );
    }
}       
        
        