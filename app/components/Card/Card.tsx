import React from "react";
import {
  CardContainer,
  CardImage,
  CardTextContainer,
  CardTitle,
  CardSubTitle,
  CardText,
  CardOverlay,
  CardWrapper
} from "./style";

import Button from "../Button/Button";

import type { ButtonType } from "../../utils/type"

import {ImageSourcePropType} from "react-native";

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
  isOverlay?: boolean;
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
  isOverlay,
  onPress
}) => {
  return (
    <CardContainer>
      {isOverlay && <CardOverlay />}
      <CardWrapper>
      <CardImage source={image as ImageSourcePropType} />
      <CardTextContainer>
        <CardTitle>{title}</CardTitle>
        {/* TODO FIX LEVEL */}
        <CardSubTitle>Niveau  {level}</CardSubTitle>
        <CardText>{numberOxygen} oxygen / s</CardText>
      </CardTextContainer>
      {level < 100 && (
        <Button
          buttonType={levelUser < levelCardRequired ? "level" : buttonType}
          isDisabled={isDisabled}
          levelRequired={levelCardRequired}
          oxygen={upgradeCost}
          timer={timer ?? "00:00"}
          onPress={onPress}
        />
      )}
      
    </CardWrapper>
    </CardContainer>
    
  );
};


export default Card;
