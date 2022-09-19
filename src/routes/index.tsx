import React, { useContext } from 'react'
import { View, ActivityIndicator, ImageBackground, Text, StyleSheet } from 'react-native'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import { AuthContext } from '../contexts/AuthContext'

function Routes() {
    const { isAuth } = useContext(AuthContext)
    const loading = false;

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#121e22'
                }}
            >
                <ActivityIndicator size={60} color='#f6be00' />
            </View>
        )
    }

    return (
        isAuth ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
    },
})