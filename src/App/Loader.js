import React from 'react';
import {Redirect} from 'react-router';
import Mirror from "../Components/Mirror";
import App from "../App/App";
import ImageContext from "../Components/Context";


let images = {};

const importImage = async (img,type) => {
  let response = await import("../" + type + "/" + img + "." + type);
  return response;
}

const getImage = async(img) => {
  let response = await importImage(img,"png").then(image => {images[img] = image});
  return response;
}

const getSVG = async(img) => {
  let response = await importImage(img,"svg").then(image => {images[img] = image});
  return response;
}

const getImages = async() => {
  await getImage("sconce");
  await getSVG("settings");
  await getSVG("speedSprite");
  await getImage("backArrow");
  await getSVG("banner");
  await getSVG("instructions");
  await getImage("bust");
  await getImage("bigWheel");
  await getImage("mount");
  await getImage("horn");
  await getImage("mirror");
  await getImage("molding");
  await getImage("smallWheel");
  await getImage("umbrellas");
  await getSVG("hat1");
  await getSVG("hat2");
  await getSVG("hat3");
  await getSVG("hat4");
  await getSVG("hat5");
  await getSVG("hat6");
  await getSVG("face1");
  await getSVG("face2");
  await getSVG("face3");
  await getSVG("face4");
  await getSVG("face5");
  await getSVG("face6");
  await getSVG("scoreCard");
  return true;
}

let ImageProvider = React.createContext(images).Provider;

class Loader extends React.Component{

  constructor(props) {
    super(props);
    this.state = {imagesLoaded: false}
  }

  getData = async () => {
    try {
      let response = await getImages()
      return response
    }
    catch (err) {
      console.log('error: ',err)
    }
  }

  componentDidMount() {
      this.getData().then(response => {
        if(response === true) {
          this.setState({imagesLoaded: true})
        }
      });

  }

  render() {
    return (
      <div>
      {this.state.imagesLoaded === false ? (
        <div className="app">
          <div className="gutter1" />
            <main>
            <div className="wall">
                <span className="spinner"><img src="./src/svg/spinner.svg" /></span>
                <div className="loading">Loading</div>
            </div>
          </main>
          <div className="gutter2" />
         </div>
        ) : (
          <ImageContext.Provider value={images}>
            <App />
          </ImageContext.Provider>
        )
      }
      </div>
    )
  }

}

export default Loader;
