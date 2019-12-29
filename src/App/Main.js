import React from "react";
import Hat from "../Components/Hat";
import Busts from "../Components/Busts";
import HatDrop from "../Components/HatDrop";
import Mirror from "../Components/Mirror";
import Settings from "../Components/Settings"
import styles from "../css/styles.css";

let hatArr = [];
let hatInterval;
let hatCount = 0;
let rightWall;
let appHeight;
let speedometer;

const hatHeight = 50;
const hatWidth = 50;
const bustWidth = 66;
const halfBustWidth = 33;
const halfHatWidth = 25;
const wiggleRoom = 20;
const numOfHats = 6;


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hats: [],
      busts: [],
      changedBust: "",
      total: 0,
      score: 0,
      showSettings: false,
      speed: "gradualSpeed",
      bestOf: 50,
      phase:0
    };
  }

  hitTest = () => {
    let bustArr = this.state.busts;

    hatArr.map((hat, hatInd) => {
      bustArr.map((bust, bustInd) => {
        if (
          +hat[0] + hatHeight > bust[0] &&
          +hat[0] + hatHeight < bust[0] + wiggleRoom &&
          +hat[1] + halfHatWidth > bust[1] + halfBustWidth - wiggleRoom &&
          +hat[1] + halfHatWidth < bust[1] + halfBustWidth + wiggleRoom
        ) {
          hat[2] = false;
          this.landHat(hatInd, bustInd);
        } else if (
          (+hat[0] + hatHeight > bust[0] &&
            (+hat[1] + hatWidth >= bust[1] && +hat[1] < bust[1] + bustWidth)) ||
          +hat[1] + hatWidth > rightWall ||
          +hat[1] < 0
        ) {
          let direction =
            +hat[1] < 0
              ? "right"
              : +hat[1] + hatWidth - (bust[1] + bustWidth) < 0
              ? "left"
              : "right";
          this.bounce(hatInd, direction);
        }
      });
    });
  };

  landHat = (hatInd, bustInd) => {
    let hats = this.state.hats;
    let hatObj = document.getElementById(hats[hatInd].props.id);
    this.setState(
      {
        changedBust: bustInd + "_" + hatCount + "_" + hats[hatInd].props.hatNum,
        score: this.state.score + 1
      },
      () => {
        this.removeHat(hatInd);
      }
    );
  };

  bounce = (ind, direction) => {
    let hat = hatArr[ind];
    if (direction === "left") {
      hat[5] = hat[5] - 30;
      hat[4] = -8;
      hat[3] = 5;
    } else {
      hat[5] = hat[5] + 30;
      hat[4] = 8;
      hat[3] = 5;
    }
  };

  removeHat = hat => {
    clearInterval(hatInterval);
    let hatObjs = this.state.hats;

    hatObjs = hatObjs.filter((obj, ind) => {
      return ind !== hat;
    });
    hatArr = hatArr.filter((obj, ind) => {
      return ind !== hat;
    });
    this.setState({ hats: hatObjs, total: this.state.total + 1 }, () => {
      clearInterval(hatInterval);
      if(this.state.speed === "gradualSpeed") {
        if(this.state.bestOf === 30) {
          if (this.state.total % 6 === 0) {
            speedometer.className = "";
            speedometer.classList.add("gauge" + this.state.total / 6);
            this.setState({phase: this.state.total / 6})
          }
        } else if(this.state.bestOf === 50) {
          if (this.state.total % 10 === 0) {
            speedometer.className = "";
            speedometer.classList.add("gauge" + this.state.total / 10);
            this.setState({phase: this.state.total / 10})
          }
        } else if(this.state.bestOf === 100) {
          if (this.state.total % 20 === 0) {
            speedometer.className = "";
            speedometer.classList.add("gauge" + this.state.total / 20);
            this.setState({phase: this.state.total / 20})
          }
        } else if(this.state.bestOf === 200) {
          if (this.state.total % 40 === 0) {
            speedometer.className = "";
            speedometer.classList.add("gauge" + this.state.total / 40);
            this.setState({phase: this.state.total / 40})
          }
        }
      }


      if (this.state.total >= this.state.bestOf) {
        this.props.gameOver(this.state.score, this.state.total);
      }
      this.moveHats();
    });
  };

  addHat = data => {
    let hatNum = Math.ceil(Math.random() * numOfHats);
    let hats = this.state.hats;
    hatCount += 1;
    hats.push(
      <Hat
        key={"hat" + hatCount}
        hatNum={"hat" + hatNum}
        id={"hat" + hatArr.length}
      />
    );

    data.concat("hat" + hatNum);
    hatArr.push(data);
    this.setState({ hats }, () => {
      clearInterval(hatInterval);
      this.moveHats();
    });
  };

  addBusts = busts => {
    this.setState({ busts });
  };

  moveHats = () => {
    let hats = document.getElementsByClassName("hat");

    hatInterval = setInterval(() => {
      if (hatArr.length > 0) {
        for (let i = 0; i < hats.length; i++) {
          if (hatArr[i][2] === true) {
            if (hatArr[i][0] > appHeight) {
              this.removeHat(i);
              break;
            }
            let topVal = hatArr[i][0] + hatArr[i][3];
            let leftVal = hatArr[i][1] + hatArr[i][4];
            let rotation = hatArr[i][5] + 3;

            hats[i].style.top = topVal + "px";
            hats[i].style.left = leftVal + "px";
            hats[i].style.transform = "rotate(" + rotation + "deg)";
            hats[i].style.display = "block";
            hats[i].classList.add("hatAfter");
            hatArr[i] = [
              topVal,
              leftVal,
              true,
              hatArr[i][3],
              hatArr[i][4],
              rotation
            ];
            this.hitTest();
          }
        }
      }
    }, 30);
  };

  showSettings = () => {
    this.setState({showSettings: !this.state.showSettings})
  }

  applySettings = (e) => {
    this.setState({total: 0,score:0})
    let speed = e.target.form.speed.value;
    let bestOf = e.target.form.bestOf.value;
    let phase = e.target.form.phase.value;
    if(speed === "setSpeed") {
        speedometer.className = "";
        speedometer.classList.add("gauge" + phase);
    }
    this.setState({bestOf: +bestOf, speed: speed, phase: +phase})
  }

  closeSettings = (e) => {
    e.preventDefault();
    this.setState({showSettings: false})
  };

  winResized = () => {
    appHeight = getComputedStyle(document.getElementsByClassName("app")[0])
      .height;

    appHeight = parseInt(appHeight.substr(0, appHeight.length - 2));
    rightWall = getComputedStyle(document.getElementsByTagName("main")[0])
      .width;

    rightWall = Math.round(parseInt(rightWall.substr(0, rightWall.length - 2)));
  };

  componentDidMount() {
    addEventListener("resize", () => {
      this.winResized();
    });
    appHeight = getComputedStyle(document.getElementsByClassName("app")[0])
      .height;

    appHeight = parseInt(appHeight.substr(0, appHeight.length - 2));
    rightWall = getComputedStyle(document.getElementsByTagName("main")[0])
      .width;

    rightWall = Math.round(parseInt(rightWall.substr(0, rightWall.length - 2)));

    speedometer = document.getElementById("gauge");
  }

  componentWillUnmount() {
    clearInterval(hatInterval);
    hatCount = 0;
    hatArr = [];
  }

  render() {
    const { onClickHandler, replay, bestOf, speed, phase } = this.props;
    return (
      <div className="app" id="app">
        <div className="gutter1">
          <img src="src/svg/settings.svg" width="30px"
            className="settingsIcon"
            onClick={e => this.showSettings(e)}
          />
          <img
            onClick={e => onClickHandler(e)}
            className="backArrow"
            width="30px"
            height="24px"
            src="src/png/backArrow.png"
          />
          <div className="speedSprite">
            <img src="src/svg/speedSprite.svg" id="gauge" className="gauge" />
            <div className="speedLabel">SPEED</div>
          </div>
        </div>

        <main>
          <Mirror score={this.state.score} total={this.state.total} />
          <img src="src/png/sconce.png" className="leftSconce" />
          <img src="src/png/sconce.png" className="rightSconce" />
          <HatDrop
            addHat={this.addHat}
            rightWall={rightWall}
            phase={this.state.phase}
            showSettings = {this.state.showSettings}
          />
          {this.state.hats.map(hatObj => hatObj)}
          <Busts
            addBusts={this.addBusts}
            changedBust={this.state.changedBust}
          />
          <div className="wall">
            <div className="topWall" />
            <div className="molding" />
            <div className="wallPaper" />
          </div>
          {this.state.showSettings === true &&
              <Settings
                 closeHandler={this.closeSettings}
                 applyChanges={this.applySettings}
                 bestOf={this.state.bestOf}
                 selectedSpeed={this.state.speed}
                 phase={this.state.phase}
                 />
          }
        </main>
        <div className="gutter2" />
      </div>
    );
  }
}

export default Main;
