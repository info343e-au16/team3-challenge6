// This component renders the header and navigation bar.

class Header extends React.Component {
    render() {
        return (
            <header className="navHeader">
                <h1>React Movies</h1>
                <div className="tab">
                    <ul className="nav nav-tabs">
                        <li role="presentation"><a href="index.html">Home</a></li>
                        <li role="presentation"><a href="cart.html">Cart({this.props.cartNumber})</a></li>
                        <li role="presentation"><a href="checkout.html">Checkout</a></li>
                    </ul>
                </div>
            </header>
        );
    }
}