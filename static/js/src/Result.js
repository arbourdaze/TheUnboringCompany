'use strict';

class Result extends React.Component {
    
    constructor(props) {
        super(props);
        let randomColor = new RandomColor();
        this.color = randomColor.getColor();
    }
    
    render() {
        return (
            <div className={"row page-content-box result-row " + this.color}>
                <div className="col result-col">{this.props.name}</div>
                <div className="col result-col">{this.props.description}</div>
            </div>
        );
    }
}