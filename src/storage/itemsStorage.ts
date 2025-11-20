import { FilterStatus } from "@/types/FilterStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEM_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItemStorage[]> {
  try {
    const storedItems = await AsyncStorage.getItem(ITEM_STORAGE_KEY);

    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    throw new Error("GET_ITEMS: " + error);
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  const storedItems = await get();

  return storedItems.filter((item) => item.status === status);
}

async function save(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("SAVE_ITEMS " + error);
  }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
  const storedItems = await get();
  const updateItems = [...storedItems, newItem];

  await save(updateItems);

  return updateItems;
}

export const itemsStorage = {
  get,
  getByStatus,
  add,
};
