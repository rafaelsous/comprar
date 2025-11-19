import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
