import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Feather } from '@expo/vector-icons'


interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    },
    deleteItem: (item_id: string) => void;
}


export function ListItem({ data, deleteItem }: ItemProps) {

    function handleDeleteItem() {
        deleteItem(data.id)
    }


    return (
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} - {data.name}</Text>


            <TouchableOpacity>
                <Feather name='trash-2' color='#FF3F4B' size={25} onPress={handleDeleteItem} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#18272A',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 4,
        borderWidth: 0.3,
    },
    item: {
        color: '#fff'
    }
})