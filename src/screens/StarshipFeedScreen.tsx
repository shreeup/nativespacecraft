import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { default as data } from '../../api/data.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, DataTable, Text } from 'react-native-paper';
import Header from '@/components/Header';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '@/navigation/Routes';
import { useContext } from 'react';
import { useAuth } from 'Context/AuthContext';

type StarshipFeedScreenProps = {
  navigation: NativeStackNavigationProp<
    any,
    typeof Routes.STARSHIP_FEED_SCREEN
  >;
};

export const StarshipFeedScreen = ({ navigation }: StarshipFeedScreenProps) => {
  const { signOut } = useAuth();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header title="Starships" />
        <View style={{ height: 16 }} />
        <Button onPress={() => signOut()}>Sign Out</Button>
        <View style={{ height: 16 }} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Model</DataTable.Title>
            <DataTable.Title numeric>Crew</DataTable.Title>
            <DataTable.Title numeric>Hyperdrive</DataTable.Title>
            <DataTable.Title numeric>Cost</DataTable.Title>
          </DataTable.Header>
          {data.results.map((item: any) => (
            <TouchableOpacity
              key={item.name}
              onPress={() =>
                navigation.navigate(Routes.STARSHIP_DETAIL_SCREEN, {
                  Item: item,
                })
              }
            >
              <DataTable.Row>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.model}</DataTable.Cell>
                <DataTable.Cell numeric>{item.crew}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {item.hyperdrive_rating}
                </DataTable.Cell>
                <DataTable.Cell numeric>{item.cost_in_credits}</DataTable.Cell>
              </DataTable.Row>
            </TouchableOpacity>
          ))}
        </DataTable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
