import React from "react";
import HammerJS from "HammerJS";
import ImageContext from "../Components/Context";

let hatDrop;
let hatDropLeft = 0;
let hatDropInterval;
let mc;
let speed = 5;
let phase = 1;
let eventFunction;
let total = 0;

class HatDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hat: "hat", left: 0, showSettings: false,speed: 5, speedSetting:"gradual" };
  }

  moveHatDrop = () => {
    hatDropInterval = setInterval(() => {
      hatDropLeft += speed;
      hatDrop.style.left = hatDropLeft + "px";
      if (hatDropLeft > this.props.rightWall) {
        hatDropLeft = -60;
      }
    }, 60);
  };

  componentDidMount() {
    hatDrop = document.getElementById("hatDrop");
    this.moveHatDrop();
    let el = document.querySelector("main")
    mc = new Hammer.Manager(el);
    mc.add(new Hammer.Tap());
    eventFunction = () => {
      this.props.addHat([200, parseInt(hatDropLeft + 60), true, 15, 2, -95]);
    };
    mc.on("tap", eventFunction);
  }

  componentDidUpdate(prev, curr) {
    if (this.props.phase !== phase) {
      phase = this.props.phase;
      if(phase === 1) {
        speed = 8
      }
      if(phase === 2) {
        speed = 11;
      }
      if(phase === 3) {
        speed = 14;
      }
      if(phase === 4) {
        speed = 17;
      }
    }

    if(this.state.showSettings !== this.props.showSettings) {
      this.setState({showSettings: this.props.showSettings}, () => {
        this.suppressHats()
      })
    }
  }

  suppressHats = (settings) => {
    if(this.state.showSettings ===  true) {
      mc.off("tap", eventFunction);
    } else {
      mc.on("tap", eventFunction);
    }
  }

  componentWillUnmount() {
    clearInterval(hatDropInterval);
    hatDropLeft = 0;
    hatDrop.style.left = "-60px";
    mc.off("tap", eventFunction);
    speed = 5;
  }

  render() {
    const { rightWall, hatDrop, total, showSettings } = this.props;
    return (
      <ImageContext.Consumer>
      {value => (
        <div>
          <div className="rope" />
            <div className="hatDrop" id="hatDrop">
            <img src={value.bigWheel.default} className="bigWheel" />
            <img src={value.mount.default} className="mount" />
            <img src={value.horn.default} className="horn" />
            <img
              src={value.smallWheel.default}
              className="smallWheel smallWheel1"
            />
            <img
              src={value.smallWheel.default}
              className="smallWheel smallWheel2"
            />
          </div>
        </div>
      )}
      </ImageContext.Consumer>
    );
  }
}

export default HatDrop;
