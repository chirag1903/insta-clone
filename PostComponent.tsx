import React, {Component} from 'react'
import {View, Text, Image, Dimensions, TouchableOpacity, ScrollView, TextInput} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


//THIS PAGE IS A COMPONENT OF HOMESCREEN (THUS WE DEFINE THIS.PROPS.NAVIAGATION AT HOMESCREEN)

const screenWidth = Dimensions.get('window').width

export default class PostComponent extends Component{
    static propTypes ={
        prop: PropTypes
    }
    state={
        liked:undefined,
        numLike:0,
        saved: undefined,
        comment: ''

    }
    likePost =()=>{
        if((this.props.item.likes.includes(this.props.user.uid))|| this.state.liked==true)
        {
            if(this.state.liked==false){
                this.setState({liked:true})
                this.setState({numLike:this.state.numLike+1})
                this.props.likePost(this.props.item)
            }
            else{
                this.setState({liked:false})
                this.setState({numLike:this.state.numLike-1})
                this.props.unlikePost(this.props.item)
            }
        }
        else{
            this.setState({liked:true})
            this.props.likePost(this.props.item)
            this.setState({numLike:this.state.numLike+1})
        }
    }
    savePost=()=>{
        if((this.props.item.savedBy.includes(this.props.user.uid))|| this.state.saved==true)
        {
            if(this.state.saved==false){
                this.setState({saved:true})
                this.props.savePost(this.props.item)
            }
            else{
                this.setState({saved:false})
                this.props.unsavePost(this.props.item)
            }
        }
        else{
            this.setState({saved:true})
            this.props.savePost(this.props.item)
           
        }
    }


    render (){
        return(
            <View style={{marginBottom:10}}>
                <View style={{width:screenWidth,height:50,backgroundColor:'white', flexDirection:'row', borderBottomColor:'grey'}}>
                    <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('ProfileScreen', this.props.item.uid)}
                    style={{justifyContent:'center',alignItems:'center', flexDirection:'row', }}>
                        <Image source={{uri:this.props.item?.photo}} style={{width:40,height:40,borderRadius:20, margin:15}}/>
                        <Text style={{fontWeight:'bold', fontSize:17}}>{this.props.item?.username}</Text>
                    </TouchableOpacity>                    
                </View>
                <View>
                    <ScrollView 
                    horizontal={true} 
                    pagingEnabled={true}
                    //showsHorizontalScrollIndicator={true}
                    >
                    {
                    this.props.item?.photos?.map(e=>
                        <Image source ={{uri:e}} style={{width:screenWidth,height:350}}/>   
                    )
                    }                   
                    </ScrollView>
                </View>
                <View style={{width:screenWidth,flexDirection:'row',justifyContent:'space-between', height:50,alignItems:'center',}}>
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row', }}>
                        <TouchableOpacity
                        onPress={()=>this.likePost()}>
                        {
                            (this.props.item?.likes?.includes(this.props.user.uid) && this.state.liked==undefined )?
                            <Image source ={require('../../assets/fonts/like_red.png')} style={{width:65,height:65, }}/>
                            :
                                (this.state.liked)?
                                <Image source ={require('../../assets/fonts/like_red.png')} style={{width:65,height:65, }}/>
                                :
                                <Image source ={require('../../assets/fonts/like1.png')} style={{width:40,height:40,marginHorizontal:10, marginLeft:15}}/>
                        }
                            
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source ={require('../../assets/fonts/comment.png')} style={{width:38,height:38,marginLeft:10, marginHorizontal:10}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source ={require('../../assets/fonts/share.png')} style={{width:35,height:35,marginLeft:10, marginHorizontal:10}}/>
                        </TouchableOpacity>   
                    </View>
                    <TouchableOpacity
                    onPress={()=>this.savePost()}>
                    {
                        (this.props.item?.savedBy.includes(this.props.user.uid)&& (this.state.saved==undefined) )?
                        <Image source ={require('../../assets/fonts/save1.png')} style={{width:40,height:40,margin:10}}/>
                        :
                            (this.state.saved==true)?
                            <Image source ={require('../../assets/fonts/save1.png')} style={{width:40,height:40,margin:10}}/>
                            :
                            <Image source ={require('../../assets/fonts/save.png')} style={{width:40,height:40,margin:10}}/>
                
                    }
                    </TouchableOpacity>                                   
                    
                </View>

                <Text style={{fontWeight:'bold', marginHorizontal:15, }}>{
                    this.props.item?.likes?.length+this.state.numLike
                } likes
                </Text>

                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold', marginLeft:15}}>{this.props.item?.username} </Text>
                    <Text>{this.props.item?.description}</Text>
                </View>
                {
                    (this.props.item?.comments?.length)?
                    <TouchableOpacity>
                        <Text style={{marginHorizontal:15, color:'grey', marginTop:5}}>Show all comments: {this.props.item.comments.length}</Text>
                    </TouchableOpacity>
                    :
                    null

                }
                <View style={{flexDirection:'row', alignItems:'center',width:screenWidth, justifyContent:'space-between'}}> 
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        <Image 
                        source={{uri:this.props.user?.photo}}
                        style={{width:40,height:40,borderRadius:20, marginHorizontal:15, marginTop:5}}/>
                        <TextInput
                        style={{ color:'grey', marginTop:5}} 
                        onChangeText={(comment)=>this.setState({comment})}
                        value={this.state.comment}
                        placeholderTextColor={'grey'}
                        placeholder={'Add comment...'}
                        />
                    </View>
                    <TouchableOpacity style={{marginHorizontal:10}}>
                        <Text style={[
                            (!this.state.comment.replace(/\s/g, '').length)?
                            {color:'grey'}
                            :
                            {fontWeight:'bold',color:'#0095f6'}
                        ]
                        }>Send</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{color:'grey', marginTop:5, marginHorizontal:15}}>{moment(this.props.item?.date).format('ll')}</Text>
                </View>
            </View>
        )
    }
}


