'use strict';

class Result extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            score: null
        };
        this.labels = ["Sounds fun!", "Maybe later.", "Sounds boring."];
        this.options = [1,0,-1];
        let randomColor = new RandomColor();
        this.color = randomColor.getColor();
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(category, choice)
    {
        this.state.score = choice;
        this.props.updateForm(this.props.id, this.state.score);
    }
    
    render() {
        return (
            <div className={"page-content-box result " + this.color}>
                <div className="row">
                    <div className="col">{this.props.name}</div>
                    <div className="col">{this.props.description}</div>
                </div>
                <div className="row">
                    <Likert score={this.state.score} updateForm={this.handleChange} labels={this.labels} options={this.options} category={'result' + this.props.id} />
                </div>
            </div>
        );
    }
}