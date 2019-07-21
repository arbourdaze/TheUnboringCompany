'use strict';

class Card extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nonphobias: this.props.nonphobias
        };
        this.sendData = this.sendData.bind(this);
        this.proceed = this.proceed.bind(this);
        this.getCard = this.getCard.bind(this);
        this.getButton = this.getButton.bind(this);
        this.getButtonPad = this.getButtonPad.bind(this);
        this.sendData();
    }
    
    sendData() {
        if (this.props.data.Phobias.length > 0) {
            let newNonphobias = this.state.nonphobias;
            newNonphobias = newNonphobias.concat(this.props.data.Phobias);
            this.setState({nonphobias: newNonphobias});
            this.props.update(this.props.data.Phobias);
        }
    }
    
    proceed(title) {
        this.props.move(title);
    }
    
    getButton(destination) {
        const generateKey = (pre) => {
            return `${ pre }_${ new Date().getTime() }`;     
        }
        let that = this;
        return (
            <Button
                key={generateKey(destination.Title)}
                classes=""
                arg={destination.Title}
                buttonText={destination.FormalTitle}
                callback={this.proceed}
                enabler={function () {return !that.state.nonphobias.includes(destination.Phobias);}}
            />
        );
    }
    
    getCard(title) {
        let json = JSON.stringify({ Title: title });
        let card = null;
        
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/get-card',
            data: json,
            dataType: 'json',
            async: false,
            success: function (res) {
                card = res;
            },
            error: function() {
                if (debug) {
                    console.log('Error: could not find card');
                }
            }
        });
        return card;
    }

    getButtonPad() {
        let buttonList = [];
        let that = this;
        let data = this.props.data;
        for (let i=0; i < data.Children.length; i++) {
            let childCard = that.getCard(data.Children[i]);
            buttonList.push(
                that.getButton(childCard)
            );
        }
        for (let i=0; i < data.Parent.length; i++) {
            let parentCard = that.getCard(data.Parent[i]);
            buttonList.push(
                that.getButton(parentCard)
            );
        }
        return buttonList;
    }
    
    render() {
        let buttonPad = this.getButtonPad();
        return (
            <div className="card">
                <h2 className="title">{this.props.data.FormalTitle}</h2>
                <div className="narrative">
                    {this.props.data.Description.split('\n').map((i,key) => {
                        return <p key={key}>{i}</p>;
                        })
                    }
                </div>
                <div className="button-pad">
                    <p>{buttonPad.length > 0 && "Where do you go?"}</p>
                    {this.getButtonPad()}
                </div>
            </div>
        );
    }
}