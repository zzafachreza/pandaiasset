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





      <View style={{
        marginHorizontal: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 50
      }}>
        <View>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 20,
            color: colors.white,

          }}>Selamat Datang,</Text>

          <Text style={{
            fontFamily: fonts.secondary[700],
            fontSize: 20,
            color: colors.white,

          }}>{user.nama_lengkap}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: 14,
            color: colors.white,

          }}>{user.nama_sekolah}</Text>
        </View>

        <View style={{
          alignItems: "center"
        }}>
          <Image style={{
            width: 54,
            height: 54,
            resizeMode: 'contain'

          }} source={require('../../assets/logohome.png')} />
        </View>

      </View>




      <ScrollView>
        {/* slider */}
        <View style={{
          paddingHorizontal: 20,

          marginTop: -0,
          alignItems: 'center'
        }}>

          <Image style={{
            width: '100%',
            height: 250,
            resizeMode: 'contain'
          }} source={require('../../assets/dummy_slider.png')} />

        </View>
        {/* end slider */}

        {/* main menu */}
        <View style={{
          margin: 10,
          paddingHorizontal: 16,
        }}>

          <View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Kamar')}>
              <View style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 20,
                flexDirection: "row",
                // justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: colors.primary

              }}>

                <Image style={{
                  width: 74,
                  height: 74,
                }} source={require('../../assets/a1.png')} />


                <Text style={{
                  flex: 1,
                  marginLeft: 10,
                  ...fonts.headline1,
                  color: colors.primary,
                  textAlign: 'left'


                }}>Data Asrama Santri</Text>

              </View>
            </TouchableWithoutFeedback>
          </View>

          <MyGap jarak={20} />

          <View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Materi')}>
              <View style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: colors.primary

              }}>

                <Image style={{
                  width: 74,
                  height: 74,
                }} source={require('../../assets/a2.png')} />


                <Text style={{
                  flex: 1,
                  marginLeft: 10,
                  ...fonts.headline1,
                  color: colors.primary,
                  textAlign: 'left'


                }}>Materi Pelatihan</Text>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

      </ScrollView>






    </ImageBackground>
  )
}

const styles = StyleSheet.create({})