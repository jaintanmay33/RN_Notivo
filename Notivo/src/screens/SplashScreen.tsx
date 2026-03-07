import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreenAPI from 'expo-splash-screen';
import { type RootStackScreenProps } from '@app-types/navigation';
import { fontFamily, fontSize } from '@theme/typography';

SplashScreenAPI.preventAutoHideAsync();

type Props = RootStackScreenProps<'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0.8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(40)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    SplashScreenAPI.hideAsync();
    Animated.parallel([
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 300,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(iconScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 400,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 400,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.timing(taglineOpacity, {
      toValue: 1,
      duration: 300,
      delay: 700,
      useNativeDriver: true,
    }).start();
    const pulseDot = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, { toValue: 1.0, duration: 400, delay, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ]),
      );
    Animated.parallel([
      pulseDot(dot1Opacity, 900),
      pulseDot(dot2Opacity, 1100),
      pulseDot(dot3Opacity, 1300),
    ]).start();
    const timer = setTimeout(() => {
      navigation.replace('MainApp');
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#0D0B14', '#1E1B2E', '#2D1F5E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={{
          opacity: iconOpacity,
          transform: [{ scale: iconScale }],
          marginBottom: 16,
        }}
      >
        <Text style={styles.icon}>◆</Text>
      </Animated.View>
      <Animated.View
        style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }],
        }}
      >
        <Text style={styles.title}>NOTIVO</Text>
      </Animated.View>
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Organize. Focus. Achieve.
      </Animated.Text>
      <View style={styles.dotsContainer}>
        {[dot1Opacity, dot2Opacity, dot3Opacity].map((dot, i) => (
          <Animated.View key={i} style={[styles.dot, { opacity: dot }]} />
        ))}
      </View>
      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D0B14',
  },
  icon: {
    fontSize: 48,
    color: '#F59E0B',
  },
  title: {
    fontSize: 52,
    fontFamily: fontFamily.extraBold,
    color: '#FFFFFF',
    letterSpacing: 8,
    marginBottom: 12,
  },
  tagline: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: '#C4B5FD',
    letterSpacing: 1,
    marginBottom: 48,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    bottom: 80,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7C3AED',
  },
  version: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: '#4B4869',
    position: 'absolute',
    bottom: 40,
  },
});
