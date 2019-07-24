class JumpScare extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
        this.run = this.run.bind(this);
        document.getElementById('soundEffect').play();
    }
    
    run() {
        this.props.run();
    }

    render() {
        return (
            <div>
                <div className="button-pad">
                    <Button
                        classes=""
                        callback={this.run}
                        enabler={function () {return true;}}
                        buttonText="Run!"
                    />
                </div>
            </div>
        );
    }
}