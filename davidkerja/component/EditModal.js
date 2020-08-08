import React, {Component} from 'react';
import {AppRegistry, FlatList,Text,StyleSheet,View,Image, Dimensions, Platform,TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from  'react-native-button';
import flatlistData from '../data/flatlistData';

var screen = Dimensions.get('window');
export default class EditModal extends Component{
    constructor(props){
        super(props);
            this.state={
                foodName:'',
                foodDescription:''
            };
        }
    showEditModal = (editingFood, flatlistItem) =>{
        // console.log('editingFood = ${JSON.stringify(editingFood)}');
        this.setState({
            key: editingFood.key,
            foodName: editingFood.name,
            foodDescription: editingFood.description,
            flatlistItem: flatlistItem
        });
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
            onChangeText={(text)=> this.setState({foodName: text})}
                placeholder="tambahkan makanan baru"
                value={this.state.foodName}
                />
                 <TextInput style={{height: 40, borderBottomColor:'red',
                marginLeft:10,
                marginRight:10,
                marginTop:10,
                marginBottom:10,
                borderBottomWidth:1,
            backgroundColor:"yellow"}}
            onChangeText={(text)=> this.setState({foodDescription: text})}
                placeholder="tambahkan discription"
                value={this.state.foodDescription}
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
                    if(this.state.foodName.length == 0 || this.state.foodDescription.length == 0){
                        alert("from belum di input");
                        return;
                    }
                   
                    // flatlistData.push(foodName);
                    // this.props.parentFlatList.refreshFlatList(newKey);
                    var founIndex = flatlistData.findIndex(item=> this.state.Key == item.key);
                    if (founIndex < 0){
                        return;
                    }
                    flatlistData [founIndex].name= this.state.foodName;
                    flatlistData [founIndex].description=this.state.foodDescription;
                    this.state.flatlistItem.refreshFlatListItem();
                     this.refs.myModal.close();
                }}
                >
                    save
                </Button>
            </Modal>
        )
    }
}