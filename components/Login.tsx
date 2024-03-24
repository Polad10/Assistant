import { useContext, useState } from 'react'
import MainView from './MainView'
import { Button, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'
import { Keyboard, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { showDangerMessage } from '../helpers/ToastHelper'
import Toast from 'react-native-root-toast'
import { translate } from '../helpers/Translator'
import LoadingView from './LoadingView'

export default function Login() {
  const themeContext = useContext(ThemeContext)!
  const navigation = useNavigation<RootStackScreenProps<'Login'>['navigation']>()
  const auth = getAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [showEmailInputError, setShowEmailInputError] = useState(false)
  const [showPassowrdInputError, setShowPasswordInputError] = useState(false)

  async function login() {
    if (validate()) {
      try {
        setLoading(true)
        Keyboard.dismiss()

        await signInWithEmailAndPassword(auth, email, password)
        navigation.replace('Home')
      } catch (error: any) {
        switch (error.code) {
          case 'auth/invalid-email':
            setShowEmailInputError(true)
            showDangerMessage(translate('emailIsInvalid'), Toast.positions.TOP)
            break
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            showDangerMessage(translate('wrongEmailOrPassword'), Toast.positions.TOP)
            break
          case 'auth/too-many-requests':
            showDangerMessage(translate('tooManyFailedLoginAttemptsMessage'), Toast.positions.TOP)
            break
          default:
            showDangerMessage(translate('somethingWentWrongMessage'), Toast.positions.TOP)
        }
      } finally {
        setLoading(false)
      }
    } else {
      showDangerMessage(translate('fillInAllRequiredFields'), Toast.positions.TOP)
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
        label={translate('email')}
        placeholder={translate('enterEmail')}
        onChangeText={handleEmailChange}
        keyboardType='email-address'
        showError={showEmailInputError}
        autoCapitalize='none'
      />
      <MyInput
        label={translate('password')}
        placeholder={translate('enterPassword')}
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        showError={showPassowrdInputError}
      />
      <Button
        title={translate('login')}
        size='lg'
        buttonStyle={{ borderRadius: 10 }}
        color={themeContext.accent}
        onPress={login}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: themeContext.neutral, textDecorationLine: 'underline', fontSize: 16 }}>
            {translate('forgotPassword')}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <LoadingView />}
    </MainView>
  )
}
