import waterCanAnimation from "../../assets/animation/water_can.json";
import beeAnimation from "../../assets/animation/bee.json";
import sunAnimation from "../../assets/animation/sun.json";

export default function getAnimationScreen(animationPath: string) {
  switch (animationPath) {
    case "water_can":
      return waterCanAnimation;
    case "bee":
      return beeAnimation;
    case "sun":
      return sunAnimation;
    default:
      return "";
  }
}