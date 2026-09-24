import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Screen({ children, style }: Props) {
  return (
    <SafeAreaView edges={["top"]} style={[{ flex: 1}, style]}>
      {children}
    </SafeAreaView>
  );
}

export default Screen;
