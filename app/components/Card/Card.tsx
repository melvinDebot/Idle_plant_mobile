import React from "react";
import {
  CardContainer,
  CardImage,
  CardTextContainer,
  CardTitle,
  CardSubTitle,
  CardText,
} from "./style";

import Button from "../Button/Button";

interface CardProps {
  image: string;
  title: string;
  level: number;
  numberOxygen: number;
  buttonType: "upgrade" | "timer" | "level";
  isDisabled: boolean;
  levelRequired?: number;
  levelUser: number;
  timer?: string;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  level,
  numberOxygen,
  buttonType,
  isDisabled,
  levelRequired,
  levelUser,
  timer,
}) => {
  return (
    <CardContainer>
      <CardImage source={image} />
      <CardTextContainer>
        <CardTitle>{title}</CardTitle>
        <CardSubTitle>Level {level}</CardSubTitle>
        <CardText>{numberOxygen} oxygen / s</CardText>
      </CardTextContainer>
      <Button
        buttonType={buttonType}
        isDisabled={isDisabled}
        levelRequired={levelRequired ?? 0}
        levelUser={levelUser}
        oxygen={numberOxygen}
        timer={timer ?? "00:00"}
      />
    </CardContainer>
  );
};

export default Card;
