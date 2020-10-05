import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button } from 'react-native';


const VALUES = {
    CROSS: '✗',
    ZERO: '○',
    EMPTY: '',
};

class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text onPress={this.props.onPress} style={styles.square}>
                {this.props.value}
            </Text>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            winner: null,
            nextTurn: true,
            squares: this.getInitialArray(),
            currentPlayer: VALUES.CROSS,
        };
    }

    getInitialArray() {
        return Array(9).fill(VALUES.EMPTY);
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    initBoard() {
        this.setState({
            winner: null,
            nextTurn: true,
            currentPlayer: VALUES.CROSS,
            squares: this.getInitialArray(),
        });
    }

    handleClick(index) {
        const currSquares = this.state.squares;
        if (!this.state.nextTurn || currSquares[index] !== VALUES.EMPTY) {
            return false;
        }

        const player = this.state.currentPlayer;

        currSquares[index] = player;
        const winner = this.calculateWinner(currSquares);

        this.setState({
            winner: winner,
            nextTurn: !winner && currSquares.includes(VALUES.EMPTY),
            squares: currSquares,
            currentPlayer: player === VALUES.CROSS
                ? VALUES.ZERO
                : VALUES.CROSS,
        });
    }

    getStatus() {
        const winner = this.state.winner;
        if (winner) {
            return `Winner: ${winner}`;
        } else if (!this.state.nextTurn) {
            return 'No winner, try again!';
        } else {
            return `Next player: ${this.state.currentPlayer}`;
        }
    }

    render() {
        const status = this.getStatus();
        // const nextTurn = this.state.nextTurn;
        const { nextTurn } = this.state;
        return (
            <View>
                <View style={{ opacity: nextTurn ?  1 : 0.5 }}>
                    <View style={{ flexDirection:"row",  }}>
                        <Square value={this.state.squares[0]} onPress={() => this.handleClick(0)}/>
                        <Square value={this.state.squares[1]} onPress={() => this.handleClick(1)}/>
                        <Square value={this.state.squares[2]} onPress={() => this.handleClick(2)}/>
                    </View>

                    <View style={{ flexDirection:"row" }}>
                        <Square value={this.state.squares[3]} onPress={() => this.handleClick(3)}/>
                        <Square value={this.state.squares[4]} onPress={() => this.handleClick(4)}/>
                        <Square value={this.state.squares[5]} onPress={() => this.handleClick(5)}/>
                    </View>

                    <View style={{ flexDirection:"row" }}>
                        <Square value={this.state.squares[6]} onPress={() => this.handleClick(6)}/>
                        <Square value={this.state.squares[7]} onPress={() => this.handleClick(7)}/>
                        <Square value={this.state.squares[8]} onPress={() => this.handleClick(8)}/>
                    </View>
                </View>

                <Text style={styles.status}> {status} </Text>

                <Button
                    color='pink'
                    title="Play again"
                    onPress={() => this.initBoard()}
                />
            </View>
        );
    }
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <Board />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    square: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

        lineHeight: 60,
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 30,
    },
    status: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
});
