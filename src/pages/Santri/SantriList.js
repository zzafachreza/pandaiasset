import { ActivityIndicator, Alert, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
export default function SantriList({ navigation, route }) {
    const ITEM = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const isFocus = useIsFocused();

    const [kirim, setKirim] = useState({
        fid_kamar: ITEM.id_kamar,
        nama_santri: ''
    })

    const getDataTransaksi = () => {
        // setLoading(true);

        POSTDataByTable('santri', {
            fid_kamar: ITEM.id_kamar,
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })

    }

    useEffect(() => {
        if (isFocus) {
            getDataTransaksi();
        }
    }, [isFocus]);

    const __renderItem = ({ item }) => {
        return (

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

                    }}>

                        <Text style={{
                            flex: 1,
                            ...fonts.headline5,
                            color: colors.primary
                        }}>{item.nama_santri}</Text>
                    </View>


                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SantriAdd', item)}
                    style={{
                        marginRight: 10,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                    }}>
                    <Icon type='ionicon' name='create' color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                    { text: 'Tidak' },
                    {
                        text: 'Ya',
                        onPress: () => {
                            console.log(item);
                            POSTDataByTable('hapus_santri', {
                                id_santri: item.id_santri
                            }).then(res => {
                                if (res.data.status == 200) {
                                    toast.show(res.data.message, { type: 'success' });
                                    getDataTransaksi();
                                }
                            })
                        }
                    }
                ])} style={{
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.danger,
                }}>
                    <Icon type='ionicon' name='trash' color={colors.white} />
                </TouchableOpacity>
            </View>

        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader title={ITEM.nama_kamar} onPress={() => navigation.goBack()} />
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
                    }}>Daftar Santri</Text>

                    <View style={{
                        marginBottom: 20,
                        marginHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{ flex: 1 }}>
                            <MyInput value={kirim.nama_santri} onChangeText={x => setKirim({ ...kirim, nama_santri: x })} placeholder="Masukan nama santri baru" label="Tambah Santri" textColor={colors.primary} />
                        </View>
                        <View style={{ flex: 0.5, paddingLeft: 5, }}>
                            <TouchableOpacity onPress={() => {
                                if (kirim.nama_santri.length == 0) {
                                    toast.show('Nama harus di isi !')
                                } else {
                                    POSTDataByTable('insert_santri', kirim).then(res => {
                                        console.log(res.data);
                                        if (res.data.status == 200) {
                                            toast.show(res.data.message, { type: 'success' });
                                            getDataTransaksi();
                                            setKirim({
                                                ...kirim,
                                                nama_santri: ''
                                            })
                                        }

                                    })
                                }
                            }} style={{
                                // padding: 10,
                                height: 45,
                                borderRadius: 10,
                                marginTop: 30,
                                backgroundColor: colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: colors.white
                                }}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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