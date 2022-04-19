import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from '../../types';
import { useNavigation } from "@react-navigation/native";



export default function MapScreen() {

    return (
        <View style={styles.container}>
          <MapView style={styles.map} />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
    });