import { useColorScheme } from "react-native";

export const colors = {
  light: {
    background: "#F4F6F5",
    tabBar: "#FFFFFF",
    card: "#FFFFFF",
    accent: "#0F7B4A",
    text: "#10251C",
    textMuted: "#5A6B64",
  },
  dark: {
    background: "#10251C",
    tabBar: "#163328",
    card: "#1A3A2E",
    accent: "#0F7B4A",
    text: "#F4F6F5",
    textMuted: "#A8B8B2",
  },
};

export function useAppTheme() {
  const isDark = useColorScheme() === "dark";
  return isDark ? colors.dark : colors.light;
}
