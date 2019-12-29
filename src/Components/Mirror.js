import React from "react";
import ImageContext from "../Components/Context";

const Mirror = ({ score, total }) => {
  return (
    <ImageContext.Consumer>
    {value => (
      <div>
        <div className="score">
          <div className="scoreNum left"> {score} </div>
         {score !== undefined && <div>out of</div>}
          <div className="scoreNum right"> {total} </div>
        </div>

        <div className="mirrorMountLeft" />
        <img src={value.mirror.default} className="mirror" />
        <div className="mirrorMountRight" />
      </div>
    )}
    </ImageContext.Consumer>
  );
};

export default Mirror;
