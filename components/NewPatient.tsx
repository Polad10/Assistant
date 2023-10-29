import MyInput from './MyInput'
import MainView from './MainView'
import { StyleSheet } from 'react-native'

export default function NewAppointment() {
  return (
    <MainView style={styles.mainView}>
      <MyInput placeholder='First name' />
      <MyInput placeholder='Last name' />
      <MyInput placeholder='City' />
      <MyInput placeholder='Phone number' keyboardType='phone-pad' />
      <MyInput placeholder='Extra info' multiline={true} />
    </MainView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
  },
})
