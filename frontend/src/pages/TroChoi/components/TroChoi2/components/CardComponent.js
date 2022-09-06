import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import backCard from "../../../../../assets/images/viesignlogo.png";

class CardComponent extends React.Component {
  render() {
    const {
      handleChange,
      cardInfo: { fliped, url, content, id, win }
    } = this.props;

    return (
      <div className="card">
        <Flippy
          className="flippyContainer"
          style={{ display: "block", width: "100px", height: "140px" }}
          flipOnClick={true} // default false
          isFlipped={fliped}
        >
          <FrontSide
            onClick={handleChange.bind(null, id)}
            className="containerFrontSide"
          >
            <img className="backCardImage" alt="" src={backCard} />
          </FrontSide>
          <BackSide
            className="containerFlipImage"
            style={{ backgroundColor: win ? "#bfad11" : "#175852" }}
          >
            {win && <div className="winFlipImage" />}

            {url !== undefined ? (
              <video
                className="question-video"
                muted
                autoPlay
                loop
                disablePictureInPicture
                playsInline
                key={url}
              >
                <source
                  src={`https://drive.google.com/uc?export=download&id=${url}`}
                  type="video/mp4"
                />
              </video>
            ) : (
              <h2>{content}</h2>
            )}
          </BackSide>
        </Flippy>
      </div>
    );
  }
}

export default CardComponent;
