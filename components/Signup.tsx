import { useContext, useState } from 'react'
import MainView from './MainView'
import { Button } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { showDangerMessage } from '../helpers/ToastHelper'
import Toast from 'react-native-root-toast'
import { Api } from '../helpers/Api'
import LoadingView from './LoadingView'
import { Keyboard } from 'react-native'
import { LocalizationContext } from '../contexts/LocalizationContext'

export default function Signup() {
  const themeContext = useContext(ThemeContext)!
  const localizationContext = useContext(LocalizationContext)!
  const auth = getAuth()

  const translator = localizationContext.translator

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [showEmailInputError, setShowEmailInputError] = useState(false)
  const [showPassowrdInputError, setShowPasswordInputError] = useState(false)

  async function signUp() {
    if (validate()) {
      try {
        setLoading(true)
        Keyboard.dismiss()

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const api = new Api(userCredential.user)
        await api.signUp()
      } catch (error: any) {
        switch (error.code) {
          case 'auth/invalid-email':
            setShowEmailInputError(true)
            showDangerMessage(translator.translate('emailIsInvalid'), Toast.positions.TOP)
            break
          case 'auth/weak-password':
            setShowPasswordInputError(true)
            showDangerMessage(translator.translate('enterPassword'), Toast.positions.TOP)
            break
          case 'auth/email-already-in-use':
            setShowEmailInputError(true)
            showDangerMessage(translator.translate('emailAlreadyInUseMessage'), Toast.positions.TOP)
            break
          default:
            showDangerMessage(translator.translate('somethingWentWrongMessage'), Toast.positions.TOP)
        }
      } finally {
        setLoading(false)
      }
    } else {
      showDangerMessage(translator.translate('fillInAllRequiredFields'), Toast.positions.TOP)
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
        showError={showEmailInputError}
        keyboardType='email-address'
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
        title={translator.translate('signUp')}
        size='lg'
        buttonStyle={{ borderRadius: 10 }}
        color={themeContext.accent}
        onPress={signUp}
      />
      {loading && <LoadingView />}
    </MainView>
  )
}
