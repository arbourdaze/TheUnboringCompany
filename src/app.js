'use strict';

class Likert extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
      this.setState({value: event.target.value});
  }

  render() {
    return (
        "hi"
/*         <div>
            <table className="likert">
                <tr>
                    <td>
                        <input type="radio" value="0" onChange={this.handleChange} />
                    </td>
                    <td>
                        <input type="radio" value="0.25" onChange={this.handleChange} />
                    </td>
                    <td>
                        <input type="radio" value="0.5" onChange={this.handleChange} />
                    </td>
                    <td>
                        <input type="radio" value="0.75" onChange={this.handleChange} />
                    </td>
                    <td>
                        <input type="radio" value="1" onChange={this.handleChange} />
                    </td>
                </tr>
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
            </table>
        </div> */
    );
  }
}


let root = document.querySelector('#root');

ReactDOM.render(
    <Likert />,
    root
);