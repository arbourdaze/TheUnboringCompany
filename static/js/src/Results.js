'use strict';

class Results extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.createRows = this.createRows.bind(this);
    }
    
    handleBackButton() {
        this.props.goBack();
    }
    
    createRows() {
        let results = this.props.results;
        let rows = [];
        let i = 0;
        results.forEach(function (res) {
            rows.push(<Result key={'result-' + i} name={res.Name} description={res.Description} />);
            i++;
        });
        return rows;
    }
    
    render() {
        return (
            <div>
                {this.createRows()}
                <button type="button" onClick={this.handleBackButton}>No, try again</button>
            </div>
        );
    }
}