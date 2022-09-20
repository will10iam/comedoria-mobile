import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useRoute, RouteProp } from '@react-navigation/native'

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderProps = RouteProp<RouteDetailParams, 'Order'>;


export default function Order() {
    const route = useRoute<OrderProps>();


    return (
        <View style={styles.container}>
            <Text>Tela Order</Text>
            <Text style={styles.title}>
                {route.params.order_id}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    title: {

    }
})