'use strict';

class Likert extends Input {
  constructor(props) {
    super(props);
  }

  render() {
    let score = 
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