import Toast from "react-native-root-toast";

export function showSuccessMessage(message: string) {
  Toast.show(message, {backgroundColor: '#27ae60', position: -100, duration: Toast.durations.LONG, containerStyle: {borderRadius: 30}})
}