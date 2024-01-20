import React, { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

export default function LoadingView() {
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    animationRef.current?.play()
  }, [])

  return (
    <LottieView
      ref={animationRef}
      source={require('../assets/animations/loading-spinner.json')}
      style={styles.loading}
    />
  )
}

const styles = StyleSheet.create({
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
