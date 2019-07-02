'use strict';

class Selection extends React.Component {
    
    constructor(props) {
        super(props);
        let randomColor = new RandomColor();
        this.color = randomColor.getColor();
    }
    
    render() {
        return (
            <div className={"page-content-box result " + this.color}>
                <div className="row">
                    <div className="col">{this.props.name}</div>
                    <div className="col">{this.props.description}</div>
                </div>
            </div>
        );
    }
    
}