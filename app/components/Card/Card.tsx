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

import type {ButtonType} from "../../utils/type"

interface CardProps {
  image: string;
  title: string;
  level: number;
  numberOxygen: number;
  buttonType: ButtonType;
  upgradeCost: number;
  isDisabled: boolean;
  levelCardRequired: number;
  levelUser: number;
  timer?: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  level,
  numberOxygen,
  buttonType,
  isDisabled,
  levelUser,
  timer,
  upgradeCost,
  levelCardRequired,
  onPress
}) => {
  return (
    <CardContainer>
      <CardImage source={image} />
      <CardTextContainer>
        <CardTitle>{title}</CardTitle>
        {/* TODO FIX LEVEL */}
        <CardSubTitle>Level  {level}</CardSubTitle>
        <CardText>{numberOxygen} oxygen / s</CardText>
      </CardTextContainer>
      <Button
        buttonType={levelUser < levelCardRequired ? "level" : buttonType}
        isDisabled={isDisabled}
        levelRequired={levelCardRequired}
        oxygen={upgradeCost}
        timer={timer ?? "00:00"}
        onPress={onPress}
      />
    </CardContainer>
  );
};

export default Card;
