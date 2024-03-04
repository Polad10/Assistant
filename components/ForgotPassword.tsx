import { useContext } from 'react'
import MainView from './MainView'
import { Button, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'

export default function ForgotPassword() {
  const themeContext = useContext(ThemeContext)!

  return (
    <MainView style={{ paddingTop: 20 }}>
      <Text style={{ color: themeContext.neutral, fontSize: 17, marginBottom: 20, lineHeight: 24 }}>
        {`Enter the email address you registered with. \nWe'll send you an email in order to let you choose a new password.`}
      </Text>
      <MyInput label='Email' placeholder='youremail@example.com' />
      <Button title='Reset password' size='lg' buttonStyle={{ borderRadius: 10 }} color={themeContext.accent} />
    </MainView>
  )
}
