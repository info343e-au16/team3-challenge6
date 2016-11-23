// Renders a thank you message when the user pays!

class ThankYouMessage extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Thank you for your order!</h1>
                <p>Please allow 3-5 days for processing, you should
                        expect your order to arrive within a week!</p>
            </div>
        );
    }
}
