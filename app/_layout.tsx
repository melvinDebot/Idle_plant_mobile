import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "./context/UserContext";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";

const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  backgroundScreen: "#E6F3D4",
  backgroundOxygenCounter: "#E6F3D4",
  levelIndicator: {
    background: "#CEE9AD",
    fill: "#385420",
  },
  card: {
    background: "#FFFFFF",
    subtitle: "#568828",
  },
  tabs: {
    background: "white",
    text: "black",
    backgroundActive: "#568828",
    textActive: "white",
  },
};

const darkTheme = {
  background: "#1B1B1B",
  text: "#FFFFFF",
  backgroundScreen: "#17270C",
  backgroundOxygenCounter: "#17270C",
  levelIndicator: {
    background: "#91C754",
    fill: "#17270C",
  },
  card: {
    background: "#2E3C34",
    subtitle: "#CEE9AD",
  },
  tabs: {
    background: "#2E3C34",
    text: "white",
    backgroundActive: "#E6F3D4",
    textActive: "black",
  },
};

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ThemeProvider>
    </UserProvider>
  );
}
