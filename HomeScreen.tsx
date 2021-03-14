import React from 'react';
import { Image, FlatList, Text, TouchableOpacity, TouchableOpacityBase, View, TextInput, Dimensions, SafeAreaView } from 'react-native';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {getUser } from '../../actions/user'
import {getPosts, likePost, unlikePost, savePost, unsavePost } from '../../actions/post'

import PostComponent from '../Components/PostComponent'

const screenWidth = Dimensions.get('window').width

class HomeScreen extends React.Component {
    componentDidMount = () => { //componentDidMount sees what the component will do when first time rendered
        this.props.getPosts()
    }
  render(){
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white',justifyContent:'center',alignItems:'center', }}>   
        
            <View style={{height:50, width:screenWidth, borderBottomColor:'rgba(0,0,0,0.1)',borderWidth:0.5, justifyContent:'space-between', flexDirection:'row',alignItems:'center',}}>
                <Text style={{fontSize:25, color:'#0095f6', marginLeft:10, fontStyle:'italic'}}> Instaclone</Text>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('SavedPosts')}>
                        <Image source ={require('../../assets/fonts/save1.png')} style={{width:45,height:45,margin:10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('MessagesScreen')}>
                        <Image source ={require('../../assets/fonts/share.png')} style={{width:35,height:35,margin:10}}/>
                    </TouchableOpacity>
                    
                </View>
            </View>
            <FlatList
            data={this.props.post.feed}
            keyExtractor={(item) =>JSON.stringify(item.uid)}
            renderItem={({item}) => (
                <PostComponent
                item={item}
                user={this.props.user}
                likePost={(item)=>this.props.likePost(item)}
                unlikePost={(item)=>this.props.unlikePost(item)}
                savePost={(item)=>this.props.savePost(item)}
                unsavePost={(item)=>this.props.unsavePost(item)}
                navigation={this.props.navigation}
                />
            )}
            />
        
        </SafeAreaView>
    );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getPosts, likePost, unlikePost, savePost, unsavePost}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post:state.post
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(HomeScreen)
