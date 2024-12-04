import React, { useState, useEffect } from "react";
import { View, ImageSourcePropType } from "react-native";

import {
  ButtonContainer,
  ButtonText,
  ButtonContainerText,
  ButtonContainerOxygenText,
  ButtonImage,
  ButtonTimeContainer,
} from "./style"; // Assurez-vous de définir les styles appropriés pour `ButtonContainer` et `ButtonText`

import oxygenImage from "../../../assets/images/Oxygen.png";

import type { ButtonType } from "../../utils/type"
import formatNumber from "../../utils/function";

interface LevelIndicatorProps {
  buttonType: ButtonType;
  isDisabled: boolean;
  levelRequired: number;
  oxygen: number;
  timer: string;
  onPress?: () => void;
}

const Button: React.FC<LevelIndicatorProps> = ({
  levelRequired,
  buttonType,
  isDisabled,
  oxygen,
  timer,
  onPress
}) => {
  // Vérification si le niveau de l'utilisateur est suffisant

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timer);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  // Fonction pour démarrer le timer
  const startTimer = () => {
    if (!isTimerActive && onPress) {
      onPress()
      setIsTimerActive(true);
      const [minutes, seconds] = timer.split(":").map(Number);
      let totalSeconds = minutes * 60 + seconds;

      const interval = setInterval(() => {
        totalSeconds -= 1;
        const minutesLeft = Math.floor(totalSeconds / 60);
        const secondsLeft = totalSeconds % 60;
        setTimeLeft(
          `${minutesLeft
            .toString()
            .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`
        );

        if (totalSeconds <= 0) {
          clearInterval(interval);
          setIsTimerActive(false);
          setTimeLeft(timer); // Réinitialise le timer
        }
      }, 1000);

      setTimerInterval(interval);
    }
  };

  // Nettoyage de l'intervalle lorsqu'on quitte le composant
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  // Calcul de la largeur en pourcentage basée sur le temps restant
  // Calcul de la largeur en pourcentage basée sur le temps restant
  const calculateWidth = () => {
    const [initialMinutes, initialSeconds] = timer.split(":").map(Number);
    const initialTotalSeconds = initialMinutes * 60 + initialSeconds;

    const [currentMinutes, currentSeconds] = timeLeft.split(":").map(Number);
    const currentTotalSeconds = currentMinutes * 60 + currentSeconds;

    // Inverser le calcul pour que la largeur augmente avec le temps
    const widthPercentage =
      ((initialTotalSeconds - currentTotalSeconds) / initialTotalSeconds) * 100;
    return `${widthPercentage}%`;
  };

  switch (buttonType) {
    case "upgrade":
      return (
        <ButtonContainer disabled={isDisabled} onPress={onPress}>
          <ButtonContainerText>
            <ButtonText>Amélioration</ButtonText>
            <ButtonContainerOxygenText>
              <ButtonImage source={oxygenImage as ImageSourcePropType} />
              <ButtonText>{formatNumber(oxygen)}</ButtonText>
            </ButtonContainerOxygenText>
          </ButtonContainerText>
        </ButtonContainer>
      );
    
    case "decoration":
      return (
        <ButtonContainer disabled={isDisabled} onPress={onPress}>
          <ButtonContainerText>
            <ButtonText>Amélioration</ButtonText>
            <ButtonContainerOxygenText>
              <ButtonImage source={oxygenImage as ImageSourcePropType} />
              <ButtonText>{formatNumber(oxygen)}</ButtonText>
            </ButtonContainerOxygenText>
          </ButtonContainerText>
        </ButtonContainer>
      );

    case "timer":
      return (
        <ButtonTimeContainer disabled={isTimerActive} onPress={startTimer}>
          <ButtonText>{timeLeft}</ButtonText>
          <View
            style={{
              backgroundColor: "black",
              width: calculateWidth(),
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: 7,
              zIndex: -1,
              opacity: 0.2,
            }}
          ></View>
        </ButtonTimeContainer>
      );

    case "level":
      return (
        <ButtonContainer disabled={true}>
          <ButtonText>Niveau {levelRequired}</ButtonText>
        </ButtonContainer>
      );

    default:
      return null;
  }
};

export default Button;
