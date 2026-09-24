import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useAppTheme } from "@/theme";
import { DynamicColorIOS, Platform } from "react-native";
export default function TabLayout() {
  const theme = useAppTheme();

  return (
    <NativeTabs
      backgroundColor={
        Platform.OS ==="ios"?
        DynamicColorIOS({
          dark: theme.card,
          light: theme.background,
        }):
        theme.tabBar}
      tintColor={theme.accent}
      labelStyle={{
        default: { color: theme.textMuted },
        selected: { color: theme.accent },
      }}
    >
      <NativeTabs.Trigger
        name="Harcamalar"
        contentStyle={{ backgroundColor: theme.background }}
      >
        <NativeTabs.Trigger.Label>Harcamalarım</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house" md="home" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
