import React, { useRef, useState } from "react";
import { Dimensions, ImageSourcePropType } from "react-native";
import {
  GuideContainer,
  GuideSldes,
  GuideImage,
  GuideTitle,
  GuideText,
  GuideButton,
  GuideInput,
  GuideContainerAnswer,
} from "./style";

import step2Image from "../../../assets/images/guide/step2.png";
import step3Image from "../../../assets/images/guide/step3.png";
import step4Image from "../../../assets/images/guide/step4.png";
import gardenerAnimation from "../../../assets/animation/gardener_animation.json";

import {
  XMarkIcon,
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
} from "react-native-heroicons/solid";

import LottieView from "lottie-react-native";

interface GuideProps {
  onPress: () => void;
}

const { width } = Dimensions.get("window");

const Guide: React.FC<GuideProps> = ({ onPress }) => {
  const animation = useRef<LottieView>(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState<{
    message: string;
    hasGoodAnswer: boolean;
  }>({
    message: "",
    hasGoodAnswer: false,
  });

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (inputValue === "Jean 3:16") {
      setMessage({
        message: "Bien joué, vous avez trouvé",
        hasGoodAnswer: true,
      });
    } else {
      setMessage({ message: "Vous n'avez pas trouvé", hasGoodAnswer: false });
    }
  };

  return (
    <>
      <GuideButton onPress={onPress}>
        <XMarkIcon fill="#6aa033" size={31} />
      </GuideButton>
      <GuideContainer
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
      >
        <GuideSldes style={{ width: width }}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginBottom: 20,
            }}
            source={gardenerAnimation}
          />
          <GuideTitle>Bienvenue, jeune pousse ! </GuideTitle>
          <GuideText>
            Salut, futur maître jardinier ! Ton but ici est simple : élever une
            plante et la faire grandir jour après jour. Pas de stress, pas
            besoin d’un diplôme en botanique !
          </GuideText>
          <ArrowLongRightIcon fill="white" size={31} />
        </GuideSldes>

        <GuideSldes style={{ width: width }}>
          <GuideImage source={step2Image as ImageSourcePropType} />
          <GuideTitle>Étape 1 : Comment respirer </GuideTitle>
          <GuideText>
            Tapote sur l’écran pour récolter de l’oxygène. Plus tu tapotes, plus
            ta plante est heureuse (et toi, plus en sueur).
          </GuideText>
          <ArrowLongRightIcon fill="white" size={31} />
        </GuideSldes>

        <GuideSldes style={{ width: width }}>
          <GuideImage source={step3Image as ImageSourcePropType} />
          <GuideTitle>Étape 2 : Utilise tes boosters ! </GuideTitle>
          <GuideText>
            Tu vois ces jolis boutons ? Ils sont là pour dépenser ton oxygène et
            accélérer la croissance de ta plante. Un petit coup d’engrais ou une
            touche de soleil, et hop, ta plante te dit merci !
          </GuideText>
          <ArrowLongRightIcon fill="white" size={31} />
        </GuideSldes>

        <GuideSldes style={{ width: width }}>
          <GuideImage source={step4Image as ImageSourcePropType} />
          <GuideTitle>Étape 3 : Niveaux et évolution </GuideTitle>
          <GuideText>
            Accumule de l’oxygène, monte en niveau, et regarde ta plante devenir
            une star végétale. Chaque étape de croissance est un nouveau
            spectacle à admirer !
          </GuideText>
          <ArrowLongRightIcon fill="white" size={31} />
        </GuideSldes>

        <GuideSldes
          style={{ width: width, justifyContent: "start", marginTop: 60 }}
        >
          <GuideTitle>Easter egg </GuideTitle>
          <GuideText>
            Je contiens un code. Quatre chiffres me guident : 4316.
          </GuideText>
          <GuideText>
            Le premier chiffre t’emmène au livre écrit par le disciple
            bien-aimé.
          </GuideText>
          <GuideText>
            Les deux suivants te placent au cœur du chapitre qui parle de la
            nouvelle naissance.
          </GuideText>
          <GuideText>Le dernier chiffre pointe vers la clé du salut.</GuideText>
          <GuideText
            style={[{ color: message.hasGoodAnswer ? "green" : "red" }]}
          >
            {message.message}
          </GuideText>
          <GuideInput
            placeholder="Entrez le verset"
            value={inputValue}
            onChangeText={handleInputChange}
            onSubmitEditing={handleSubmit}
            placeholderTextColor="gray"
          />
          {message.hasGoodAnswer && (
            <GuideContainerAnswer>
              <GuideText style={{ color: "black" }}>
                Car Dieu a tant aimé le monde qu’il a donné son Fils unique,
                afin que quiconque croit en lui ne périsse point, mais qu’il ait
                la vie éternelle.
              </GuideText>
              <GuideText style={{ color: "black" }}>Jean 3:16</GuideText>
            </GuideContainerAnswer>
          )}
          <ArrowLongLeftIcon fill="white" size={31} />
        </GuideSldes>
      </GuideContainer>
    </>
  );
};

export default Guide;
