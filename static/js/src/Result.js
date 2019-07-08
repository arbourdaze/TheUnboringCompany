'use strict';

class Result extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.result.Category
        };
        this.labels = ["Sounds fun!", "Sounds boring."];
        this.options = [2,1];
        this.result = this.props.result;
        this.handleChange = this.handleChange.bind(this);
        this.actionItem = <Likert
            val={this.state.score}
            updateForm={this.handleChange}
            labels={this.labels}
            options={this.options}
            name={'result' + this.props.id}
            />;
    }
    
    handleChange(name, value)
    {
        this.setState({ score: value }, function () {
            this.props.updateForm(this.props.id, this.state.score);
        });
    }
    
    render() {
        return (
            <Recommendation result={this.result} actionItem={this.actionItem} />
        );
    }
}