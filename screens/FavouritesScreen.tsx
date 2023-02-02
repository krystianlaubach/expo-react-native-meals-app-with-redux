import { StyleSheet, Text, View } from 'react-native';
import { MEALS } from '../data/dummy-data';
import { Colours } from '../assets/styles/Colours';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import Meal from '../models/meal';
import MealsList from '../components/MealsList';

export default function FavouritesScreen(): JSX.Element {
    const favoriteMealIds: Array<string> = useSelector((state: RootState) => state.favoriteMeals.favorites);
    const displayedMeals = MEALS.filter((mealItem: Meal) => favoriteMealIds.includes(mealItem.id));

    return (
        favoriteMealIds.length > 0
            ? <MealsList meals={ displayedMeals } />
            : <View style={ styles.container }><Text style={ styles.text }>No favorite meals...</Text></View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colours.raspberry,
    },
});
