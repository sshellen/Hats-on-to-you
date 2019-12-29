import React from 'react';
import ImageContext from "../Components/Context";

const path ="src/svg/"

const Hat = ({hatNum, width, id}) => (
  <ImageContext.Consumer>
    {value => (
      <img className="hat" src={value[hatNum].default} width={width} id={id} />

    )}
  </ImageContext.Consumer>

)


export default Hat;