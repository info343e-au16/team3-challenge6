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