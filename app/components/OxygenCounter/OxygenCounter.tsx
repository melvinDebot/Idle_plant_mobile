import React from "react";
import {
  OxygenCounterContainer,
  OxygenCounterImage,
  OxygenCounterText,
} from "./style";
import oxygenImage from "../../../assets/images/Oxygen.png";
import formatNumber from "../../utils/function";

interface OxygenCounterProps {
  count: number;
}

const OxygenCounter: React.FC<OxygenCounterProps> = ({ count }) => {
  return (
    <OxygenCounterContainer>
      <OxygenCounterImage source={oxygenImage} />
      <OxygenCounterText>{formatNumber(count)}</OxygenCounterText>
    </OxygenCounterContainer>
  );
};

export default OxygenCounter;
