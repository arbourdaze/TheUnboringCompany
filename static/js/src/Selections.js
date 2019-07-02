'use strict';

class Selections extends React.Component {
    
    constructor(props) {
        super(props);
        this.createRows = this.createRows.bind(this);
    }
    
    createRows() {
        let selections = this.props.selections;
        let rows = [];
        let i = 0;
        for (let i = 0; i < selections.length; i++) {
            rows.push(<Selection key={'selection-' + i} name={selections[i].Name} description={selections[i].Description} />);
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