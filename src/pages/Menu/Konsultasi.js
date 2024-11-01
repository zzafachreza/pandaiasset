import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader } from '../../components';
export default function Konsultasi({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getDataTransaksi = () => {
        // setLoading(true);
        getDataByTable('konsultasi').then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                // navigation.navigate('ResepDetail', item)
                Linking.openURL('https://wa.me/' + item.telepon + `?text=Halo *${item.nama_lengkap}* saya ingin konsultasi . . .`)
            }}>
                <View style={{
                    // flex: 1,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    // padding: 10,
                    width: windowWidth / 2.2,
                    position: 'relative',
                    borderRadius: 10,
                    // margin: 10,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    overflow: 'hidden'
                }}>
                    <Image
                        source={require('../../assets/whatsapp.png')}
                        style={{
                            resizeMode: 'contain',
                            height: windowHeight / 5,
                            width: '100%',
                        }}
                    />
                    <View style={{
                        width: '100%',
                        padding: 10,
                        backgroundColor: colors.primary
                    }}>
                        <Text style={{
                            ...fonts.headline4,
                            color: colors.white
                        }}>{item.nama_lengkap}</Text>

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

            <MyHeader title="Konsultasi" onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                }}>

                    <FlatList contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} data={data} numColumns={2} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

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