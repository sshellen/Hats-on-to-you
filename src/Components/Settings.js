import React from 'react';

let gauge;
let phase;

class Settings extends React.Component{

  constructor(props) {
    super(props);
    this.state = {showGauge: false, phase:0, bestOf:50, selectedSpeed:"gradualSpeed", selectedBestOf:"bestOf50"}
  }

  showGauge = () => {
    phase = +this.state.phase;
    this.setState({showGauge:true}, () => {
      gauge = document.getElementById("settingsGauge");
      gauge.className = "";
      gauge.classList.add("gauge" + phase);
    })
  }

  hideGauge = () => {
    this.setState({showGauge:false})
  }

  updateLimit = () => {
    this.setState({"selectedBestOf": "bestOf" + this.state.bestOf});
  }

  updateSpeed = () => {
    this.setState({"selectedSpeed":  this.state.speed, phase: this.state.phase});
  }

  adjustSpeed = (e) => {
    if(e.target.name === "minus") {
      phase = phase === 0 ? 0 : phase - 1;
    } else {
      phase = phase === 4 ? 4 : phase + 1;
    }
    gauge.className = "";
    this.setState({phase,selectedSpeed:"setSpeed"}, () => {gauge.classList.add("gauge" + phase)});
  };

  componentDidUpdate(prev, curr) {
    if(this.props.bestOf !== this.state.bestOf) {
      this.setState({bestOf: this.props.bestOf}, () => {this.updateLimit()})
    }
    if(this.props.selectedSpeed !== this.state.selectedSpeed) {
      this.setState({selectedSpeed: this.props.selectedSpeed}, () => {
        if(this.props.selectedSpeed === "setSpeed") {
          this.showGauge();
        }
      })
    }
    if(this.props.phase !== this.state.phase && this.state.phase === 0) {
      this.setState({phase: this.props.phase})
    }
  }

  componentDidMount() {
    this.updateSpeed();
    this.updateLimit();
  }

  render() {
    const {closeHandler, applyChanges} = this.props;
    return (
      <div className="settings">
        <div className="header">
            <h2>Settings</h2>
            <a  name="close" className="close" onClick={e => closeHandler(e)}><span className="hidden">Click to close menu</span></a>
        </div>
        <form className="content" onSubmit={(e) => e.preventDefault()}>
          <input type="hidden" name="phase" value={this.state.phase} />
          <fieldset>
              <legend>Best out of:</legend>
                  <div className="formRow">
                      <input type="radio" name="bestOf" value="30" id="bestOf30" defaultChecked={this.state.selectedBestOf === "bestOf30"} />
                      <label htmlFor="bestOf30">30</label>
                  </div>
                  <div className="formRow">
                      <input type="radio" name="bestOf" value="50" id="bestOf50"  defaultChecked={this.state.selectedBestOf === "bestOf50"}/>
                      <label htmlFor="bestOf50">50</label>
                  </div>
                  <div className="formRow">
                      <input type="radio" name="bestOf" value="100" id="bestOf100"  defaultChecked={this.state.selectedBestOf === "bestOf100"}/>
                      <label htmlFor="bestOf100">100</label>
                  </div>
                  <div className="formRow">
                      <input type="radio" name="bestOf" value="200" id="bestOf200"  defaultChecked={this.state.selectedBestOf === "bestOf200"}/>
                      <label htmlFor="bestOf200">200</label>
                  </div>
          </fieldset>

          <fieldset>
            <legend>Speed:</legend>
              <div className="formRow">
                <input type="radio" name="speed" value="gradualSpeed" id="gradualSpeed" onClick={e => this.hideGauge(e)}  defaultChecked={this.state.selectedSpeed === "gradualSpeed"} />
                <label htmlFor="gradualSpeed">Speed up gradually</label>
              </div>
              <div className="formRow" id="speedGauge">
                <input type="radio" name="speed" value="setSpeed" id="setSpeed" onClick={e => this.showGauge(e)} defaultChecked={this.state.selectedSpeed === "setSpeed"} />
                <label htmlFor="setSpeed">Set speed</label>
                {this.state.showGauge === true &&
                <div className="sprite">
                       <a className="minus" name="minus" onClick={e => this.adjustSpeed(e)}>&ndash;</a>
                       <div className="speedGauge">
                          <img src="src/svg/speedSprite.svg" id="settingsGauge" className="gauge" />
                        </div>
                        <a className="plus" name="plus" onClick={e => this.adjustSpeed(e)}>+</a>
                  </div>
                }
              </div>


          </fieldset>

          <div className="buttons">
            <button className="left" onClick={e => closeHandler(e)}>Cancel</button>
            <button onClick={e => {applyChanges(e);closeHandler(e)}}>Apply</button>
          </div>
        </form>
      </div>
    )
  }

}

export default Settings;