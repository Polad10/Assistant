import Toast from "react-native-root-toast";

const position = -100
const duration = Toast.durations.LONG
const containerStyle = {borderRadius: 30}

export function showMessage(message: string) {
  Toast.show(message, {backgroundColor: '#333333', position: position, duration: duration, containerStyle: containerStyle})
}

export function showSuccessMessage(message: string) {
    Toast.show(message, {backgroundColor: '#27ae60', position: position, duration: duration, containerStyle: containerStyle})
}

export function showDangerMessage(message: string) {
  Toast.show(message, {backgroundColor: '#800000', position: position, duration: duration, containerStyle: containerStyle})
}