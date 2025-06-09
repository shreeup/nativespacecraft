import { Routes } from '@/navigation/Routes';
import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Checkbox, TextInput } from 'react-native-paper';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import { useAuth } from 'Context/AuthContext';

type RootStackParamList = {
  [Routes.TERMS_SCREEN]: undefined;
  [Routes.STARSHIP_FEED_SCREEN]: undefined;
  // add other routes here as needed
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof Routes.TERMS_SCREEN
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();

  return (
    <ScrollView>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput
        label="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />
      <Checkbox.Item
        label="Show password"
        status={showPassword ? 'checked' : 'unchecked'}
        onPress={() => setShowPassword(!showPassword)}
      />
      {/* <TouchableOpacity
        onPress={() => navigation.navigate(Routes.STARSHIP_FEED_SCREEN)}
      >
        <Text>Login</Text>
      </TouchableOpacity> */}
      <Button onPress={() => signIn({ email, password })}>Sign In</Button>
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.TERMS_SCREEN)}
      >
        <Text>Terms & Conditions</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
