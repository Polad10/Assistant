import { useContext, useState } from 'react'
import MainView from './MainView'
import { Button, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'
import { Keyboard, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Toast from 'react-native-root-toast'
import LoadingView from './LoadingView'
import { LocalizationContext } from '../contexts/LocalizationContext'
import { ToastContext } from '../contexts/ToastContext'

export default function Login() {
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!
  const toastContext = useContext(ToastContext)!
  const navigation = useNavigation<RootStackScreenProps<'Login'>['navigation']>()
  const auth = getAuth()

  const translator = localizationContext.translator
  const toast = toastContext.toast!

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
            toast.showDangerMessage(translator.translate('emailIsInvalid'), Toast.positions.TOP)
            break
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            toast.showDangerMessage(translator.translate('wrongEmailOrPassword'), Toast.positions.TOP)
            break
          case 'auth/too-many-requests':
            toast.showDangerMessage(translator.translate('tooManyFailedLoginAttemptsMessage'), Toast.positions.TOP)
            break
          default:
            toast.showDangerMessage(translator.translate('somethingWentWrongMessage'), Toast.positions.TOP)
        }
      } finally {
        setLoading(false)
      }
    } else {
      toast.showDangerMessage(translator.translate('fillInAllRequiredFields'), Toast.positions.TOP)
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
        label={translator.translate('email')}
        placeholder={translator.translate('enterEmail')}
        onChangeText={handleEmailChange}
        keyboardType='email-address'
        showError={showEmailInputError}
        autoCapitalize='none'
      />
      <MyInput
        label={translator.translate('password')}
        placeholder={translator.translate('enterPassword')}
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        showError={showPassowrdInputError}
      />
      <Button
        title={translator.translate('login')}
        size='lg'
        buttonStyle={{ borderRadius: 10 }}
        color={themeContext.accent}
        onPress={login}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: themeContext.neutral, textDecorationLine: 'underline', fontSize: 16 }}>
            {translator.translate('forgotPassword')}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <LoadingView />}
    </MainView>
  )
}
