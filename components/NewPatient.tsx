import { View, StyleSheet } from 'react-native'
import MyInput from './MyInput'
import MainView from './MainView'

export default function NewAppointment() {
  return (
    <MainView>
      <MyInput placeholder='First name' />
      <MyInput placeholder='Last name' />
      <MyInput placeholder='City' />
      <MyInput placeholder='Phone number' keyboardType='phone-pad' />
      <MyInput placeholder='Extra info' multiline={true} />
    </MainView>
  )
}
