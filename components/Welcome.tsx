import { useContext } from 'react'
import MainView from './MainView'
import { Button, Text } from '@rneui/themed'
import { ThemeContext } from '../contexts/ThemeContext'
import { SafeAreaView, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Background from './illustrations/Background'
import WelcomeIllustration from './illustrations/WelcomeIllustration'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types/Navigation'
import { translate } from '../helpers/Translator'

export default function Welcome() {
  const themeContext = useContext(ThemeContext)!
  const navigation = useNavigation<RootStackScreenProps<'Welcome'>['navigation']>()

  return (
    <MainView>
      <Background />
      <View style={{ height: '30%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: themeContext.neutral, fontSize: 30, fontWeight: 'bold' }}>Assistant</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <WelcomeIllustration />
      </View>
      <SafeAreaView style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={translate('login')}
            size='lg'
            buttonStyle={{ borderRadius: 10, width: 300 }}
            color={themeContext.accent}
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title={translate('signUp')}
            size='lg'
            type='outline'
            buttonStyle={{
              width: 300,
              borderRadius: 10,
              borderWidth: 1,
              marginTop: 10,
              borderColor: themeContext.info,
            }}
            titleStyle={{ color: themeContext.info }}
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text style={{ color: themeContext.neutral, opacity: 0.5, marginBottom: 15 }}>
            {translate('orConnectUsing')}
          </Text>
          <Button
            containerStyle={{ width: 300, borderRadius: 10 }}
            color='#dd4b39'
            title='Google'
            icon={<Ionicons style={{ marginRight: 10 }} size={18} name='logo-google' color={themeContext.neutral} />}
          />
        </View>
      </SafeAreaView>
    </MainView>
  )
}
