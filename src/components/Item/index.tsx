import { Text, TouchableOpacity, View } from "react-native";
import { Trash2 } from "lucide-react-native";

import { styles } from "./styles";

import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

export type ItemData = {
  status: FilterStatus;
  description: string;
};

type Props = {
  data: ItemData;
  onRemove: () => void;
  onToggleStatus: () => void;
};

export function Item({ data, onRemove, onToggleStatus }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggleStatus}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity>
        <Trash2
          size={18}
          color="#828282"
          onPress={onRemove}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        />
      </TouchableOpacity>
    </View>
  );
}
