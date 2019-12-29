import React from "react";
import Bust from "./Bust";
import ImageContext from "../Components/Context";

let bustsTop;
let total;
let umbrellas;
let bustArr = [];
let bustInterval;
let bustCount = 0;
let currChangedBust = "";
let bustHeight = 250;
let speed = 5;

class Busts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { busts: [], changedBust: "" };
  }

  moveBusts = () => {
    let busts = document.getElementsByClassName("bust");

    bustInterval = setInterval(() => {
      for (let i = 0; i < busts.length; i++) {
        let bustLeft = bustArr[i][1] - speed;
        busts[i].style.left = bustLeft + "px";
        bustArr[i][1] = bustLeft;
        if (bustLeft === -200) {
          bustArr.splice(0, 1);
          let rightMost = bustArr[bustArr.length - 1][1];
          bustArr.push([bustsTop, parseInt(800), ""]);

          this.addBusts();
        }
      }
    }, 60);
  };

  addBusts = () => {
    let bustObjs = [];
    bustArr.map((bustData, ind) => {
      bustCount += 1;
      bustObjs.push(
        <Bust
          key={"bust" + ind}
          height="200px"
          id={"bust" + bustCount}
          left={bustData[1]}
          hat={bustData[2]}
          face={bustData[3]}
          top={bustData[0]}
        />
      );
    });

    this.setState({ busts: bustObjs }, () => {
      this.props.addBusts(bustArr);
    });
  };

  componentDidUpdate(prev, curr) {
    if (this.props.changedBust !== currChangedBust) {
      currChangedBust = this.props.changedBust;
      this.changedBust(this.props.changedBust);
    }
  }
  changedBust(bust) {
    let arr = bust.split("_");
    bustArr = bustArr.map((val, ind) => {
      if (ind === +arr[0]) {
        return [bustsTop, val[1], arr[2]];
      } else {
        return val;
      }
    });

    this.addBusts();
  }

  winResized = () => {
    bustsTop = getComputedStyle(document.getElementsByClassName("app")[0])
      .height;

    bustsTop = parseInt(bustsTop.substr(0, bustsTop.length - 2)) - bustHeight;

    bustArr = [
      [bustsTop, 0],
      [bustsTop, 200],
      [bustsTop, 400],
      [bustsTop, 600],
      [bustsTop, 800]
    ];
    this.addBusts();
  };

  componentDidMount() {
    addEventListener("resize", () => {
      this.winResized();
    });
    bustsTop = getComputedStyle(document.getElementsByClassName("app")[0])
      .height;

    bustsTop = parseInt(bustsTop.substr(0, bustsTop.length - 2)) - bustHeight;

    bustArr = [
      [bustsTop, 0],
      [bustsTop, 200],
      [bustsTop, 400],
      [bustsTop, 600],
      [bustsTop, 800]
    ];
    this.addBusts();
    this.moveBusts();
  }

  componentWillUnmount() {
    clearInterval(bustInterval);
  }
  render() {
    const { changedBust } = this.props;
    return (
      <ImageContext.Consumer>
      {value => (
        <div>
          <div className="busts">{this.state.busts.map(bustObj => bustObj)}</div>
        </div>
      )}
      </ImageContext.Consumer>
    );
  }
}

export default Busts;
