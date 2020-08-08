import React, {Component} from 'react';
import {AppRegistry, FlatList,Text,StyleSheet,View,Image, Dimensions, Platform,TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from  'react-native-button';
import flatlistData from '../data/flatlistData';

var screen = Dimensions.get('window');
export default class AddModal extends Component{
    constructor(props){
        super(props);
            this.state={
                newFoodName:'',
                newFoodDescription:''
            };
        }
    showAddModal = () =>{
        this.refs.myModal.open();

    }
    generateKey= (numberOfCharacters) =>{
        return require ('random-string')({length:numberOfCharacters});
    }
    render(){
        return (
            <Modal
            ref={"myModal"}
            style={{
                
                justifyContent:'center',
                borderRadius: Platform.OS === 'android'? 30: 0,
                shadowRadius : 10,
                width : screen.width - 80,
                height:280,
                backgroundColor:"black"
            }}
            position='center'
            backdrop={true}
            onClosed={() => {
            alert("modal ditutup")
            }}
            >
                <Text style={{justifyContent:'center',textAlign:'center',fontWeight:'bold',fontSize:20,color:'yellow'}}>Mencari sesuap nasi yang di Fragmantasi sehingga terjadi imunisasi</Text>
                <TextInput style={{height: 40, borderBottomColor:'red',
                marginLeft:10,
                marginRight:10,
                marginTop:10,
                marginBottom:10,
                borderBottomWidth:1,
            backgroundColor:"yellow"}}
            onChangeText={(text)=> this.setState({newFoodName: text})}
                placeholder="tambahkan makanan baru"
                value={this.state.newFoodName}
                />
                 <TextInput style={{height: 40, borderBottomColor:'red',
                marginLeft:10,
                marginRight:10,
                marginTop:10,
                marginBottom:10,
                borderBottomWidth:1,
            backgroundColor:"yellow"}}
            onChangeText={(text)=> this.setState({newFoodDescription: text})}
                placeholder="tambahkan discription"
                value={this.state.newFoodDescription}
                />
                <Button
                style={{
                    fontSize:18, color:"black"
                }}
                containerStyle={{
                    padding: 8,
                    marginLeft:70,
                    marginRight:70,
                    height:40,
                    borderRadius:6,
                    backgroundColor:'orange'
                }}
                onPress={()=> {
                    if(this.state.newFoodName.length == 0 || this.state.newFoodDescription.length == 0){
                        alert("from belum di input");
                        return;
                    }
                    const newKey =this.generateKey(24);
                    const newFood ={
                        key: newKey,
                        name: this.state.newFoodName,
                        imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjHzHFZi0WV3c9O6WMsg8Q1xEjwlUD6yXjaHoyj5GLVaIAJ_I&s",
                        link: this.state.newFoodDescription
                    };
                    flatlistData.push(newFood);
                    this.props.parentFlatList.refreshFlatList(newKey);
                     this.refs.myModal.close();                                                 
                }}
                >
                    save
                </Button>
            </Modal>
        )
    }
}