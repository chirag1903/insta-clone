import {Component} from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {updateEmail, updatePassword, updateUsername, signup} from '../../actions/user'

const screenHeight = Dimensions.get('window').height  //Get dimesions of the device we are using
const screenWidth = Dimensions.get('window').width

class Signup extends React.Component {
  state ={
    repeat:'',  //it is repeat password
  }
  onLoginPress=()=>{
    if(this.props.user.password==this.state.repeat && this.props.user.username !==''){
      //alert('the passwords are identical')
      this.props.signup()
    }
    else{
      alert('Passwords do not match')
    }
  }
  render(){
    return (
      <View style={{flex:1, backgroundColor:'white',alignItems:'center', }}>
        <View style={{width:screenWidth*0.9,marginTop:10 ,}}>
            <Text style={{left:15}}>Username</Text>
        </View>
        <TextInput 
          style={{height: 50, width:screenWidth*0.9, backgroundColor:'white', color:'black', paddingHorizontal:20, margin:20,marginVertical:5, borderRadius:10, borderColor:'grey',borderWidth:1}}
          placeholderTextColor={'grey'}
          placeholder={'Enter Username'}
          onChangeText={input=>this.props.updateUsername(input)}
          value={this.props.user.username}
        />
        <View style={{width:screenWidth*0.9,marginTop:10 ,}}>
            <Text style={{left:15}}>Email</Text>
        </View>
        <TextInput 
          style={{height: 50, width:screenWidth*0.9, backgroundColor:'white', color:'black', paddingHorizontal:20, margin:20,marginVertical:5, borderRadius:10, borderColor:'grey',borderWidth:1}}
          placeholderTextColor={'grey'}
          placeholder={'Phone number, username, or email'}
          onChangeText={input=>this.props.updateEmail(input)}
          value={this.props.user.email}
        />
        <View style={{width:screenWidth*0.9,marginTop:10, }}>
          <Text style={{left:15}}>Password</Text>
        </View>
        <TextInput 
          style={{height: 50, width:screenWidth*0.9, backgroundColor:'white', color:'black', paddingHorizontal:20, margin:20,marginVertical:5, borderRadius:10, borderColor:'grey',borderWidth:1}}
          placeholderTextColor={'grey'}
          placeholder={'Password'}
          onChangeText={input=>this.props.updatePassword(input)}
          value={this.props.user.password}
          secureTextEntry={true}
        />        
        <View style={{width:screenWidth*0.9,marginTop:10, }}>
          <Text style={{left:15}}> Repeat Password</Text>
        </View>
        <TextInput 
        style={{height: 50, width:screenWidth*0.9, backgroundColor:'white', color:'black', paddingHorizontal:20, margin:20,marginVertical:5, borderRadius:10, borderColor:'grey',borderWidth:1}}
        placeholderTextColor={'grey'}
        placeholder={'Repeat Password'}
        onChangeText={input=>this.setState({repeat:input})}
        value={this.state.repeat}
        secureTextEntry={true}
        />
        <TouchableOpacity style={{width:screenWidth*0.6,height:50,borderRadius:5,backgroundColor:'cyan',justifyContent:'center',alignItems:'center'}}
        onPress={()=>this.onLoginPress()}> 
          <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({updateEmail, updatePassword, updateUsername, signup}, dispatch)
}
const mapStateToProps = (state) =>{
  return{
    user : state.user
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Signup)

