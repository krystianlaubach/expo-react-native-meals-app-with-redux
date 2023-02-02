import { useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { Colours } from '../assets/styles/Colours';
import Meal from '../models/meal';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/Subtitle';
import List from '../components/List';
import IconButton from '../components/IconButton';

type Props = {
    route: RouteProp<any>,
    navigation: NativeStackNavigationProp<any>,
};

export default function MealDetailsScreen({ route, navigation }: Props): JSX.Element {
    const favoriteMealIds: Array<string> = useSelector((state: RootState) => state.favoriteMeals.favorites);
    const dispatch = useDispatch();
    const meal: Meal = route.params?.meal;
    const mealIngredients: Array<string> = meal.ingredients;
    const preparationSteps: Array<string> = meal.steps;
    const isMealFavourite = favoriteMealIds.includes(meal.id);

    const toggleFavourites = () => {
        return isMealFavourite
            ? dispatch(removeFavorite({ mealId: meal.id }))
            : dispatch(addFavorite({ mealId: meal.id }));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meal.title,
            headerRight: () => <IconButton
                icon={ isMealFavourite ? 'star' : 'star-outline' }
                size={24}
                color={ Colours.white }
                onPress={ toggleFavourites }
            />
        })
    }, [meal, toggleFavourites])

    return (
        <ScrollView style={ styles.container }>
            <Image source={{ uri: meal.imageUrl }} style={ styles.image } />
            <Text style={ styles.title }>{ meal.title }</Text>
            <MealDetails meal={ meal } />
            <Subtitle>Ingredients</Subtitle>
            <List items={ mealIngredients } />
            <Subtitle>Steps</Subtitle>
            <List items={ preparationSteps } />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 250,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: Colours.raspberry,
    },
});
