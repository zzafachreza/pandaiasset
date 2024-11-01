import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader } from '../../components';
export default function VideoList({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getDataTransaksi = () => {
        // setLoading(true);
        getDataByTable('edukasi').then(res => {
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
                navigation.navigate('VideoDetail', item)

            }}>
                <View style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.primary,

                    position: 'relative',
                    borderRadius: 10,
                    // margin: 10,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    overflow: 'hidden'
                }}>
                    <Image
                        source={{
                            uri: `https://i.ytimg.com/vi/${item.youtube}/hq720.jpg`
                        }}
                        style={{
                            resizeMode: 'cover',
                            height: windowHeight / 3.5,
                            width: '100%',
                        }}
                    />
                    <View style={{
                        width: '100%',
                        padding: 10,
                        backgroundColor: colors.primary,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                        <Text style={{
                            flex: 1,
                            ...fonts.headline4,
                            color: colors.white
                        }}>{item.judul}</Text>
                        <Icon type='ionicon' name='logo-youtube' color={colors.white} />
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

            <MyHeader title="Video Edukasi" onPress={() => navigation.goBack()} />
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



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})