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
                ID: 1,
                Title: "Introduction",
                Phobias: [],
                Description: "You open your eyes to darkness."
                    + "\n"
                    + "As you sit up to get your bearings, you realize you're on a dock."
                    + "\n"
                    + "As your eyes adjust, you make out the long shapes of buildings behind the trees on the island in front of you, but see no lights in their windows."
                    + "\n"
                    + "And something reeks."
                    + "\n"
                    + "You don't know what this place is or how you got here, but you know you shouldn't be here."
                    + "\n"
                    + "Something knocks against the dock.  You fight back a startled scream.  You turn around to find a small unmanned boat.",
                Children: [],
                Parent: null
            }
        };
        this.update = this.update.bind(this);
        this.move = this.move.bind(this);
        this.getCard = this.getCard.bind(this);
    }
    
    update(phobia, cardID) {
        let newNonPhobias = this.state.nonphobias;
        newNonPhobias = newNonPhobias.push(phobia);
        this.setState({nonphobias: newNonPhobias});
    }
    
    move(cardID) {
        this.setState({card: this.getCard(cardID)});
    }
    
    getCard(cardID) {
    }
    
    send(data, route) {
        let json = JSON.stringify(data);
        let that = this;

        function successCallback(res, that) {
            window.scrollTo(0,0);
            that.setState({submitted: false});
            that.setState({results: res});
            that.setState({submitted: true});
            if (debug) {
                console.log('success');
            }
        }

        if (debug) {
            console.log(json);
        }

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/' + route,
            data: json,
            dataType: 'json',
            success: function (res) {
                successCallback(res, that);
            },
            error: function () {
                if (debug) {
                    console.log('error');
                }
            }
        });
    }
    
    render() {
        return (
            <div>
                <Card
                    data={this.state.card}
                    nonphobias={this.state.nonphobias}
                    update={this.update}
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