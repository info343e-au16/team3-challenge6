// This component renders the header

class Header extends React.Component {
    render() {
        return (
            <div className="navHeader">
                <h1>React Movies</h1>
               <div className="tab">
                    <ul className="nav nav-tabs">
                            <li role="presentation"><a href="index.html">Home</a></li>
                            <li role="presentation"><a href="cart.html">Go To Cart</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}