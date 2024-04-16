import Toast from "react-native-root-toast";
import { ThemeContextType } from "../contexts/ThemeContext";

export class MyToast {
  themeContext: ThemeContextType
  defaultPosition: number
  duration: number
  containerStyle: object

  constructor(themeContext: ThemeContextType) {
    this.themeContext = themeContext

    this.defaultPosition = -100
    this.duration = Toast.durations.LONG
    this.containerStyle = {borderRadius: 30}
  }

  showMessage(message: string, position = this.defaultPosition) {
    Toast.show(message, {backgroundColor: this.themeContext.secondary, position: position, duration: this.duration, containerStyle: this.containerStyle})
  }
  
  showSuccessMessage(message: string, position = this.defaultPosition) {
      Toast.show(message, {backgroundColor: this.themeContext.success, position: position, duration: this.duration, containerStyle: this.containerStyle})
  }
  
  showDangerMessage(message: string, position = this.defaultPosition) {
    Toast.show(message, {backgroundColor: this.themeContext.error, position: position, duration: this.duration, containerStyle: this.containerStyle, shadowColor: 'black'})
  }
}