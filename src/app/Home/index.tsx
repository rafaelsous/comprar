import { Image, Text, View } from "react-native";

import { styles } from "./styles";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <Text>Content</Text>
      </View>
    </View>
  );
}
