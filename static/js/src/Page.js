'use strict';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.child = this.props.child;
  }
  
  getAnswers() {
    return this.child.getAnswers();
  }
  
  getName() {
      return this.name;
  }
  
  render() {
    return (
        <div>
            {this.child}
        </div>
    );
  }
}