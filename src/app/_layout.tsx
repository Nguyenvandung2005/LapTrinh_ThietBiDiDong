import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}