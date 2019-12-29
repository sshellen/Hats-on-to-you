import React from "react";
const path = "src/svg/";
import ImageContext from "../Components/Context";
const faces = {
  hat1: "face1",
  hat2: "face2",
  hat3: "face3",
  hat4: "face4",
  hat5: "face5",
  hat6: "face6"
};
const Bust = ({ id, hat = "", left, top, face }) => {
  return (
    <ImageContext.Consumer>
     {value => (
        <div id={id} className="bust" style={{ left: `${left}px`, top: `${top}px` }}>
          {typeof hat !== "undefined" && hat !== "" && (
          <div>
            <img src={value[hat].default} className={"hungHat " + hat} />
            <img src={value[faces[hat]].default} className="face" />
          </div>
          )}
          <img src={value.bust.default} height="250px" />
      </div>
    )}

    </ImageContext.Consumer>
  );
};

export default Bust;
