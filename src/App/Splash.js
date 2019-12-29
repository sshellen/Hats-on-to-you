import React from "react";
import HatDrop from "../Components/HatDrop";
import Busts from "../Components/Busts";
import Mirror from "../Components/Mirror";
import ImageContext from "../Components/Context";

const loadData = () => import("svg/scoreCard.svg");


class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showBanner: true, showScore: false } ;
  }
  play = () => {
    this.setState({ showBanner: false });
    setTimeout(() => {
      this.props.play();
    }, 2000);
  };

  playAgain = () => {
    this.setState({ showBanner: false, showScore: false });
    setTimeout(() => {
      this.props.play();
    }, 2000);
  };

  loadScoreCard = async() => {
    try{
      let response = loadData();
      return response;
    }
    catch(err) {
      return err;
    }
  }

  componentDidMount() {
    if (this.props.showScore === true) {
        this.loadScoreCard().then((img) => {
        this.setState({ showBanner: false, showScore: true});
      })

    } else {
        this.setState({ showBanner: true });
    }
  }

  componentWillUnmount() {
    this.setState({ showScore: false });
  }
  render() {
    const { play, showScore, score, total } = this.props;
    return (

      <ImageContext.Consumer>
      {value => (
      <div className="app">
        <div className="gutter1" />
        <main>
          {this.state.showBanner === true ? (
            <img
              src={value.banner.default}
              className="banner"
              onClick={this.play}
            />
          ) : this.state.showScore === true ? (
            <div className="scoreCard" onClick={this.playAgain}>
              <div className="scoreCardContent">
                You landed {score} out of {total} hats.
              </div>
            </div>
          ) : (
            <img  className="instructions" src={value.instructions.default}/>
          )}

          <Mirror />
          <img src={value.sconce.default} className="leftSconce" />
          <img src={value.sconce.default} className="rightSconce" />
          <div className="wall">
            <div className="topWall" />
            <div className="molding" />
            <div className="wallPaper" />
          </div>
        </main>
        <div className="gutter2" />
      </div>
  )}
    </ImageContext.Consumer>
    );
  }
}

export default Splash;
