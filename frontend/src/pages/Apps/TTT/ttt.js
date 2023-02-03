import React from 'react';
import './ttt.css';
import RainbowTitle from '../../../components/rainbow-hr/rainbow-hr';

export default function TTT() {
    return (
        <>
        <div className="section-1">
            <div className="content w-75 py-5 m-auto">
                <RainbowTitle title='Tic-Tac-Toe' thickness='3px' width='100px' />
                <p className='fs-5'>
                    This is the first React component I wrote as my introduction to the framework.
                    It's a tic-tac-toe game following the tutorial in the React documentation.
                    I also added a few minor features, such as better win tracking and status.
                </p>
            </div>
        </div>
        <div className="section-2">
            <div className="content w-75 py-5 m-auto">
                <Game />
            </div>
        </div>
        </>
    );
}


function Square(props) {
    return (
        <button className="square border rounded-0 border-3 border-dark bg-transparent fw-bold p-0 text-center float-start" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
            xWins: 0,
            oWins: 0,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const winner = calculateWinner(squares);
        if (winner) {
            this.CalculateWins(winner);
        }

        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    newGame() {
        this.setState({
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        });
    }

    CalculateWins(winner) {
        var xWins = this.state.xWins;
        var oWins = this.state.oWins;

        if (winner === 'X') {
            xWins += 1;
        } else if (winner === 'O') {
            oWins += 1;
        }

        this.setState({
            xWins: xWins,
            oWins: oWins,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let boardFull = isBoardFull(current.squares);
        const xWins = this.state.xWins;
        const oWins = this.state.oWins;

        const moves = history.slice(1).map((step, move) => {
            const desc = (move + 1);
            return (
                <button className="btn btn-outline-primary bg-light py-0 px-2 text-primary" key={move + 1} onClick={() => this.jumpTo(move + 1)}>
                    {desc}
                </button>
            );
        });

        let status;
        if (winner) {
            status = (
                <div className="h5 alert alert-success border py-2 mb-0 d-inline-block">
                    Winner: <strong className="font-monospace">{winner}</strong>
                </div>
            );
        } else if (boardFull) {
            status = (
                <div className="h5 alert alert-danger border py-2 mb-0 d-inline-block">
                    Board is full
                </div>
            );
        } else {
            status = (
                <div className="h5 alert bg-light text-dark border py-2 mb-0 d-inline-block">
                    Next player: <strong className="font-monospace">{(this.state.xIsNext ? 'X' : 'O')}</strong>
                </div>
            );
        }

        return (
            <div className="game">
                <div className="game-board d-flex justify-content-center">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info m-auto">
                    <div className="d-flex align-items-center justify-content-center" style={{ height: '50px' }}>
                        <div className="btn-group" role="group">
                            {moves}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-7 col-md-5 col-lg-3">
                            <h3 className="text-center">Score</h3>
                            <ul className="list-group m-auto" style={{ maxWidth: '200px' }}>
                                <li className="h5 my-0 list-group-item d-flex justify-content-between align-items-center bg-light">
                                    X wins
                                    <span className="badge bg-success rounded-pill text-light">
                                        {xWins}
                                    </span>
                                </li>
                                <li className="h5 my-0 list-group-item d-flex justify-content-between align-items-center bg-light">
                                    O wins:
                                    <span className="badge bg-success rounded-pill text-light">
                                        {oWins}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-7 col-md-5 col-lg-3 text-center">
                            <h3 className="text-center">Status</h3>
                            {status}
                            <div className="mt-2">
                                <button className="btn btn-primary" onClick={() => this.newGame()}>
                                    New Game
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function isBoardFull(squares) {
    let full = true;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] == null) {
            full = false;
        }
    }
    return full;
}

function calculateWinner(squares) {
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