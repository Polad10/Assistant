import { useContext, useState } from 'react'
import MainView from './MainView'
import { Button, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'
import { showDangerMessage } from '../helpers/ToastHelper'
import Toast from 'react-native-root-toast'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import { translate } from '../helpers/Translator'
import { Keyboard } from 'react-native'
import LoadingView from './LoadingView'

export default function ForgotPassword() {
  const themeContext = useContext(ThemeContext)!
  const navigation = useNavigation<RootStackScreenProps<'ForgotPassword'>['navigation']>()
  const auth = getAuth()

  const [email, setEmail] = useState('')
  const [showEmailInputError, setShowEmailInputError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function resetPassword() {
    if (validate()) {
      try {
        setLoading(true)
        Keyboard.dismiss()

        await sendPasswordResetEmail(auth, email)
        navigation.navigate('EmailSent', { email: email })
      } catch (error: any) {
        switch (error.code) {
          case 'auth/invalid-email':
            setShowEmailInputError(true)
            showDangerMessage(translate('emailIsInvalid'), Toast.positions.TOP)
            break
          default:
            navigation.navigate('EmailSent', { email: email })
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

    return valid
  }

  function handleEmailChange(val: string) {
    setShowEmailInputError(false)
    setEmail(val)
  }

  return (
    <MainView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <Text style={{ color: themeContext.neutral, fontSize: 17, marginBottom: 20, lineHeight: 24 }}>
        {translate('resetPasswordMessage')}
      </Text>
      <MyInput
        label={translate('email')}
        placeholder={translate('enterEmail')}
        keyboardType='email-address'
        showError={showEmailInputError}
        onChangeText={handleEmailChange}
        autoCapitalize='none'
      />
      <Button
        title={translate('resetPassword')}
        size='lg'
        buttonStyle={{ borderRadius: 10 }}
        color={themeContext.accent}
        onPress={resetPassword}
      />
      {loading && <LoadingView />}
    </MainView>
  )
}
