import { Image, Text, View, StyleSheet } from "react-native";
import { useAppTheme } from "@/theme";

export default function Index() {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={require("../../../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={[styles.title, { color: theme.accent }]}>Arca</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F6F5",
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 36,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F7B4A",
  },
});
