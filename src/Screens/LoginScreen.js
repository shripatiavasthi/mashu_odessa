
import React, { useState, useEffect } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
const { height, width } = Dimensions.get('window')


const LoginScreen = (props) => {

  useEffect(() => {
    getMoviesFromApi()
  
  }, [])
  
  const [Data, setData] = useState([])
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const submitHandler = (x) => {
    var emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (Email == '') {
      alert("Pls enter email");
    } else
      if (Password == '') {
        alert("Pls enter Password");
      }
      else {
        alert("Submit Successfully!");
      }
  }

  const clearTxt = () => {
    setEmail('')
    setPassword('')
  }

  const getMoviesFromApi = () => {
    
    return fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => {
        return json.movies;
        setData(json.movies)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.topCon}>
          <View style={styles.profileCon}>
            
          </View>
          <View style={styles.loginCon}>
            <Text style={styles.loginTxt}>Login</Text>
          </View>
        </View>
        <View style={styles.emailCon}>
          <View style={styles.emailCons}>
            {/* <Image source={require('../../Image/Mail.png')} style={{ height: 30, width: 30 }} /> */}
            <TextInput
              value={Email}
              placeholder='Email'
              placeholderTextColor={'#000000'}
              style={styles.ipField}
              onChangeText={(x) => {
                setEmail(x)
              }}
            />
          </View>
        </View>
        <View style={styles.passCon}>
          <View style={styles.emailCons}>
            {/* <Image source={require('../../Image/Pass.webp')} style={{ height: 30, width: 30 }} /> */}
            <TextInput
              value={Password}
              secureTextEntry
              placeholder='Password'
              placeholderTextColor={'#000000'}
              style={styles.ipField}
              onChangeText={(x) => {
                setPassword(x)
              }}
            />
          </View>
        </View>
        <View style={styles.forCon}>
          <TouchableOpacity onPress={()=>{props.navigation.navigate('Newpage')}}>
          <Text style={styles.textForgot}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnSpace}>
          <TouchableOpacity onPress={() => {
            submitHandler()
            clearTxt()

          }} style={styles.btnCon}>
            <Text style={styles.loginTxt}>Login</Text>
          </TouchableOpacity>
          <Text>{Data}</Text>
        </View>
        <View style={styles.regCon}>
          <Text style={styles.accTxt}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }} >
            <Text style={styles.regTxt}>Register</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    // backgroundColor: 'lightblue'
  },
  topCon: {
    height: height / 2.8,
    width: width / 1,
    backgroundColor: 'rgb(255,165,0)',
    borderBottomLeftRadius: 100,
  },
  profileCon: {
    height: height / 4,
    width: width / 1,
    // backgroundColor: "cyan",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  imgStyle: {
    height: 60,
    width: 60,
    borderRadius: 50
  },
  loginCon: {
    height: height / 15,
    width: width / 1.25,
    // backgroundColor: "red",
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  loginTxt: {
    fontSize: 25,
    fontFamily: 'Cochin',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  emailCon: {
    height: height / 7,
    width: width / 1,
    // backgroundColor: "red",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  emailCons: {
    height: height / 18,
    width: width / 1.4,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#707070",
    shadowOpacity: 1
  },
  ipField: {
    width: width / 1.5,
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 15
  },
  passCon: {
    height: height / 12,
    width: width / 1,
    // backgroundColor: "red",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  forCon: {
    height: height / 18,
    width: width / 1.4,
    // backgroundColor: "#FFFFFF",
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textForgot: {
    color: '#000000',
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  btnSpace: {
    height: height / 7,
    width: width / 1,
    // backgroundColor: "red",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnCon: {
    height: height / 18,
    width: width / 1.4,
    backgroundColor: 'rgb(255,165,0)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#707070",
    shadowOpacity: 1
  },
  regCon: {
    height: height / 8,
    width: width / 1,
    // backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  accTxt: {
    fontSize: 15,
    fontFamily: 'Cochin',
    color: '#707070',
  },
  regTxt: {
    fontSize: 14,
    // fontFamily: 'Cochin',
    color: 'rgb(255,165,0)',
    paddingHorizontal: 5,
    textDecorationLine: 'underline'
  }
})