import {Component} from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View, TextInput, Dimensions } from 'react-native';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {updateEmail, updatePassword,login} from '../../actions/user'

const screenHeight = Dimensions.get('window').height  //Get dimesions of the device we are using
const screenWidth = Dimensions.get('window').width

//flex:1 means that item will change 1:1 wrt screen

class Login extends React.Component {
  render(){
    return (
      <View style={{flex:1, backgroundColor:'white',alignItems:'center', }}>   
        <Text style={{fontSize:30, fontWeight:"bold",margin:30}}>Instaclone</Text>
        <View style={{marginTop:100}}>
          <View style={{width:screenWidth*0.9,marginTop:10, paddingHorizontal:20,}}>
            <Text style={{left:15}}>Login</Text>
          </View>
          <TextInput 
          style={{height: 50, width:screenWidth*0.9, backgroundColor:'white', color:'black', paddingHorizontal:20, margin:20,marginTop:5, borderRadius:10, borderColor:'grey',borderWidth:1}}
          placeholderTextColor={'grey'}
          placeholder={'Phone number, username, or email'}
          onChangeText={input=>this.props.updateEmail(input)}
          value={this.props.user.email}
          />
          <View style={{width:screenWidth*0.9,marginTop:10, paddingHorizontal:20}}>
            <Text style={{left:15}}>Password</Text>
          </View>
          <TextInput 
          style={{height: 50, width:screenWidth*0.9, backgroundColor:'white', color:'black', paddingHorizontal:20, margin:20,marginVertical:5, borderRadius:10, borderColor:'grey',borderWidth:1}}
          placeholderTextColor={'grey'}
          placeholder={'Password'}
          onChangeText={input=>this.props.updatePassword(input)}
          value={this.props.user.password}
          secureTextEntry={true}       //MAKES PASSWORD INVISIBLE WHILE TYPING
          />        
          <View style={{width: screenWidth*0.9,  margin:20, marginTop:5,alignItems:'flex-end'}}>
            <TouchableOpacity >
              <Text style={{color:'cyan'}}>Forgot Password?</Text>
            </TouchableOpacity>        
          </View>
        </View>
        
        <View style={{width:screenWidth,justifyContent:'center',alignItems:'center',margin:30}}>
          <TouchableOpacity style={{width:screenWidth*0.6,height:50,borderRadius:5,backgroundColor:'cyan',justifyContent:'center',alignItems:'center'}}
          onPress={()=>this.props.login()}> 
            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center',flexDirection:'row'}}
          onPress ={()=> this.props.navigation.navigate('ProfilePicture')}>
            <Text style={{fontSize:18}}>Don't have an account? </Text>
            <Text style={{fontSize:18, fontWeight:'bold', color:'cyan'}}>Signup!</Text>            
          </TouchableOpacity>  
        </View>
        <View style={{position:'absolute',bottom:60, justifyContent:'center',alignItems:'center', }}>
          <Text style={{fontSize:15,   }}>from </Text>
          <Text style={{fontSize:20, fontWeight:'bold',}}>SONIJI</Text>
        </View>
      </View>
    );
    }
  }

  const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({updateEmail, updatePassword, login}, dispatch)
  }
  const mapStateToProps = (state) =>{
    return{
      user : state.user
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Login)
