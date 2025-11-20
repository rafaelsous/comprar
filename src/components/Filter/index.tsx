import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";

import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

type Props = TouchableOpacityProps & {
  status: FilterStatus;
  isActive: boolean;
};

export function Filter({ status, isActive, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      activeOpacity={0.8}
      hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
      {...rest}
    >
      <StatusIcon status={status} />

      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}
