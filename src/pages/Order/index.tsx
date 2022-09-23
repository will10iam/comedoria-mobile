import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal } from 'react-native'

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import { api } from '../../services/api'

import { ModalPicker } from '../../components/ModalPicker'

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderProps = RouteProp<RouteDetailParams, 'Order'>;

export type CategoryProps = {
    id: string;
    name: string;
}


export default function Order() {
    const route = useRoute<OrderProps>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setcategorySelected] = useState<CategoryProps>();
    const [amount, setAmount] = useState('1');
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category');
            console.log(response.data)

            setCategory(response.data)
            setcategorySelected(response.data[0])
        }

        loadInfo();

    }, [])

    async function handleCloseOrder() {
        try {
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack();
        } catch (err) {
            console.log(err)
        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setcategorySelected(item)
    }


    return (
        <View style={styles.container}>

            <View style={styles.img}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo3.png')}
                    resizeMode='center'
                />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name='trash-2' size={28} color="#F6be00" />
                </TouchableOpacity>
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: '#FFF' }}>{categorySelected?.name}</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF' }}>Pizza de Calabresa</Text>
            </TouchableOpacity>

            <View style={styles.qtdeContainer}>
                <Text style={styles.qtdeText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholderTextColor='#F0F0F0'
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.action}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

            </View>

            <Modal transparent={true} visible={modalCategoryVisible} animationType='fade'>
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}

                />
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 15,
        paddingEnd: '4%',
        paddingStart: '5%',
        backgroundColor: '#121e22',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        justifyContent: 'center',
        marginTop: 14,
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
        marginRight: 14,
    },
    logo: {
        width: 300,

    },
    img: {
        alignItems: 'center',
        paddingEnd: '4%',
        paddingStart: '5%',
    },
    input: {
        backgroundColor: '#18272A',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        fontSize: 20,


    },
    qtdeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    action: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#F6be00',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})