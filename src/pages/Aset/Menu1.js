import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
export default function Menu1({ navigation, route }) {
    const user = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);
    const [jenis, setJenis] = useState([]);

    const [kirim, setKirim] = useState({
        jabatan: user.jabatan,
        kecamatan_user: user.kecamatan,
        kelurahan_user: user.kelurahan,
        kecamatan: '',
        kelurahan: '',
        jenis: '',
    })

    const getDataTransaksi = () => {
        // setLoading(true);
        POSTDataByTable('aset', kirim).then(res => {
            console.log('aset', res.data);
            setData(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }

    const getKecamatan = () => {
        POSTDataByTable('kecamatan').then(res => {

            setKecamatan(res.data)
        })
    }

    const getJenis = () => {
        POSTDataByTable('jenis').then(res => {

            setJenis(res.data)
        })
    }

    const sendFilter = () => {
        POSTDataByTable('aset', kirim).then(res => {
            console.log(res.data);
            setData(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }

    const filterData = () => {
        POSTDataByTable('aset', {
            ...kirim,
            key: key
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }

    const isFocus = useIsFocused();

    useEffect(() => {
        getKecamatan();
        getJenis();
        if (isFocus) {
            getDataTransaksi();
        }
    }, [isFocus]);

    const MyListData = ({ label, value }) => {
        return (
            <View style={{
            }}>
                <Text style={{
                    ...fonts.captionHeader,
                    color: colors.secondary
                }}>{label}</Text>
                <Text style={{
                    flex: 1,
                    ...fonts.caption1,
                    color: colors.secondary
                }}>{value}</Text>
            </View>
        )
    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback >
                <View style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    // padding: 10,
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden',
                    // margin: 10,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    overflow: 'hidden'
                }}>

                    <View style={{
                        padding: 10,
                    }}>
                        <MyListData label="Nomor" value={item.nomor} />
                        <MyListData label="Kecamatan" value={item.kecamatan} />
                        <MyListData label="Kelurahan" value={item.kelurahan} />
                        <MyListData label="Lokasi" value={item.lokasi} />
                        <MyListData label="Jenis Peruntukan" value={item.jenis} />

                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Menu1Detail', item)

                    }} style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            ...fonts.headline5,
                            color: colors.secondary
                        }}>Lihat Detail</Text>
                    </TouchableOpacity>
                    <Image source={require('../../assets/bgmenu.png')} style={{
                        width: '100%',
                        height: 80,
                        resizeMode: 'contain',
                        bottom: -20,

                    }} />
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


            <MyHeader title={'Daftar Asset Fasos Fasum' + '\n' + 'Jakarta Barat'} onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 16,
                    zIndex: 99,
                    backgroundColor: 'white'
                }}>

                    <ScrollView>
                        <View style={{
                            margin: 5,
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: Color.blueGray[300]
                        }}>
                            <Text style={{ textAlign: 'center', ...fonts.captionHeader }}>{user.jabatan}</Text>
                            <MyInput value={key} onChangeText={x => setKey(x)} onEndEditing={x => {
                                filterData(x.nativeEvent.text)
                            }} label="Cari data" placeholder="Masukan kata kunci" iconname='search' />
                        </View>

                        {(user.jabatan == 'Walikota' || user.jabatan == 'Camat') &&

                            <View style={{
                                margin: 5,
                                padding: 10,
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: Color.blueGray[300]
                            }}>
                                <MyPicker label="Kecamatan" data={user.jabatan == 'Walikota' ? kecamatan : kecamatan.filter(i => i.value == user.kecamatan)} value={kirim.kecamatan} onValueChange={x => {
                                    setKirim({
                                        ...kirim,
                                        kecamatan: x
                                    });

                                    POSTDataByTable('kelurahan', {
                                        kecamatan: x
                                    }).then(res => {
                                        console.log('klurahan', res.data);
                                        setKelurahan(res.data)
                                    })
                                }} />
                                <MyGap jarak={10} />
                                <MyPicker label="Kelurahan" data={kelurahan} value={kirim.kelurahan} onValueChange={x => setKirim({
                                    ...kirim,
                                    kelurahan: x
                                })} />
                                <MyGap jarak={10} />
                                <MyPicker label="Jenis Peruntukan" data={jenis} value={kirim.jenis} onValueChange={x => setKirim({
                                    ...kirim,
                                    jenis: x
                                })} />
                                <MyGap jarak={10} />
                                <MyButton title="Filter" onPress={sendFilter} />
                            </View>
                        }

                        <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                    </ScrollView>
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