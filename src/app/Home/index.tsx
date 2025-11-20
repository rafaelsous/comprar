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

const DIALOG_INITIAL_VALUES = { open: false, title: "", message: "" };
const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

type ItemDialogProps = {
  id: string;
  description: string;
};

type OpenDialogProps = {
  open: boolean;
  title: string;
  message: string;
};

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);
  const [openDialog, setOpenDialog] = useState<OpenDialogProps>(
    DIALOG_INITIAL_VALUES
  );
  const [dialogItem, setDialogItem] = useState<ItemDialogProps | null>(null);
  const [showButtonAction, setShowButtonAction] = useState<boolean>(true);

  const { getByStatus, add, remove, clear } = itemsStorage;

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
      setShowButtonAction(false);
      return setOpenDialog({
        open: true,
        title: "Adicionar Item",
        message: "Informe a descrição do item.",
      });
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
    setShowButtonAction(false);

    setOpenDialog({
      open: true,
      title: "Adicionado",
      message: `Adicionado ${description}.`,
    });
  }

  async function onRemoveItem(itemId: string) {
    try {
      await remove(itemId);
      itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Item", "Não foi possível remover o item.");
    }
  }

  async function onClearItems() {
    try {
      await clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      setOpenDialog({
        open: true,
        title: "Limpar Itens",
        message: "Não foi possível remover todos os itens.",
      });
    }
  }

  function handleRemoveAlert(itemId: string, itemDescription: string) {
    setDialogItem({ id: itemId, description: itemDescription });
    setShowButtonAction(true);
    setOpenDialog({
      open: true,
      title: "Remover Item",
      message: "Deseja realmente remover o item",
    });
  }

  function handleClearAlert() {
    setShowButtonAction(true);
    setOpenDialog({
      open: true,
      title: "Limpar Itens",
      message: "Deseja remover todos os itens?",
    });
  }

  function closeDialog() {
    setOpenDialog(DIALOG_INITIAL_VALUES);
    setDialogItem(null);
    setShowButtonAction(false);
  }

  function handleConfirmAction() {
    if (dialogItem) {
      onRemoveItem(dialogItem.id);
    } else {
      onClearItems();
    }

    closeDialog();
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
            <Text style={styles.clearText} onPress={handleClearAlert}>
              Limpar
            </Text>
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

      {/* {dialogItem ? ( */}
      <AlertDialog
        visible={openDialog.open}
        title={openDialog.title}
        message={
          dialogItem ? (
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
              {openDialog.message}
              {"\n"}
              <Text style={{ fontWeight: 700 }}>{dialogItem.description}</Text>?
            </Text>
          ) : (
            openDialog.message
          )
        }
        cancelText="Cancelar"
        onCancel={closeDialog}
        confirmText="Sim, remover"
        showActionButtons={showButtonAction}
        onConfirm={handleConfirmAction}
      />
      {/* ) : null} */}
    </View>
  );
}
