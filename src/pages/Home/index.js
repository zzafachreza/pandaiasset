import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color, POSTDataByTable } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

import { Icon } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useIsFocused } from '@react-navigation/native';
import MyCarouser from '../../components/MyCarouser';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 4,
        height: windowWidth / 4,
      }}>
        <View style={{
          backgroundColor: backgroundColor,
          borderRadius: 12,
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 5, height: windowWidth / 5,
          }} />
        </View>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
      if (u.level == 'Petugas UKS') {
        POSTDataByTable('hasil_uks', {
          fid_sekolah: u.fid_sekolah
        }).then(res => {
          console.log(res.data);
          setData(res.data)
        })
      }
    })
  }

  const filterData = (key) => {
    getData('user').then(u => {
      setUser(u)
      if (u.level == 'Petugas UKS') {
        POSTDataByTable('hasil_uks', {
          fid_sekolah: u.fid_sekolah,
          key: key
        }).then(res => {
          console.log(res.data);
          setData(res.data)
        })
      }
    })

  }

  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getUser();
    }
  }, [isFocus])
  return (
    <ImageBackground source={require('../../assets/bghome.png')} style={{
      flex: 1,
      backgroundColor: colors.white,
      width: "100%",
      height: "100%"
    }}>



      <ScrollView>

        <View style={{
          marginHorizontal: 10,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          // marginTop: 50
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              ...fonts.subheadline3,
              color: colors.white,

            }}>Selamat Datang,</Text>

            <Text style={{
              ...fonts.headline5,
              color: colors.white,
              color: colors.white,

            }}>{user.nama_lengkap}</Text>

          </View>

          <View style={{
            flex: 0.5,
            alignItems: "center"
          }}>
            <Image style={{
              width: '100%',
              height: 50,
              resizeMode: 'contain'

            }} source={require('../../assets/logo.png')} />
          </View>

        </View>





        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image style={{
            width: windowWidth * 1.2,
            height: windowWidth / 2.5,
            resizeMode: 'contain'

          }} source={require('../../assets/banner.png')} />
        </View>
        {/* slider */}
        <MyCarouser />
        {/* end slider */}

        {/* main menu */}
        <View style={{
          margin: 0,
        }}>
          {
            user.level == 'ASN' &&

            <TouchableOpacity onPress={() => navigation.navigate('Menu1', user)} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ width: windowWidth / 1.1, height: windowWidth / 4, resizeMode: 'contain' }}
                source={require('../../assets/menu1.png')} />
            </TouchableOpacity>
          }

          <TouchableOpacity onPress={() => navigation.navigate('Menu2', user)} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: windowWidth / 1.1, height: windowWidth / 4, resizeMode: 'contain' }}
              source={require('../../assets/menu2.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Menu3', user)} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: windowWidth / 1.1, height: windowWidth / 4, resizeMode: 'contain' }}
              source={require('../../assets/menu3.png')} />
          </TouchableOpacity>
        </View>

      </ScrollView>






    </ImageBackground>
  )
}

const styles = StyleSheet.create({})