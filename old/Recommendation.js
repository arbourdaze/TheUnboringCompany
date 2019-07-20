'use strict';

class Recommendation extends React.Component {
    
    constructor(props) {
        super(props);
        let randomColor = new RandomColor();
        this.color = randomColor.getColor();
        this.result = this.props.result;
    }
    
    render() {
        return (
            <div className={"page-content-box result " + this.color} data-type={this.result.Type}>
                <div className="row">
                    <div className="col">{this.result.Name}</div>
                    <div className="col">{this.result.Description}</div>
                </div>
                <div className="row">
                    {this.props.actionItem}
                </div>
            </div>
        );
    }
}