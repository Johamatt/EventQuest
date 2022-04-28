import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar, FlatList, VirtualizedList, SectionList } from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from '../../types';
import { ApplicationState, EventsState } from '../redux';
import { connect } from 'react-redux';
import { ON_UPDATE_LOCATION,ON_UPDATE_LANGUAGE, ON_UPDATE_EVENTS, UserState,} from "../redux";
import {Event} from '../redux/models'

interface HomeProps {
    userReducer: UserState,
    eventReducer: EventsState,
    ON_UPDATE_EVENTS: Function
}



export const _HomeScreen: React.FC<HomeProps> = (props) => {

    const {location, language} = props.userReducer;

    const events: any[] = props.eventReducer.events

    
   

    const Item = ({ title }: {title:any}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );

       const renderItem = ({ item }: {item: Event}) => <Item title={item.description?.intro} />;



  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen{JSON.stringify(location)}</Text>
      <Text>{language}</Text>
       <FlatList<Event> data={events} renderItem={renderItem} keyExtractor={item => item.id} /> 
    </View>
  );
}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.UserReducer,
    eventReducer: state.EventsReducer
})

const HomeScreen = connect(mapToStateProps, {ON_UPDATE_EVENTS})(_HomeScreen)

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });