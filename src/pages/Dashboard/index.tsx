import React, { useContext } from 'react';
import { Text, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Image } from 'react-native'

import { AuthContext } from '../../contexts/AuthContext';


export default function Dashboard() {
    const { signOut } = useContext(AuthContext)


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

            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Abrir Pedido!</Text>
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