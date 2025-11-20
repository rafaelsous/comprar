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

export const itemsStorage = {
  get,
  getByStatus,
};
