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
            <h3>{this.props.question}</h3>
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
                            {this.props.low}
                        </th>
                        <th>

                        </th>
                        <th>
                        Neutral
                        </th>
                        <th>

                        </th>
                        <th>
                            {this.props.high}
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
            <h1>How are you feeling right now?</h1>
            <Likert name="openness" low="Dumb" high="Smart" />
            <Likert name="conscientiousness" low="Lazy" high="Overachieving" />
            <Likert name="extroversion" low="Shy" high="Social" />
            <Likert name="agreeableness" low="Rude" high="Friendly" />
            <Likert name="neuroticism" low="Chill" high="Stressed" />            
        </div>
    );
  }
}


let root = document.querySelector('#root');

ReactDOM.render(
    <Mood />,
    root
);