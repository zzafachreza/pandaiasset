import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyHeader } from '../../components';
import { useIsFocused } from '@react-navigation/native';
export default function Screening({ navigation, route }) {
  const item = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getDataTransaksi = () => {
    // setLoading(true);
    getData('user').then(u => {
      POSTDataByTable('hasil', {
        fid_pengguna: u.id_pengguna
      }).then(res => {
        console.log(res.data);
        setData(res.data)
      })
    })
  }

  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getDataTransaksi();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('ScreeningDetail', item)

      }}>
        <View style={{
          flex: 1,
          borderWidth: 1,
          borderColor: colors.primary,
          padding: 10,
          position: 'relative',
          borderRadius: 10,
          // margin: 10,
          marginHorizontal: 5,
          marginVertical: 10,
          overflow: 'hidden'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{
              flex: 1,
              ...fonts.subheadline3,
              color: item.hasile == 'Normal' && item.hasilc == 'Normal' && item.hasilh == 'Normal' && item.hasilp == 'Normal' && item.hasilpr == 'Normal' && item.hasil == 'SAKIT' ? colors.success : item.hasil == 'NORMAL' ? colors.success : colors.danger
            }}>
              {item.hasile == 'Normal' && item.hasilc == 'Normal' && item.hasilh == 'Normal' && item.hasilp == 'Normal' && item.hasilpr == 'Normal' && item.hasil == 'SAKIT' ? 'Selamat kamu tidak mengalami gangguan mental emosional yang bermakna, yuk ikuti past intervensi ini agar kamu semakin sehat' : item.hasil == 'NORMAL' ? 'Selamat kamu tidak mengalami masalah psikologis dan emosional, yuk pelajari cara agar kamu tetap sehat dan jauh dari masalah psikososial.' : 'Kamu mengalami gejala gangguan mental emosional segera menghubungi petugas untuk mendapatkan bantuan'}
            </Text>
            <Image
              source={item.hasile == 'Normal' && item.hasilc == 'Normal' && item.hasilh == 'Normal' && item.hasilp == 'Normal' && item.hasilpr == 'Normal' && item.hasil == 'SAKIT' ? require('../../assets/done_icon.png') : item.hasil == 'NORMAL' ? require('../../assets/done_icon.png') : require('../../assets/warning_red.png')}
              style={{
                width: windowWidth / 4,
                height: windowWidth / 4,
              }}
            />
          </View>

          <View style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{
              flex: 1,
              ...fonts.body3,
              color: colors.primary,
            }}>
              {moment(item.tanggal).format('DD MMMM YYYY')}
            </Text>
            <Icon type='ionicon' name='search' color={colors.primary} />
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

      <MyHeader title="Screening" onPress={() => navigation.goBack()} />
      {!loading &&
        <View style={{
          flex: 1,
          padding: 16
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
      }}><MyButton onPress={() => navigation.navigate('IsiScreening')} title="Tambah" />

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})