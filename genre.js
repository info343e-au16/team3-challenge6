class Genre extends React.Component {
    render() {
        return (
            <div>
                <p>Show movies by genre:
                <select name="Genre" onChange={(e) => this.onGenreClick(e, e.target.value)}>
                    <option key="popular" value="popular">Popular</option>
                    {
                    this.props.genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                                {genre.name}
                        </option>
                    ))
                    }
                </select>
                </p>
            </div>
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