'use strict';

class Results extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    
    handleBackButton() {
        this.props.goBack();
    }
    
    render() {
        return (
            <div>
                Behold the results.<br/>
                <button type="button" onClick={this.handleBackButton}>No, try again</button>
            </div>
        );
    }
}