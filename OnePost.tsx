import React from 'react';
import { Image, FlatList, Text, TouchableOpacity, TouchableOpacityBase, View, TextInput, Dimensions, SafeAreaView } from 'react-native';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {getUser } from '../../actions/user'
import {getPosts, likePost, unlikePost, savePost, unsavePost } from '../../actions/post'

import PostComponent from '../Components/PostComponent'

const screenWidth = Dimensions.get('window').width

class HomeScreen extends React.Component {

  render(){
      this.props.navigation.setOptions({
          title:this.props.post.onePost.username + "Posts"
      })
    return (
                <PostComponent
                item={this.props.post.onePost}
                user={this.props.user}
                likePost={(item)=>this.props.likePost(item)}
                unlikePost={(item)=>this.props.unlikePost(item)}
                savePost={(item)=>this.props.savePost(item)}
                unsavePost={(item)=>this.props.unsavePost(item)}
                navigation={this.props.navigation}
                />
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
