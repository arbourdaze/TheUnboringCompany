'use strict';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: null }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value}, function () {
          if (debug) {
            console.log(this.state.value);
          }
          this.props.updateForm(this.state.value);
      });
    }
}