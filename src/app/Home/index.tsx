import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./styles";

import { FilterStatus } from "@/types/FilterStatus";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

import { Item } from "@/components/Item";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { AlertDialog } from "@/components/AlertDialog";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

type ItemDialogProps = {
  itemId: string;
  itemDescription: string;
};

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [dialogItem, setDialogItem] = useState<ItemDialogProps | null>(null);

  const { getByStatus, add, remove } = itemsStorage;

  async function itemsByStatus() {
    try {
      const data = await getByStatus(filter);
      setItems(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível filter os items.");
    }
  }

  async function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert("Adicionar Item", "Informe a descrição do item.");
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      status: FilterStatus.PENDING,
      description,
    };

    await add(newItem);

    itemsByStatus();
    setDescription("");
    setFilter(FilterStatus.PENDING);

    Alert.alert("Adicionado", `Adicionado ${description}`);
  }

  async function handleRemoveItem(itemId: string) {
    try {
      await remove(itemId);
      itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Item", "Não foi possível remover o item.");
    }
  }

  function handleRemoveAlert(itemId: string, itemDescription: string) {
    setDialogItem({ itemId, itemDescription });
    setOpenDialog(true);
  }

  useEffect(() => {
    itemsByStatus();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleAddItem} />
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
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemoveAlert(item.id, item.description)}
              onToggleStatus={() => console.log("Toggling item status...")}
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

      {dialogItem ? (
        <AlertDialog
          visible={openDialog}
          title="Remover Item"
          message={
            <Text
              style={{
                marginTop: 48,
                marginBottom: 24,
                fontSize: 16,
                color: "#1E1E1E",
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              Deseja realmente remover o item{"\n"}
              <Text style={{ fontWeight: 700 }}>
                {dialogItem.itemDescription}
              </Text>
              ?
            </Text>
          }
          cancelText="Cancelar"
          onCancel={() => setOpenDialog(false)}
          confirmText="Sim, remover"
          onConfirm={() => {
            if (dialogItem) {
              handleRemoveItem(dialogItem.itemId);
            }
            setOpenDialog(false);
          }}
        />
      ) : null}
    </View>
  );
}
