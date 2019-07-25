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
                <div className="jump-scare-image-container">
                    <img className="jump-scare-image" src={'/static/img/' + this.props.monster + '.jpg'} />
                </div>
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