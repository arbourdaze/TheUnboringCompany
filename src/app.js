'use strict';

let debug = true;

class Likert extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
      this.setState({value: event.target.value}, function () {
          if (debug) {
            console.log(this.state.value);
          }
      });
  }

  render() {
    return (
        <div className="likert" name={this.props.name} onChange={this.handleChange}>
            <h3>{this.props.trait}</h3>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input name={this.props.name} type="radio" value="0" />
                        </td>
                        <td>
                            <input name={this.props.name} type="radio" value="0.25" />
                        </td>
                        <td>
                            <input name={this.props.name} type="radio" value="0.5" />
                        </td>
                        <td>
                            <input name={this.props.name} type="radio" value="0.75" />
                        </td>
                        <td>
                            <input name={this.props.name} type="radio" value="1" />
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <th>
                            Strongly disagree
                        </th>
                        <th>
                            Disagree
                        </th>
                        <th>
                            Neutral
                        </th>
                        <th>
                            Agree
                        </th>
                        <th>
                            Strongly agree
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }
}


class Mood extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="mood">
            <Likert name="openness" trait="Creative" />
            <Likert name="conscientiousness" trait="Ambitious" />
            <Likert name="extroversion" trait="Social" />
            <Likert name="agreeableness" trait="Nice" />
            <Likert name="neuroticism" trait="Stressed" />            
        </div>
    );
  }
}


let root = document.querySelector('#root');

ReactDOM.render(
    <Mood />,
    root
);