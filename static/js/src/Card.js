'use strict';

class Card extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            phobia: this.props.data.Phobia,
            nonphobias: this.props.nonphobias
        };
        this.data = this.props.data;
        this.sendData = this.sendData.bind(this);
        this.proceed = this.proceed.bind(this);
        this.getButtonPad = this.getButtonPad.bind(this);
        this.sendData();
    }
    
    sendData() {
        if (this.data.Phobia) {
            this.props.update(this.data.Phobia);
        }
    }
    
    proceed(cardID) {
        this.props.move(cardID);
    }
    
    getButtonPad() {
        let buttonList = [];
        for (let childID in this.data.Children) {
            let child = this.props.getChild(childID);
            buttonList.push(
                <Button
                    classes=""
                    buttonText={child.Description}
                    id={childID}
                    callback={this.proceed}
                    enabler={!this.props.nonphobias.includes(child.Phobia)}
                />
            );
        }
        return buttonList;
    }
    
    render() {
        return (
            <div>
                <div className="narrative">
                    {this.data.Description.split('\n').map((i,key) => {
                        return <p key={key}>{i}</p>;
                        })
                    }
                </div>
                <div className="buttonPad">
                    {this.getButtonPad()}
                </div>
            </div>
        );
    }
}