import watercanImg from "../../assets/images/cards/watering_can.png"
import fertilizerImg from "../../assets/images/cards/fertilizer.png"
import fruitImg from "../../assets/images/cards/fruit.png"
import gardenerImg from "../../assets/images/cards/gardener.png"
import pollinatorImg from "../../assets/images/cards/pollinator.png"
import potImg from "../../assets/images/cards/pot.png"
import rainImg from "../../assets/images/cards/rain.png"
import sprayImg from "../../assets/images/cards/spray.png"
import sunImg from "../../assets/images/cards/sun.png"
import weedImg from "../../assets/images/cards/weed.png"
import lightImg from "../../assets/images/cards/light.png"
import cutWeedImg from "../../assets/images/cards/cut_weed.png"
import insecticideImg from "../../assets/images/cards/insecticide.png"
import phTestImg from "../../assets/images/cards/ph_test.png"

export default function getImageCard(imagePath: string) { 
  switch (imagePath) {
    case "watering_can":
      return watercanImg;
    case "fertilizer":
      return fertilizerImg;
    case "fruit":
      return fruitImg;
    case "gardener":
      return gardenerImg;
    case "pollinator":
      return pollinatorImg;
    case "pot":
      return potImg;
    case "rain":
      return rainImg;
    case "spray":
      return sprayImg;
    case "sun":
      return sunImg;
    case "weed":
      return weedImg;
    case "light":
      return lightImg;
    case "cut_weed":
      return cutWeedImg;
    case "insecticide":
      return insecticideImg;
    case "ph_test":
      return phTestImg;
    default:
      return "";
  }
}