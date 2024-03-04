import { useContext } from 'react'
import MainView from './MainView'
import { Button, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'
import { TouchableOpacity, View } from 'react-native'

export default function Signup() {
  const themeContext = useContext(ThemeContext)!

  return (
    <MainView style={{ paddingTop: 20 }}>
      <MyInput label='Email' placeholder='youremail@example.com' />
      <MyInput label='Password' placeholder='YourPassword' secureTextEntry={true} />
      <Button
        title='Sign up'
        size='lg'
        buttonStyle={{ borderRadius: 10, marginHorizontal: 10 }}
        color={themeContext.accent}
      />
    </MainView>
  )
}
