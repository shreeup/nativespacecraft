import Header from '@/components/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Card, Text as PaperText, Button } from 'react-native-paper';
import {
  useRoute,
  useNavigation,
  type RouteProp,
} from '@react-navigation/native';

type StarshipDetailsScreenRouteProp = RouteProp<
  {
    params: {
      Item: {
        name: string;
        model: string;
        crew: string;
        hyperdrive_rating: string;
        cost_in_credits: string;
      };
    };
  },
  'params'
>;

export const StarshipDetailsScreen = () => {
  const route = useRoute<StarshipDetailsScreenRouteProp>();
  const navigation = useNavigation();
  const { Item } = route.params;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header title="Starship Details" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card>
            <Card.Title title={Item.name} subtitle={Item.model} />
            <Card.Content>
              <PaperText variant="titleLarge">{Item.name}</PaperText>
              <PaperText variant="bodyMedium">Model: {Item.model}</PaperText>
              <PaperText variant="bodyMedium">Crew: {Item.crew}</PaperText>
              <PaperText variant="bodyMedium">
                Hyperdrive: {Item.hyperdrive_rating}
              </PaperText>
              <PaperText variant="bodyMedium">
                Cost: {Item.cost_in_credits}
              </PaperText>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
              <Button onPress={() => navigation.goBack()}>Close</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
