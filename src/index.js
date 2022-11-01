import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// Squareコンポーネントは、stateを自身で管理しておらず、親であるBoardによって「制御されたコンポーネント (controlled component)」である。
function Square(props) {
  return (
    // ボタンが押されたかどうかを親に知らせるだけ
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),// squares = [null,null,null,null,null,null,null,null,null]ってこと。
      xIsNext: true  // 手番を保存している
    };
  }

  handleClick(i) {
    const copiedSquares = this.state.squares.slice();  //配列のコピーを返す(イミュータビリティの為)。 slice()は要素を切り抜く array.slice( 開始位置, 終了位置(省略可能) );
    copiedSquares[i] = this.state.xIsNext ? 'X' : 'O';  // 配列内の特定の要素にXを代入
    this.setState({
      squares: copiedSquares,
      xIsNext: !this.state.xIsNext, // 手番を保存する
    });  // 配列を配列で上書き
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ----------勝敗を判定する関数（返り値は、勝者なし：null, 勝者はX：'X', 勝者はO：'O'）----------
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

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
