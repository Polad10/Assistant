import AsyncStorage from "@react-native-async-storage/async-storage";
import { Setting } from "../modals/Setting";

const settingKey = 'setting'

async function getSetting() {
  const setting = await AsyncStorage.getItem(settingKey)

  if (setting) {
    return JSON.parse(setting) as Setting
  }
}

async function setSetting(setting: Setting) {
  await AsyncStorage.setItem(settingKey, JSON.stringify(setting))
}

const AsyncStorageHelper = {
  getSetting,
  setSetting
}

export default AsyncStorageHelper