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
        this.results = this.props.results;
    }
    
    handleBackButton() {
        this.props.goBack();
    }
    
    handleChange(id, score) {
        let newLiked = this.state.liked;
        let newDisliked = this.state.disliked;
        switch (score) {
            case 2: {
                newDisliked.delete(id);
                newLiked.add(id);
                break;
            }
            case 1: {
                newLiked.delete(id);
                newDisliked.add(id);
                break;
            }
            default: break;
        }
        this.setState({
            liked: newLiked,
            disliked: newDisliked
        }, function () {
            this.props.updateForm(this.state);
        });
    }
    
    createRows() {
        let rows = [];
        let i = 0;
        for (let i = 0; i < this.results.length; i++) {
            rows.push(<Result key={'result-' + i} id={i} result={this.results[i]} updateForm={this.handleChange} />);
        }
        return rows;
    }
    
    render() {
        return (
            <div>
                <h2 className="question">How do you feel about the following?</h2>
                {this.createRows()}
            </div>
        );
    }
}