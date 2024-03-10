import Toast from "react-native-root-toast";

const defaultPosition = -100
const duration = Toast.durations.LONG
const containerStyle = {borderRadius: 30}

export function showMessage(message: string, position = defaultPosition) {
  Toast.show(message, {backgroundColor: '#333333', position: position, duration: duration, containerStyle: containerStyle})
}

export function showSuccessMessage(message: string, position = defaultPosition) {
    Toast.show(message, {backgroundColor: '#27ae60', position: position, duration: duration, containerStyle: containerStyle})
}

export function showDangerMessage(message: string, position = defaultPosition) {
  Toast.show(message, {backgroundColor: '#800000', position: position, duration: duration, containerStyle: containerStyle, shadowColor: 'black'})
}