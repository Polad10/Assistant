import { useContext } from 'react'
import MainView from './MainView'
import { Button, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import { KeyboardAvoidingView, SafeAreaView, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MyInput from './MyInput'
import Background from './illustrations/Background'
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView'

export default function Login() {
  const themeContext = useContext(ThemeContext)!

  return (
    <MainView style={{ paddingTop: 20, paddingHorizontal: 20, backgroundColor: '#7600eb' }}>
      <Background />
      <View style={{ height: '40%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: themeContext.neutral, fontSize: 30, fontWeight: 'bold' }}>Assistant</Text>
        </View>
      </View>
      <View>
        <MyInput
          containerStyle={{ paddingHorizontal: 0 }}
          label='Email'
          placeholder='yourname@example.com'
          keyboardType='email-address'
        />
        <MyInput
          containerStyle={{ paddingHorizontal: 0 }}
          label='Password'
          placeholder='YourPassword'
          secureTextEntry={true}
        />
      </View>
      <View style={{ marginBottom: 20, marginTop: -10, alignItems: 'flex-end' }}>
        <TouchableOpacity style={{ paddingVertical: 10 }}>
          <Text style={{ color: themeContext.neutral }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Button
          title='Sign in'
          size='lg'
          containerStyle={{ width: 300, borderRadius: 30 }}
          color={themeContext.accent}
        />
      </View>

      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <Text style={{ color: themeContext.neutral, opacity: 0.5, marginBottom: 15 }}>Or connect using </Text>
        <Button
          containerStyle={{ width: 300, borderRadius: 10 }}
          color='#dd4b39'
          title='Google'
          icon={<Ionicons style={{ marginRight: 10 }} size={18} name='logo-google' color={themeContext.neutral} />}
        />
      </View>
      <SafeAreaView style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: themeContext.neutral, opacity: 0.5 }}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={{ color: themeContext.neutral, textDecorationLine: 'underline' }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </MainView>
  )
}
