import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, getDataCompany, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
export default function Menu3({ navigation, route }) {

    const user = route.params;

    const [data, setData] = useState({
        siap: 0,
        sudah: 0,
        all: 0
    })

    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            POSTDataByTable('grap').then(res => {
                console.log(res.data);
                setData(res.data)
            })
        }
    }, [isFocus])

    const jsCode = `

    document.getElementsByClassName('section')[1].style.display = 'none';
    document.getElementsByClassName('section')[2].style.display = 'none';
        `;
    const web = webURL + 'home/grap';
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>


            <MyHeader title={'Statistik Jumlah Asset' + '\n' + 'Jakarta Barat'} onPress={() => navigation.goBack()} />

            <View style={{
                flex: 1,
                padding: 20,
            }}>
                <WebView

                    javaScriptEnabledAndroid={true}
                    source={{ uri: web }} style={{ flex: 1 }} />
            </View>
            <View style={{
                padding: 20,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu3Detail', {
                    title: 'Aset yang Sudah Dikerjasamakan',
                    filter: 'Sudah dikerjasamakan',
                    jumlah: data.sudah,
                    bck: colors.primary,
                    txt: colors.secondary
                })} style={{
                    marginBottom: 10,
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        flex: 1,
                        color: colors.secondary,
                        ...fonts.caption1
                    }}>Aset yang Sudah Dikerjasamakan</Text>
                    <Text style={{
                        color: colors.secondary,
                        ...fonts.captionHeader,
                        right: 10,
                    }}>{data.sudah}</Text>
                    <Icon type='ionicon' name='chevron-forward-circle-outline' color={colors.secondary} size={20} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Menu3Detail', {
                    title: 'Aset yang Siap Dikerjasamakan',
                    filter: 'Siap untuk dikerjasamakan',
                    jumlah: data.siap,
                    bck: colors.secondary,
                    txt: colors.white
                })} style={{
                    marginBottom: 10,
                    backgroundColor: colors.secondary,
                    borderRadius: 10,
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        flex: 1,
                        color: colors.white,
                        ...fonts.caption1
                    }}>Aset yang Siap Dikerjasamakan</Text>
                    <Text style={{
                        color: colors.white,
                        ...fonts.captionHeader,
                        right: 10,
                    }}>{data.siap}</Text>
                    <Icon type='ionicon' name='chevron-forward-circle-outline' color={colors.white} size={20} />
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Menu31Detail', {
                    title: 'Keseluruhan Aset',
                    jumlah: (data.sudah + data.siap),
                    bck: colors.success,
                    txt: colors.white
                })} style={{
                    marginBottom: 10,
                    backgroundColor: colors.success,
                    borderRadius: 10,
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        flex: 1,
                        color: colors.white,
                        ...fonts.caption1
                    }}>Keseluruhan Aset</Text>
                    <Text style={{
                        color: colors.white,
                        ...fonts.captionHeader,
                        right: 10,
                    }}>{data.sudah + data.siap}</Text>
                    <Icon type='ionicon' name='chevron-forward-circle-outline' color={colors.white} size={20} />
                </TouchableOpacity>



            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})