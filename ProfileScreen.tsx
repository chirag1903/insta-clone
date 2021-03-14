import React, { useReducer } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image, ScrollView} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser,followUser, unfollowUser } from '../../actions/user'
import {getPost} from '../../actions/post'
import  firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class ProfileScreen extends React.Component {
    componentDidMount=()=>{
        const {params} =this.props.route
        this.props.navigation.setOptions({
            title: this.props.profile.username
        })
        if(params!==undefined){
            this.props.getUser(params, 'PROFILE')
        }
    }
    follow =()=>{
        this.props.followUser(this.props.profile.uid)
    }
    unfollow =()=>{
        this.props.unfollowUser(this.props.profile.uid)
    }
    goToPost =(post)=>{
        this.props.getPost(post)
        this.props.navigation.navigate('OnePost')
    }
    render(){
        const {params} = this.props.route  //userid passed by postcomponent (google this.props.route to understand it)
        if(params==undefined || params==this.props.user.uid)
        {
            return (
                <ScrollView style={{flex:1, backgroundColor:'white', }}>
                    <View style={{width:'100%',height:120,flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                        <Image source={{uri:this.props.user.photo}} style={{width:90,height:90, borderRadius:45, margin:20}}/>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{justifyContent:'center', alignItems:'center', margin:20}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>
                                {this.props.user?.posts?.length}
                                </Text>
                                <Text style={{fontSize:15}}>
                                Posts   
                                </Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center',margin:20}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>
                                {this.props.user?.followers?.length}
                                </Text>
                                <Text style={{fontSize:15}}>
                                Followers
                                </Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center',margin:20}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>
                                {this.props.user?.following?.length}
                                </Text>
                                <Text style={{fontSize:15}}>
                                Following
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:20,width:'100%',marginBottom:20 }}>
                        <Text style={{fontWeight:'bold'}}>{this.props.user.username}</Text>
                        <Text>{this.props.user?.bio}</Text>
                    </View>
                    <View style={{height:60, width:'100%', flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity 
                            onPress={()=>this.props.navigation.navigate('Edit')}
                            style={{width:'90%', height:35, justifyContent:'center',alignItems:'center', borderRadius:7, borderWidth:1, borderColor:'grey'}} >
                                <Text style={{color:'black', fontSize:19, fontWeight:"bold"}}>Edit profile</Text>
                            </TouchableOpacity>
                    </View>
                    
                    <FlatList
                    numColumns={3}
                    data={this.props.profile.posts}
                    keyExtractor={(item)=> JSON.stringify(item.date)}
                    style={{flex:1}}
                    renderItem={({item})=>
                        <TouchableOpacity
                        onPress={()=>this.goToPost(item)}>
                            <Image source={{uri:item.photos[0]}} style={{width:screenWidth/3,height:screenWidth/3}}/>
                        </TouchableOpacity>
                        
                    }
                    />
                </ScrollView> 
            );
        }
        else{
            return (
                <ScrollView style={{flex:1, backgroundColor:'white', }}>
                    <View style={{width:'100%',height:120,flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                        <Image source={{uri:this.props.profile.photo}} style={{width:90,height:90, borderRadius:45, margin:20}}/>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{justifyContent:'center', alignItems:'center', margin:20}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>
                                {this.props.profile?.posts?.length}
                                </Text>
                                <Text style={{fontSize:15}}>
                                Posts   
                                </Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center',margin:20}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>
                                {this.props.profile?.followers?.length}
                                </Text>
                                <Text style={{fontSize:15}}>
                                Followers
                                </Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center',margin:20}}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>
                                {this.props.profile?.following?.length}
                                </Text>
                                <Text style={{fontSize:15}}>
                                Following
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:20,width:'100%',marginBottom:20 }}>
                        <Text style={{fontWeight:'bold'}}>{this.props.profile.username}</Text>
                        <Text>{this.props.profile.bio}</Text>
                    </View>
                    {
                        (this.props.profile.followers?.includes(this.props.user.uid))?
                        <View style={{height:60,width:screenWidth, flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity 
                            onPress={()=>this.unfollow()}
                            style={{flexDirection:'row',width:screenWidth*0.45,height:35,justifyContent:'center', alignItems:'center',borderWidth:0.5,borderColor:'grey', borderRadius:7,margin:screenWidth*0.0125}}>
                                <Text style={{fontWeight:'bold',fontSize:16}}>Following</Text>
                                
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:screenWidth*0.45,height:35,justifyContent:'center', alignItems:'center',borderWidth:0.5,borderColor:'grey', borderRadius:7,margin:screenWidth*0.0125}}>
                                <Text style={{fontWeight:'bold',fontSize:16}}>Message</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{height:60,width:'100%', flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity 
                            onPress={()=>this.follow()}
                            style={{width:screenWidth*0.45,height:35,backgroundColor:'#0095f8', justifyContent:'center', alignItems:'center',borderWidth:0.5,borderColor:'grey',borderRadius:7,flexDirection:'row',margin:screenWidth*0.0125}}>
                                <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Follow</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:screenWidth*0.45,height:35,justifyContent:'center', alignItems:'center',borderWidth:0.5,borderColor:'grey', borderRadius:7,margin:screenWidth*0.0125}}>
                                <Text style={{fontWeight:'bold',fontSize:16}}>Message</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <FlatList
                    numColumns={3}
                    data={this.props.profile.posts}
                    keyExtractor={(item)=> JSON.stringify(item.date)}
                    style={{flex:1}}
                    renderItem={({item})=>
                        <TouchableOpacity
                        onPress={()=>this.goToPost(item)}>
                            <Image source={{uri:item.photos[0]}} style={{width:screenWidth/3,height:screenWidth/3}}/>
                        </TouchableOpacity>
                        
                    }
                    />
                </ScrollView>              
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, followUser, unfollowUser, getPost}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        profile: state.profile
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(ProfileScreen)







