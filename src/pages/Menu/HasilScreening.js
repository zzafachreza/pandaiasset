import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MyButton, MyHeader } from '../../components'
import { colors, fonts, POSTDataByTable, windowWidth } from '../../utils'
import YoutubePlayer from "react-native-youtube-iframe";
export default function HasilScreening({ navigation }) {

    const [youtube, setYoutube] = useState([]);

    useEffect(() => {
        POSTDataByTable('youtube', {
            fid_kategori: 1
        }).then(res => {
            console.log(res.data);
            setYoutube(res.data);
        })
    }, []);
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Hasil Screening" />

            <ScrollView>
                <View style={{
                    padding: 20,

                }}>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/done_icon.png')} style={{
                            width: windowWidth / 2,
                            height: windowWidth / 2,
                            marginBottom: 20
                        }} />
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 20,
                            textAlign: "center",
                            color: colors.success,
                            marginBottom: 20,
                        }}>Selamat kamu tidak mengalami masalah psikologis dan emosional, yuk pelajari cara agar kamu tetap sehat dan jauh dari masalah psikososial.</Text>
                    </View>


                    {/* Video */}
                    <View>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 20,
                            textAlign: "center",
                            color: colors.primary,
                        }}>Silakan tonton video di bawah ini :</Text>
                    </View>

                    <FlatList data={youtube} renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                marginVertical: 8,
                            }}>
                                <YoutubePlayer
                                    height={windowWidth / 2}
                                    videoId={item.youtube}
                                />
                            </View>
                        )
                    }} />
                    <View style={{
                        paddingTop: 20
                    }}>
                        <MyButton onPress={() => navigation.navigate('Screening')} title="Selesai" />
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}