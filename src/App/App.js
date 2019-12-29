import React from "react";
import Splash from "./Splash";
import Main from "./Main";
import ImageContext from "../Components/Context";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMain: false, showScore: false,bestOf:50,speed:"gradual" };
  }

  play = () => {
    this.setState({ showMain: true });
  };

  replay = () => {
    this.setState({ showMain: false, showScore: false });
  };

  showSettings = (show) => {
    this.setState({showSettings:show})
  }

  gameOver = (score, total) => {
    this.setState({ showMain: false, showScore: true, score, total });
  };

  render() {
    return (
      <div>
        {this.state.showMain === true ? (
            <Main
            onClickHandler={this.replay}
            showSettings={this.showSettings}
            gameOver={this.gameOver}
            replay={this.replay}
            />

          ) : (
            <Splash
            play={this.play}
            showScore={this.state.showScore}
            score={this.state.score}
            total={this.state.total}
            />
          )}
      </div>
    );
  }
}

export default App;
