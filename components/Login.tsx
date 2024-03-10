import { useContext, useState } from 'react'
import MainView from './MainView'
import { Button, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { showDangerMessage } from '../helpers/ToastHelper'
import Toast from 'react-native-root-toast'

export default function Login() {
  const themeContext = useContext(ThemeContext)!
  const navigation = useNavigation<RootStackScreenProps<'Login'>['navigation']>()
  const auth = getAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showEmailInputError, setShowEmailInputError] = useState(false)
  const [showPassowrdInputError, setShowPasswordInputError] = useState(false)

  async function login() {
    if (validate()) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigation.replace('Home')
      } catch (error: any) {
        switch (error.code) {
          case 'auth/invalid-email':
            setShowEmailInputError(true)
            showDangerMessage('Email is invalid', Toast.positions.TOP)
            break
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            showDangerMessage('Wrong email or password', Toast.positions.TOP)
            break
          case 'auth/too-many-requests':
            showDangerMessage(
              'Too many failed login attempts. Please reset your password or try again later.',
              Toast.positions.TOP
            )
            break
          default:
            showDangerMessage('Something went wrong. Please try again later.', Toast.positions.TOP)
        }
      }
    } else {
      showDangerMessage('Please fill in all required fields', Toast.positions.TOP)
    }
  }

  function validate() {
    let valid = true

    if (!email) {
      setShowEmailInputError(true)
      valid = false
    }

    if (!password) {
      setShowPasswordInputError(true)
      valid = false
    }

    return valid
  }

  function handleEmailChange(val: string) {
    setShowEmailInputError(false)
    setEmail(val)
  }

  function handlePasswordChange(val: string) {
    setShowPasswordInputError(false)
    setPassword(val)
  }

  return (
    <MainView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <MyInput
        label='Email'
        placeholder='youremail@example.com'
        onChangeText={handleEmailChange}
        keyboardType='email-address'
        showError={showEmailInputError}
        autoCapitalize='none'
      />
      <MyInput
        label='Password'
        placeholder='YourPassword'
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        showError={showPassowrdInputError}
      />
      <Button title='Log in' size='lg' buttonStyle={{ borderRadius: 10 }} color={themeContext.accent} onPress={login} />
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
