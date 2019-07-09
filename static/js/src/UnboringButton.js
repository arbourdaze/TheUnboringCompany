'use strict';

class UnboringButton extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            disabled: this.props.disabled
        };
        this.callback = this.callback.bind(this);
        this.enabler = this.enabler.bind(this);
    }
    
    callback() {
        if (!this.state.disabled) {
            this.props.callback();
        }
    }
    
    enabler()
    {
        return this.props.enabler();
    }
    
    render() {
        return (
            <div
                className={'unboring-button' + (this.props.classes.length > 0 && ' ' + this.props.classes) + (!this.enabler() && ' disabled')}
                onClick={this.enabler() ? this.callback : undefined}>
                {this.props.buttonText}
            </div>
        );
    }
}