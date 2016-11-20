class Genre extends React.Component {
    render() {
        return (
            <ul>
                <li>
                    <a href="#" onClick={(e) => this.onPopularClick(e)}>
                        Popular
                    </a>
                </li>
                {
                this.props.genres.map((genre) => (
                    <li key={genre.id}>
                        <a href="#" onClick={(e) => this.onGenreClick(e, genre.id)}> 
                            {genre.name}
                        </a> 
                    </li>
                ))
                }
            </ul>
        )
    }

    onPopularClick(e) {
        e.preventDefault(); 

        this.props.onPopularClick(); 
    }

    onGenreClick(e, id) {
        e.preventDefault(); 

        this.props.onGenreClick(id); 
    }

}