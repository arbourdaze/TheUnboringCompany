'use strict';

//npx babel --watch src --out-dir . --presets react-app/prod

let debug = true;

let root = document.querySelector('#root');

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nonphobias: [],
            card: {
                Title: "",
                FormalTitle: "",
                Description: "",
                Phobias: [],
                Children: [],
                Parent: [],
                Image: []
            },
            foundRudder: false,
            jumpScare: false,
            error: false
        };
        this.update = this.update.bind(this);
        this.getCard = this.getCard.bind(this);
        this.getNext = this.getNext.bind(this);
        this.move = this.move.bind(this);
        this.run = this.run.bind(this);
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
                    console.log('error');
                }
            }
        });
        return card;
    }
    
    getNext(title) {
        let json = JSON.stringify({
            Title: title,
            NonPhobias: this.state.nonphobias
        });
        let response = null;
        
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/get-next',
            data: json,
            dataType: 'json',
            async: false,
            success: function (res) {
                response = res;
            },
            error: function() {
                if (debug) {
                    console.log('error');
                }
            }
        });

        return response;
    }
    
    update() {
        let phobias = this.state.card.Phobias;
        let newNonPhobias = this.state.nonphobias;
        for (let i = 0; i < phobias.length; i++) {
            if (!newNonPhobias.includes(phobias[i])) {
                newNonPhobias.push(phobias[i]);
            }
        }
        this.setState({nonphobias: newNonPhobias});
    }
    
    move(title) {
        let response = this.getNext(title);
        let nextCard = response.Card;
        let foundRudder = response.FoundRudder;
        if (!nextCard) {
            this.setState({error: true});
        }
        let that = this;
/*         let nextCard = this.getCard(title); */
        this.setState({card: nextCard}, function () {
            that.update();
        });
        this.setState({foundRudder: foundRudder}, function () {
        });
        console.log(foundRudder);
    }
    
    run() {
        this.setState({jumpScare: false});
    }
    
    render() {
        if (this.state.jumpScare) {
            return (
                <JumpScare
                    run={this.run}
                />
            );
        }
        if (this.state.error) {
            return (
                <div className="error-message">Something went horribly wrong.</div>
            );
        }
        if (this.state.foundRudder) {
            return "Oops, you're dead.";
        }
        if (this.state.card.Title === "") {
            return (
                <div className="button-pad" style={{marginTop: 10 + 'em'}}>
                    <Button
                        classes=""
                        buttonText="Begin"
                        arg="Intro"
                        callback={this.move}
                        enabler={function () {return true;}}
                    />
                </div>
            );
        }
        return (
            <div>
                <Card
                    data={this.state.card}
                    nonphobias={this.state.nonphobias}
                    move={this.move}
                    getCard={this.getCard}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    root
);