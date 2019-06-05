'use strict';

class Likert extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
      this.props.updateForm(e.target.value);
  }

  render() {
    return (
        <div className="likert" name={this.props.name} onChange={this.handleChange}>
            <h3>{this.props.question}</h3>
            <table>
                <tbody>
                    <tr>
                        <Radio name={this.props.name} val="0" />
                        <Radio name={this.props.name} val="0.25" />
                        <Radio name={this.props.name} val="0.5" />
                        <Radio name={this.props.name} val="0.75" />
                        <Radio name={this.props.name} val="1" />
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