import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/AuthContext';

import { StackParamsList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { api } from '../../services/api';


export default function Dashboard() {
    const { signOut } = useContext(AuthContext)



    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const [number, setNumber] = useState('');

    async function openOrder() {

        if (number === '') {
            return;
        }

        const response = await api.post('/order', {
            table: Number(number),
        })

        console.log(response.data)

        navigation.navigate('Order', { number: number, order_id: response.data.id })

        setNumber('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo3.png')}
                resizeMode='center'
            />

            <Text style={styles.title}>Novo Pedido</Text>

            <TextInput
                placeholder='Qual é o numero da mesa?'
                placeholderTextColor='#F0F0F0'
                style={styles.input}
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}

            />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir Mesa!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#121e22'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#18272A',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 15,
        color: '#FFF'
    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#F6be00',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logo: {
        width: 300,
    }

})