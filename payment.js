// This component renders the payment portion of the checkout page
// form inspired by http://bootsnipp.com/snippets/featured/credit-card-payment-form-2

class Payment extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="span12">
                    <form className="form-horizontal span6" action="thankyou.html">
                        <fieldset>
                        <legend>Payment</legend>
                        <div className="display-td" >                            
                            <img className="img-responsive pull-right" src="http://i76.imgup.net/accepted_c22e0.png"></img>
                        </div>
                        <div className="control-group">
                            <label className="control-label">Card Holder&rsquo;s Name</label>
                            <div className="controls">
                            <input type="text" className="input-block-level" pattern="\w+ \w+.*" title="Fill your first and last name" required></input>
                            </div>
                        </div>
                    
                        <div className="control-group">
                            <label className="control-label">Card Number (by each 4 digits)</label>
                            <div className="controls">
                            <div className="row-fluid">
                                <div className="span3">
                                <input type="text" className="input-block-level" autoComplete="off" maxLength="4" pattern="\d{4}" title="First four digits" required></input>
                                </div>
                                <div className="span3">
                                <input type="text" className="input-block-level" autoComplete="off" maxLength="4" pattern="\d{4}" title="Second four digits" required></input>
                                </div>
                                <div className="span3">
                                <input type="text" className="input-block-level" autoComplete="off" maxLength="4" pattern="\d{4}" title="Third four digits" required></input>
                                </div>
                                <div className="span3">
                                <input type="text" className="input-block-level" autoComplete="off" maxLength="4" pattern="\d{4}" title="Fourth four digits" required></input>
                                </div>
                            </div>
                            </div>
                        </div>
                    
                        <div className="control-group">
                            <label className="control-label">Card Expiry Date</label>
                            <div className="controls">
                            <div className="row-fluid">
                                <div className="span9">
                                <select className="input-block-level">
                                    <option>January</option>
                                    <option>...</option>
                                    <option>December</option>
                                </select>
                                </div>
                                <div className="span3">
                                <select className="input-block-level">
                                    <option>2013</option>
                                    <option>...</option>
                                    <option>2015</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        </div>
                    
                        <div className="control-group">
                            <label className="control-label">Card CVV</label>
                            <div className="controls">
                            <div className="row-fluid">
                                <div className="span3">
                                <input type="text" className="input-block-level" autoComplete="off" maxLength="3" pattern="\d{3}" title="Three digits at back of your card" required></input>
                                </div>
                                <div className="span8">
                                </div>
                            </div>
                            </div>
                        </div>
                    
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        </fieldset>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

