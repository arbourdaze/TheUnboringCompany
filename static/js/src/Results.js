'use strict';

class Results extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            liked: new Set(),
            disliked: new Set()
        };
        this.results = this.props.results;
        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createRows = this.createRows.bind(this);
    }
    
    handleBackButton() {
        this.props.goBack();
    }
    
    handleChange(id, score) {
        let newLiked = this.state.liked;
        let newDisliked = this.state.disliked;
        switch (score) {
            case "1": {
                newDisliked.delete(id);
                newLiked.add(id);
                break;
            }
            case "0": {
                newLiked.delete(id);
                newDisliked.add(id);
                break;
            }
            default: break;
        }
        this.setState({
            liked: newLiked,
            disliked: newDisliked
        });
        this.props.updateForm(this.state);
    }
    
    createRows() {
        let results = this.props.results;
        let rows = [];
        let i = 0;
        for (let i = 0; i < results.length; i++) {
            rows.push(<Result key={'result-' + i} id={i} name={results[i].Name} description={results[i].Description} updateForm={this.handleChange} />);
        }
        return rows;
    }
    
    render() {
        return (
            <div>
                {this.createRows()}
            </div>
        );
    }
}