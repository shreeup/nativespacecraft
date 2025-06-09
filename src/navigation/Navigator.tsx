// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '@/screens/LoginScreen';
// import { TermsScreen } from '@/screens/TermsScreen';
// import { Routes } from '@/navigation/Routes';
// import { StarshipFeedScreen } from '@/screens/StarshipFeedScreen';
// import { StarshipDetailsScreen } from '@/screens/StarshipDetailsScreen';

// export function AuthNavigator() {
//   return <AuthStack />;
// }

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// function StarshipsTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Login" component={LoginScreen} />
//       <Tab.Screen name="Feed" component={StarshipFeedScreen} />
//       <Tab.Screen name="Terms" component={TermsScreen} />
//     </Tab.Navigator>
//   );
// }

// export function StarshipsNavigator() {
//   return <RootStack />;
// }
// const Stack = createNativeStackNavigator();
// function RootStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName={Routes.STARSHIP_FEED_SCREEN}
//       screenOptions={{
//         headerStyle: { backgroundColor: 'tomato' },
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen
//         name={Routes.STARSHIP_FEED_SCREEN}
//         component={StarshipsTabs}
//         options={{ title: 'Starship Feed' }}
//       />
//       <Stack.Screen
//         name={Routes.STARSHIP_DETAIL_SCREEN}
//         component={StarshipDetailsScreen}
//         initialParams={{
//           Item: {
//             name: '',
//             model: '',
//             crew: '',
//             hyperdrive_rating: '',
//             cost_in_credits: '',
//           },
//         }}
//         options={{ title: 'Starship Details', presentation: 'modal' }}
//       />
//       <Stack.Screen
//         name={Routes.TERMS_SCREEN}
//         component={TermsScreen}
//         options={{ title: 'Terms & Conditions' }}
//       />
//     </Stack.Navigator>
//   );
// }

// function AuthStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName={Routes.LOGIN_SCREEN}
//       screenOptions={{
//         headerStyle: { backgroundColor: 'tomato' },
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen
//         name={Routes.LOGIN_SCREEN}
//         component={LoginScreen}
//         options={{ title: 'Login' }}
//       />

//       <Stack.Screen
//         name={Routes.TERMS_SCREEN}
//         component={TermsScreen}
//         options={{ title: 'Terms & Conditions' }}
//       />
//     </Stack.Navigator>
//   );
// }
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '@/screens/LoginScreen';
import { TermsScreen } from '@/screens/TermsScreen';
import { Routes } from '@/navigation/Routes';
import { StarshipFeedScreen } from '@/screens/StarshipFeedScreen';
import { StarshipDetailsScreen } from '@/screens/StarshipDetailsScreen';
import type {
  NativeStackNavigationProp,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { useAuth } from 'Context/AuthContext';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, Menu } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type CustomNavigationBarProps = NativeStackHeaderProps;

export function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { state } = useAuth();

  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        >
          <Menu.Item
            onPress={() => navigation.navigate(Routes.LOGIN_SCREEN)}
            title="Login"
          />
          <Menu.Item
            onPress={() => navigation.navigate(Routes.STARSHIP_FEED_SCREEN)}
            title="Starship Feed"
            disabled={state.userToken == null}
          />
          <Menu.Item
            onPress={() => navigation.navigate(Routes.TERMS_SCREEN)}
            title="Terms & Conditions"
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LOGIN_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={Routes.TERMS_SCREEN} component={TermsScreen} />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.STARSHIP_FEED_SCREEN}
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name={Routes.STARSHIP_FEED_SCREEN}
        component={StarshipFeedScreen}
      />
      <Stack.Screen
        name={Routes.STARSHIP_DETAIL_SCREEN}
        component={StarshipDetailsScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={Routes.TERMS_SCREEN} component={TermsScreen} />
    </Stack.Navigator>
  );
}
