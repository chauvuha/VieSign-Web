import React, { useState, useEffect } from "react";
import CardComponent from "../components/CardComponent";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./flipcard.css";

const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const generatedId = () => Math.random().toString(36).substr(2, 9);

const generateList = (listFlipData) => {
  const flipcards = getShuffledArr(listFlipData);
  return flipcards.map((e) => {
    const freezeObj = Object.assign({}, e);
    freezeObj.id = generatedId();
    freezeObj.fliped = false;
    return freezeObj;
  });
};

const FlipGameContainers = ({ cards, setScore, timesUp, score, setReload }) => {
  const [state, setState] = useState({
    cards: generateList(cards),
    gameTurn: 1,
    isWinned: false,
    onAnimation: false,
  });

  //POP-UP
  const [displayBasic, setDisplayBasic] = useState(false);
  const navigate = useNavigate();
  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Chơi lại"
          icon="pi pi-replay"
          onClick={() => {
            onHide(name);
            navigate(0);
          }}
          className="p-button-text"
          id="no-play-game"
        />
        <Button
          label="Quay lại"
          icon="pi pi-arrow-left"
          onClick={() => {
            onHide(name);
            navigate("/trochoi");
          }}
          autoFocus
          id="yes-play-game"
        />
      </div>
    );
  };

  useEffect(() => {
    if (!state.isWinned && !state.cards.find((card) => !card.win)) {
      setState({ ...state, isWinned: true });
    }
    let temp = state.cards.map((item) => item.win).filter((item) => item);
    setScore((temp.length / 2) * 10);
    if (state.isWinned || timesUp) {
      dialogFuncMap.displayBasic(true);
      setReload(true);
    }
  }, [state, timesUp]);

  const viewFlipCard = (id) => {
    const cardsUpdate = state.cards.map((card) => {
      const copyCard = { ...card };
      if (copyCard.id === id) copyCard.fliped = true;
      return copyCard;
    });

    if (!state.onAnimation) {
      setState({
        ...state,
        gameTurn: state.gameTurn === 1 ? 2 : 1,
        cards: cardsUpdate,
        onAnimation: state.gameTurn === 2,
      });
    }
    return cardsUpdate;
  };

  const findCardsWin = (cardsUpdate, id) => {
    let indexWin;
    return {
      cardsToUpdate: cardsUpdate.map((card) => {
        const copyCard = { ...card };
        if (copyCard.id === id) {
          const res = cardsUpdate.find(
            (cardFind) =>
              cardFind.content === card.content && cardFind.id !== card.id
          );

          if (res.fliped) {
            copyCard.win = true;
            copyCard.fliped = true;
            indexWin = res.id;
          }
        }
        return copyCard;
      }),
      indexWin,
    };
  };

  const toogleFlipCard = (id, cardsUpdate) => {
    const { cardsToUpdate, indexWin } = findCardsWin(cardsUpdate, id);

    if (indexWin) {
      const cardWin = cardsToUpdate.find((res) => res.id === indexWin);
      cardWin.win = true;
      cardWin.fliped = true;
    }

    //reset toggle all cards
    if (state.gameTurn === 2 && !indexWin) {
      cardsToUpdate.map((card) => {
        if (!card.win) card.fliped = false;
        return card;
      });
    }

    if (!state.onAnimation && state.gameTurn === 2) {
      setTimeout(() => {
        setState({
          ...state,
          cards: cardsToUpdate,
          gameTurn: state.gameTurn === 1 ? 2 : 1,
          onAnimation: false,
        });
      }, 650);
    }
  };

  const handleChange = (id) => {
    const cardUpdate = viewFlipCard(id);
    toogleFlipCard(id, cardUpdate);
  };

  const generateCards = () => {
    return Array.from(state.cards).map((cardInfo, id) => {
      return (
        <CardComponent
          key={id}
          handleChange={handleChange}
          cardInfo={cardInfo}
        />
      );
    });
  };

  return (
    <>
      <div>{generateCards()}</div>
      <Dialog
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <div className="congra-img">
          <img
            alt="card"
            src={
              require("../../../../../assets/images/congratulations.png")
                .default
            }
          />
        </div>
        <div className="congra-txt">
          <p style={{ color: "#026670" }}>
            Chúc mừng bạn đã hoàn thành với điểm số là:
          </p>
          <p className="congra-score">{score}</p>
        </div>
      </Dialog>
    </>
  );
};

export default FlipGameContainers;
