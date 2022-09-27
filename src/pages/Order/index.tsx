import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native'

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import { api } from '../../services/api'

import { ModalPicker } from '../../components/ModalPicker'

import { ListItem } from '../../components/ListItem'

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

export type ProductProps = {
    id: string;
    name: string;
}

export type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}


export default function Order() {
    const route = useRoute<OrderProps>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setcategorySelected] = useState<CategoryProps | undefined>();
    const [amount, setAmount] = useState('1');
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [produtcSelected, setProductSelected] = useState<ProductProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);
    const [items, setItems] = useState<ItemProps[]>([]);


    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category');
            console.log(response.data)

            setCategory(response.data)
            setcategorySelected(response.data[0])
        }

        loadInfo();

    }, [])

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })
            setProducts(response.data);
            setProductSelected(response.data[0])
        }
        loadProducts();
    }, [categorySelected])

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

    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item)
    }

    async function handleAdd() {
        console.log("CLICOU")
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

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{ color: '#FFF' }}>{produtcSelected?.name}</Text>
                </TouchableOpacity>
            )}

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
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd} >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]} disabled={items.length === 0}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} />}

            />

            <Modal transparent={true} visible={modalCategoryVisible} animationType='fade'>
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}

                />
            </Modal>

            <Modal transparent={true} visible={modalProductVisible} animationType='fade' style={styles.products}>
                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}

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
    },
    products: {
        marginTop: 580
    }
})