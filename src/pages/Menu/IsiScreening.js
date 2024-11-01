import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyHeader, MyRadio } from '../../components';
import { useToast } from 'react-native-toast-notifications';
export default function IsiScreening({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const getDataTransaksi = () => {

        getData('user').then(u => setUser(u))
        // setLoading(true);
        getDataByTable('soal_utama').then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    const toast = useToast();

    const simpan = () => {

        let kosong = data.map(i => i.nilai).filter(i => i.length == 0).length
        let batas = data.map(i => i.nilai).filter(i => i == 'Ya').length;
        console.log(kosong);
        let HASIL = '';
        if (batas >= 6) {
            HASIL = 'SAKIT';
            let KIRIM = {
                fid_pengguna: user.id_pengguna,
                hasil: HASIL,
                soal: data.map(i => i.nilai)
            }
            navigation.navigate('IsiScreeningLanjutan', KIRIM)

        } else {
            HASIL = 'NORMAL';
            let KIRIM = {
                fid_pengguna: user.id_pengguna,
                hasil: HASIL,
                soal: data.map(i => i.nilai)
            }
            console.log(KIRIM);
            POSTDataByTable('insert_hasil', KIRIM).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    toast.show(res.data.message, {
                        type: 'success'
                    });
                    navigation.navigate('HasilScreening', KIRIM)
                }
            })
        }




    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item, index }) => {
        return (
            <View style={{
                padding: 8,
                marginVertical: 4,
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        ...fonts.headline5,
                        color: colors.primary
                    }}>
                        {item.nomor}
                    </Text>
                    <View style={{
                        flex: 1,
                        paddingLeft: 10,
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: colors.primary
                        }}>
                            {item.soal}
                        </Text>
                        <View>
                            <MyRadio value={item.nilai} onPress={(x) => {
                                let tmp = [...data];
                                tmp[index].nilai = x;
                                setData(tmp)
                            }} nolabel options={['Ya', 'Tidak']} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader title="Isi Screening" onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                }}>

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

            <View style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
            }}><MyButton onPress={simpan} title="Simpan" />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})