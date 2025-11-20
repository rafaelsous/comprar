import { useState } from "react";
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
  const [filter, setFilter] = useState(FilterStatus.PENDING);

  function handleRemoveItem() {
    console.log("Removing item...");
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
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity
            style={styles.clearButton}
            activeOpacity={0.7}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
          >
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
              onToggleStatus={() => console.log("Toggling status...")}
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
