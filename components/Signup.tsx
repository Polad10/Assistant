import { useContext, useState } from 'react'
import MainView from './MainView'
import { Button } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import MyInput from './MyInput'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { showDangerMessage } from '../helpers/ToastHelper'
import Toast from 'react-native-root-toast'

export default function Signup() {
  const themeContext = useContext(ThemeContext)!
  const auth = getAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showEmailInputError, setShowEmailInputError] = useState(false)
  const [showPassowrdInputError, setShowPasswordInputError] = useState(false)

  async function signUp() {
    if (validate()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error: any) {
        switch (error.code) {
          case 'auth/invalid-email':
            setShowEmailInputError(true)
            showDangerMessage('Email is invalid', Toast.positions.TOP)
            break
          case 'auth/weak-password':
            setShowPasswordInputError(true)
            showDangerMessage('Password should be at least 6 characters', Toast.positions.TOP)
            break
          case 'auth/email-already-in-use':
            setShowEmailInputError(true)
            showDangerMessage('Email already in use. Please sign in instead.', Toast.positions.TOP)
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
        showError={showEmailInputError}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <MyInput
        label='Password'
        placeholder='YourPassword'
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        showError={showPassowrdInputError}
      />
      <Button
        title='Sign up'
        size='lg'
        buttonStyle={{ borderRadius: 10 }}
        color={themeContext.accent}
        onPress={signUp}
      />
    </MainView>
  )
}
