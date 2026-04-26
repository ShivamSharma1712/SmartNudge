import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 🔥 FORCE LOGIN SCREEN
    setIsLoggedIn(false);
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      <Stack screenOptions={{ headerShown: false }}>

        {/* 🔥 AUTH SCREENS FIRST */}
        {!isLoggedIn && (
          <>
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/signup" />
          </>
        )}

        {/* 🔥 TABS AFTER LOGIN */}
        {isLoggedIn && (
          <Stack.Screen name="(tabs)" />
        )}

      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}