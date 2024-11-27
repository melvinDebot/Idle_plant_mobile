import React from "react";
import {
  OxygenCounterContainer,
  OxygenCounterImage,
  OxygenCounterText,
} from "./style";
import oxygenImage from "../../../assets/images/Oxygen.png";

interface OxygenCounterProps {
  count: number;
}

const OxygenCounter: React.FC<OxygenCounterProps> = ({ count }) => {
  return (
    <OxygenCounterContainer>
      <OxygenCounterImage source={oxygenImage} />
      <OxygenCounterText>{count}</OxygenCounterText>
    </OxygenCounterContainer>
  );
};

export default OxygenCounter;
