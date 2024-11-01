import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
export default function MateriDetail({ navigation, route }) {
    const item = route.params;
    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900],
        }}>
            <MyHeader onPress={() => {
                navigation.goBack();
            }} title="Materi Pelatihan" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>
                    <Text style={{
                        ...fonts.headline2,
                        color: Color.blueGray[900]
                    }}>{item.judul}</Text>




                    <Image
                        style={{
                            marginTop: 12,
                            height: 230,
                            width: '100%',
                            resizeMode: 'stretch',
                            marginBottom: 12,
                        }}
                        source={{
                            uri: item.image,

                        }}

                    />

                    <Text style={{
                        ...fonts.caption1,
                        color: Color.blueGray[400]
                    }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                    <RenderHtml

                        tagsStyles={{
                            p: {
                                fontFamily: fonts.body3.fontFamily,
                                textAlign: 'justify',
                                lineHeight: 26,
                            },
                            div: {
                                fontFamily: fonts.body3.fontFamily,
                                textAlign: 'justify',
                                lineHeight: 26,
                            },
                        }}
                        systemFonts={systemFonts}
                        contentWidth={windowWidth}
                        source={{
                            html: item.konten
                        }}
                    />



                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})