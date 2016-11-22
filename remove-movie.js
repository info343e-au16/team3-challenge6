// This component renders the remove button where the user can remove 
// the movies they have in the cart.

class RemoveMovie extends React.Component {
    render() {
        return (
            <div>
                <button onClick={(e) => this.onClickRemove(e, id)}>Save</button>
            </div>
        );
    }
    
    onClickRemove(e, id) {
        this.props.remove(id);
    }
}       