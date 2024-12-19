import React, { useRef, useEffect, useState } from "react";
import {
  PlantGrowthScreenContainer,
  PlantGrowthScreenOverlay,
  PlantGrowthScreenItem1,
  PlantGrowthScreenLayer,
} from "./style";
import * as Haptics from "expo-haptics";
import LottieView, { AnimatedLottieViewProps } from "lottie-react-native";

// Import des animations
import plantAnimation from "../../../assets/animation/Plant_animation.json";
import flowerAnimation from "../../../assets/animation/Flower_animation.json";
import firAnimation from "../../../assets/animation/fir_animation.json";
import grassAnimation from "../../../assets/animation/grass_animation.json";
import treeAnimation from "../../../assets/animation/tree_animation.json";
import rainAnimation from "../../../assets/animation/rain_animation.json";
import heartAnimation from "../../../assets/animation/heart_animation.json";

// Import des animations screen
import waterCanAnimation from "../../../assets/animation/water_can.json";
import sprayImg from "../../../assets/images/screen/spray.png";
import fertilizerImg from "../../../assets/images/screen/Fertilizer.png";
import weedImg from "../../../assets/images/screen/weed.png";

// Import des animations screen timer
import beeAnimation from "../../../assets/animation/bee.json";
import sunAnimation from "../../../assets/animation/sun.json";

// Import context pour récupérer les données de l'utilisateur
import { useUserContext } from "@/app/context/UserContext";

import { GestureResponderEvent, Image } from "react-native";

import BubbleAnimation from "../Bubble/Bubble";
import LayoutAnimation from "../LayoutAnimation/LayoutAnimation";
import { ItemCardType } from "@/app/utils/type";

// Interface pour définir la structure des animations
interface AnimationData {
  level: number;
  source: AnimatedLottieViewProps["source"]; // type de fichier d'animation (ex: JSON)
  width: number;
  height: number;
}

// Interface pour définir la structure des animations
interface AnimationScreenData {
  width: number;
  height: number;
  source: AnimatedLottieViewProps["source"]; // type de fichier d'animation (ex: JSON)
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  imageKey: string;
  timer?: string;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
}

interface PlantGrowthScreenProps {
  levelUser: number;
  activeTimerItems: ItemCardType[];
}

