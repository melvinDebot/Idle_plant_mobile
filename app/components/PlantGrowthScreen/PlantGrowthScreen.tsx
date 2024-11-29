import React, { useRef, useEffect } from "react";
import {
  PlantGrowthScreenContainer,
  PlantGrowthScreenOverlay,
  PlantGrowthScreenItem1,
} from "./style";
import * as Haptics from "expo-haptics";
import LottieView from "lottie-react-native";

// Import des animations
import plantAnimation from "../../../assets/animation/Plant_animation.json";
import flowerAnimation from "../../../assets/animation/Flower_animation.json";
import { useUserContext } from "@/app/context/UserContext";

// Interface pour définir la structure des animations
interface AnimationData {
  level: number;
  // eslint-disable-next-line
  source: any; // type de fichier d'animation (ex: JSON)
}

interface PlantGrowthScreenProps {
  levelUser: number;
}

const PlantGrowthScreen: React.FC<PlantGrowthScreenProps> = ({ levelUser }) => {
  const { incrementOxygen } = useUserContext();
  const animation = useRef<LottieView>(null);

  // Liste des animations importées avec leur niveau
  const animationList: AnimationData[] = [
    { level: 0, source: plantAnimation },
    { level: 5, source: plantAnimation },
    { level: 15, source: flowerAnimation },
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

  const handlePress = async () => {
    // Utilise un retour haptique de type "impact" avec force
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    incrementOxygen(1);
  };

  return (
    <PlantGrowthScreenContainer onPress={handlePress}>
      <PlantGrowthScreenOverlay>
        {bestAnimation && (
          <PlantGrowthScreenItem1>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: bestAnimation.level >= 15 ? 150 : 100, // Ajuste la taille en fonction du niveau
                height: bestAnimation.level >= 15 ? 150 : 100,
              }}
              source={bestAnimation.source}
            />
          </PlantGrowthScreenItem1>
        )}
      </PlantGrowthScreenOverlay>
    </PlantGrowthScreenContainer>
  );
};

export default PlantGrowthScreen;
