import React from "react";
import {
  LevelIndicatorContainer,
  LevelIndicatorText,
  LevelIndicatorBarContainer,
  LevelIndicatorBar,
  LevelIndicatorBarOverlay,
} from "./style";

interface LevelIndicatorProps {
  level: number;
  currentOxygenForNextLevel: number;
  totalOxygenForNextLevel: number;
}

const LevelIndicator: React.FC<LevelIndicatorProps> = ({
  level,
  currentOxygenForNextLevel,
  totalOxygenForNextLevel,
}) => {
  const progress = (currentOxygenForNextLevel / totalOxygenForNextLevel) * 100;

  return (
    <LevelIndicatorContainer>
      <LevelIndicatorText>Niveau {level}</LevelIndicatorText>
      <LevelIndicatorBarContainer>
        <LevelIndicatorBar>
          <LevelIndicatorBarOverlay style={{ width: `${progress}%` }} />
        </LevelIndicatorBar>
      </LevelIndicatorBarContainer>
    </LevelIndicatorContainer>
  );
};

export default LevelIndicator;
