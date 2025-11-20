import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

import { ITEMS } from "@/utils/data";
import { FilterStatus } from "@/types/FilterStatus";

import { Item } from "@/components/Item";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  function handleRemoveItem() {
    console.log("Removing item...");
  }

  function handleToggleItemStatus() {
    console.log("Toggling item status...");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive />
          ))}

          <TouchableOpacity style={styles.clearButton} activeOpacity={0.7}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={handleRemoveItem}
              onToggleStatus={handleToggleItemStatus}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui</Text>
          )}
        />
      </View>
    </View>
  );
}
