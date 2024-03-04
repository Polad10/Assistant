import { useContext } from 'react'
import MainView from './MainView'
import { Button, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'

export default function Login() {
  const themeContext = useContext(ThemeContext)!
  const navigation = useNavigation<RootStackScreenProps<'Login'>['navigation']>()

  return (
    <MainView>
      <MyInput label='Email' placeholder='youremail@example.com' />
      <MyInput label='Password' placeholder='YourPassword' secureTextEntry={true} />
      <Button title='Log in' size='lg' buttonStyle={{ borderRadius: 10 }} color={themeContext.accent} />
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: themeContext.neutral, textDecorationLine: 'underline', fontSize: 16 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
    </MainView>
  )
}
