import { TextInput, TextInputProps, View } from "react-native";

import { styles } from "./styles";

export function Input({ ...rest }: Readonly<TextInputProps>) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
}
