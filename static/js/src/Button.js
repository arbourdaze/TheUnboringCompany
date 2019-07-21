'use strict';

class Button extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
        this.callback = this.callback.bind(this);
        this.enabler = this.enabler.bind(this);
    }

    callback() {
        this.props.callback(this.props.arg);
    }
    
    enabler()
    {
        return this.props.enabler();
    }
    
    render() {
        return (
            <div
                className={'custom-button ' + (this.props.classes.length > 0 && ' ' + this.props.classes) + (!this.enabler() && ' disabled')}
                onClick={this.enabler() ? this.callback : undefined}>
                {this.props.buttonText}
            </div>
        );
    }
}