const PlantGrowthScreen: React.FC<PlantGrowthScreenProps> = ({
  levelUser,
  activeTimerItems,
}) => {
  const { incrementOxygen, activeItems, isVibration } = useUserContext();
  const animation = useRef<LottieView>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [clickCount, setClickCount] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  // Liste des animations importées avec leur niveau
  const animationList: AnimationData[] = [
    {
      level: 0,
      source: plantAnimation,
      width: 100,
      height: 100,
    }, // plantAnimation 100 100
    {
      level: 20,
      source: grassAnimation,
      width: 100,
      height: 100,
    },
    {
      level: 10,
      source: flowerAnimation,
      width: 150,
      height: 150,
    },
    {
      level: 40,
      source: treeAnimation,
      width: 200,
      height: 200,
    },
    {
      level: 55,
      source: firAnimation,
      width: 200,
      height: 200,
    },
  ];

  // Liste des animations screen
  const animationListScreen: AnimationScreenData[] = [
    {
      width: 50,
      height: 50,
      source: sprayImg,
      right: 50,
      bottom: 20,
      imageKey: "spray",
    },
    {
      width: 50,
      height: 50,
      source: fertilizerImg,
      left: 20,
      bottom: 0,
      imageKey: "fertilizer",
    },
    {
      width: 50,
      height: 50,
      source: weedImg,
      right: 90,
      bottom: -10,
      imageKey: "weed",
    },
  ];

  const animationScreenTimer: AnimationScreenData[] = [
    {
      width: 100,
      height: 100,
      source: waterCanAnimation,
      right: 80,
      bottom: 0,
      imageKey: "watering_can",
    },
    {
      width: 100,
      height: 100,
      source: beeAnimation,
      left: 100,
      bottom: 0,
      imageKey: "pollinator",
    },
    {
      width: 100,
      height: 100,
      source: sunAnimation,
      right: 0,
      top: 0,
      imageKey: "sun",
    },
    {
      width: 100,
      height: 100,
      source: rainAnimation,
      left: 50,
      top: 0,
      imageKey: "rain",
    },
  ];

  // Fonction qui retourne l'animation la plus avancée possible pour le niveau de l'utilisateur
  const getBestAnimationForLevel = () => {
    return animationList
      .filter((animation) => levelUser >= animation.level)
      .sort((a, b) => b.level - a.level)[0]; // Prend la dernière animation disponible
  };

  // Animation à afficher, qui est la plus avancée en fonction du niveau
  const bestAnimation = getBestAnimationForLevel();

  useEffect(() => {
    // Démarre l'animation à l'ouverture du composant
    if (animation.current && bestAnimation) {
      animation.current.play();
    }
  }, [bestAnimation]);

  useEffect(() => {
    if (clickCount > 0) {
      const timeout = setTimeout(() => {
        setClickCount(0);
        setShowAnimation(false);
      }, 1000); // Réinitialisez le compteur de clics après 1 seconde d'inactivité

      return () => clearTimeout(timeout);
    }
  }, [clickCount]);

  const handlePress = async (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const newBubble: Bubble = {
      id: Date.now(),
      x: locationX,
      y: locationY,
    };

    // Utilisez un retour haptique de type "impact" avec force
    if (isVibration) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // Ajoutez la bulle à l'état
    setBubbles((prevBubbles) => [...prevBubbles, newBubble]);

    // Supprimez la bulle après l'animation
    setTimeout(() => {
      setBubbles((prevBubbles) =>
        prevBubbles.filter((bubble) => bubble.id !== newBubble.id)
      );
    }, 700); // Durée de l'animation
    incrementOxygen(1);

    // Incrémentez le nombre de clics
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount > 50) {
        setShowAnimation(true);
      }
      return newCount;
    });
  };

  return (
    <PlantGrowthScreenContainer onPress={handlePress}>
      <PlantGrowthScreenLayer>
        <PlantGrowthScreenOverlay>
          {showAnimation && (
            <LottieView
              autoPlay
              style={{
                width: 100,
                height: 100,
                position: "absolute",
                left: 100,
                bottom: 0,
              }}
              source={heartAnimation}
            />
          )}
          {bubbles.map((bubble) => (
            <BubbleAnimation key={bubble.id} x={bubble.x} y={bubble.y} />
          ))}
          {bestAnimation && (
            <PlantGrowthScreenItem1>
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: bestAnimation.width,
                  height: bestAnimation.height,
                }}
                source={bestAnimation.source}
              />
            </PlantGrowthScreenItem1>
          )}
        </PlantGrowthScreenOverlay>
        {activeItems.map((item) => {
          if (levelUser >= item.levelRequired) {
            const animationScreen = animationListScreen.find(
              (anim) => anim.imageKey === item.imageKey
            );
            if (animationScreen) {
              return (
                <LayoutAnimation
                  key={item.id}
                  width={animationScreen.width}
                  height={animationScreen.height}
                  top={animationScreen.top}
                  left={animationScreen.left}
                  right={animationScreen.right}
                  bottom={animationScreen.bottom}
                >
                  <Image
                    source={animationScreen.source}
                    style={{
                      width: animationScreen.width,
                      height: animationScreen.height,
                    }}
                  />
                </LayoutAnimation>
              );
            }
          }
          return null;
        })}

        {activeTimerItems.map((item) => {
          const animationScreen = animationScreenTimer.find(
            (anim) => anim.imageKey === item.imageKey
          );
          if (animationScreen) {
            return (
              <LottieView
                key={item.id}
                autoPlay
                style={{
                  width: animationScreen.width,
                  height: animationScreen.height,
                  position: "absolute",
                  top: animationScreen.top,
                  left: animationScreen.left,
                  right: animationScreen.right,
                  bottom: animationScreen.bottom,
                }}
                source={animationScreen.source}
              />
            );
          }
          return null;
        })}
      </PlantGrowthScreenLayer>
    </PlantGrowthScreenContainer>
  );
};

export default PlantGrowthScreen;
