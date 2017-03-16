/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    NavigatorIOS
} from 'react-native';
import SearchPage from './SearchPage';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class SubwayProject extends React.Component{
    render(){
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{title: 'Subway', component: SearchPage}} />
        );
    }
}

AppRegistry.registerComponent('SubwayProject', () => SubwayProject);
