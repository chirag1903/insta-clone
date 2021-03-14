import {Component} from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { uploadPhoto} from '../../actions/index'
import {updatePhoto} from  '../../actions/user'

const screenHeight = Dimensions.get('window').height  
const screenWidth = Dimensions.get('window').width

class ProfilePicture extends React.Component {
    openLibrary= async()=>{
        try{
            const {status}= await Permissions.askAsync(Permissions.CAMERA)
            if(status=== 'granted'){
                const image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing:true
                })
                if(!image.cancelled){
                    const url= await this.props.uploadPhoto(image)
                    
                    this.props.updatePhoto(url)

                }
            }
        }
        catch(e){
            alert(e)
        }
    }
  render(){
    return (
        <View style={{flex:1, backgroundColor:'white',alignItems:'center', justifyContent:'center' }}>
            <View style={{justifyContent:'center', alignItems:'center',bottom:100}}>
                <Text style={{fontWeight:'bold', fontSize:24, color:'grey', margin:15}}>Choose a Profile Picture</Text>
                {
                    (this.props.user.photo == undefined)?
                    <TouchableOpacity
                    onPress={()=> this.openLibrary()}>
                        <View style={{width:screenWidth*0.5, height:screenWidth*0.5, borderRadius:screenWidth*0.25, backgroundColor: 'beige'}}/>
                    </TouchableOpacity>               
                    :
                    <TouchableOpacity
                    onPress={()=> this.openLibrary()}>
                        <Image
                        source={{uri: this.props.user.photo}}
                        style={{width:screenWidth*0.5, height:screenWidth*0.5, borderRadius:screenWidth*0.25, backgroundColor: 'beige'}}
                        />
                    </TouchableOpacity>
                }
                <TouchableOpacity 
                style={{margin:25,padding:20,borderRadius:14, width:screenWidth*0.9,backgroundColor:'rgba(0,0,0,0.05)', alignItems:'center'}}
                onPress={()=> this.props.navigation.navigate('Signup')}>
                    <Text style={{fontWeight:'bold', fontSize:24, color:'grey'}}>Continue</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({uploadPhoto, updatePhoto}, dispatch)
}
const mapStateToProps = (state) =>{
  return{
    user : state.user
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (ProfilePicture)

