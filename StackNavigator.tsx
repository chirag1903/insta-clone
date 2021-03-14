import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Image,  Button, TouchableOpacity,  View, Touchable, TouchableOpacityBase, } from 'react-native';
import TabNavigator from './TabNavigator'
import PostCheckout from '../screens/TabScreens/Upload/PostCheckout'
import SavedPosts from '../screens/TabScreens/HeaderScreens/SavedPosts'
import MessagesScreen from '../screens/TabScreens/HeaderScreens/MessagesScreen'
import ProfileScreen from '../screens/TabScreens/ProfileScreen'
import OnePost from '../screens/TabScreens/OnePost'
import Edit from '../screens/TabScreens/Edit'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {FontAwesome} from '@expo/vector-icons' 
import {uploadPost, getPosts} from '../actions/post'

const Stack = createStackNavigator();

class MyStack extends React.Component {
  uploadPost =()=>{
    this.props.navigation.navigate('TabNavigator')
    alert('Posted')
    this.props.uploadPost()
    this.props.getPosts()
  }
  render(){
    return (
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="SavedPosts" component={SavedPosts}/>
        <Stack.Screen name="OnePost" component={OnePost}/>
        <Stack.Screen name="Edit" component={Edit}  />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen}  />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerStyle: {backgroundColor:'white'}}}/>
        <Stack.Screen name="PostCheckout" component={PostCheckout} 
        options={{headerShown:true, headerTitle:'Post', 
        headerRight: ()=>(
          <TouchableOpacity style={{margin:20, flexDirection:'row'}}
          onPress={()=> this.uploadPost()}>
            <FontAwesome name='check' color={'#0095f6'} size={20}/>
          </TouchableOpacity>
        )
        }}/>
      </Stack.Navigator>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({uploadPost, getPosts }, dispatch)
}
const mapStateToProps = (state) => {
  return{
      user: state.user,
      post: state.post
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(MyStack)