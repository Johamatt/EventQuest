import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from '../../types';



export default function HomeScreen() {


  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

