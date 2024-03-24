import { useContext, useState } from 'react'
import MainView from './MainView'
import { Button } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { showDangerMessage } from '../helpers/ToastHelper'
import Toast from 'react-native-root-toast'
import { translate } from '../helpers/Translator'
import { Api } from '../helpers/Api'
import LoadingView from './LoadingView'
import { Keyboard } from 'react-native'

export default function Signup() {
  const themeContext = useContext(ThemeContext)!
  const auth = getAuth()

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
            showDangerMessage(translate('emailIsInvalid'), Toast.positions.TOP)
            break
          case 'auth/weak-password':
            setShowPasswordInputError(true)
            showDangerMessage(translate('enterPassword'), Toast.positions.TOP)
            break
          case 'auth/email-already-in-use':
            setShowEmailInputError(true)
            showDangerMessage(translate('emailAlreadyInUseMessage'), Toast.positions.TOP)
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
        showError={showEmailInputError}
        keyboardType='email-address'
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
        title={translate('signUp')}
        size='lg'
        buttonStyle={{ borderRadius: 10 }}
        color={themeContext.accent}
        onPress={signUp}
      />
      {loading && <LoadingView />}
    </MainView>
  )
}
