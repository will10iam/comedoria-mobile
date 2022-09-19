import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn() {
    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {

        if (email === '' || password === '') {
            return;
        }

        await signIn({ email, password })
    }



    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo3.png')}
                resizeMode='center'
            />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Digite seu email'
                    style={styles.input}
                    placeholderTextColor='#F0F0F0'
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    placeholder='Digite sua senha'
                    style={styles.input}
                    placeholderTextColor='#F0F0F0'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color='black' />
                    ) : (
                        <Text style={styles.buttonText} >Acessar</Text>
                    )}


                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121e22'
    },
    logo: {
        width: 300,
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#18272A',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#fff'
    },
    button: {
        width: '95%',
        height: 40,
        backgroundColor: '#F6be00',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',

    }
})