import { Path, Svg } from 'react-native-svg'

export default function RuFlag() {
  return (
    <Svg width='30' height='50' viewBox='0 0 36 36' role='img' preserveAspectRatio='xMidYMid meet'>
      <Path fill='#CE2028' d='M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-4h36v4z'></Path>
      <Path fill='#22408C' d='M0 13h36v10H0z'></Path>
      <Path fill='#EEE' d='M32 5H4a4 4 0 0 0-4 4v4h36V9a4 4 0 0 0-4-4z'></Path>
    </Svg>
  )
}
