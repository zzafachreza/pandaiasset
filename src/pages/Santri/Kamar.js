import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader } from '../../components';
import { useIsFocused } from '@react-navigation/native';
export default function Kamar({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const isFocus = useIsFocused();

    const getDataTransaksi = () => {
        // setLoading(true);

        getData('user').then(u=>{
            console.log('pengguna',u)
            POSTDataByTable('kamar_santri',{
                fid_pengguna:u.id_pengguna,
            }).then(res => {
                console.log(res.data);
                setData(res.data)
            })
        })

    }

    useEffect(() => {
        if (isFocus) {
            getDataTransaksi();
        }
    }, [isFocus]);

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('KamarDetail', item)

            }}>
                <View style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    flexDirection: 'row',
                    position: 'relative',
                    borderRadius: 10,
                    // margin: 10,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    overflow: 'hidden'
                }}>


                    <View style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: colors.white
                    }}>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[300]
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.subheadline3,
                                color: colors.primary
                            }}>Nama Kelas / Kamar</Text>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline5,
                                color: colors.primary
                            }}>{item.nama_kamar}</Text>
                        </View>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[300]
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.subheadline3,
                                color: colors.primary
                            }}>Nomor Kamar</Text>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline5,
                                color: colors.primary
                            }}>{item.nomor_kamar}</Text>
                        </View>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.subheadline3,
                                color: colors.primary
                            }}>Jumlah Santri</Text>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline5,
                                color: colors.primary
                            }}>{item.jumlah} Orang</Text>
                        </View>

                    </View>
                    <View style={{
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                    }}>
                        <Icon type='ionicon' name='bed' color={colors.white} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader title="Data Asrama Santri" onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 12,
                }}>
                    <Text style={{
                        marginBottom: 10,
                        ...fonts.headline4,
                        color: colors.primary,
                        textAlign: 'center'
                    }}>Data Asrama Santri Salafiyah Wustha 2 & 3</Text>
                    <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})