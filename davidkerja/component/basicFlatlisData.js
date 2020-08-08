import React,{Component} from 'react';
import{AppRegistry,FlatList,StyleSheet,Text,View,Image,Button,TouchableOpacity,Modal,Alert,Platform, TouchableHighlight, findNodeHandle} from 'react-native';
import flatlistData from '../data/flatlistData';
import Header from '../component/header';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';

class FlatListItem extends Component{
    constructor(props){
        super(props);
        this.state={
            show:false,
            activeRowKey:null,
            numberOfRefresh:0
        };
    }
    refreshFlatLisItem=()=>{
        this.setState((prevState) =>{
            return{
                numberOfRefresh:prevState.numberOfRefresh + 1

            };
        })
    }
   
    render(){
        const swipeSettings ={
            autoClose:true,
            onClose:(secId,rowId,direction)=>{
                if(this.state.activeRowKey !=null){
                this.setState({activeRowKey:null})
                }
            },
            onOpen:(secId,rowId,direction)=>{
                this.setState({activeRowKey:this.props.item.key});

            },
            right:[
                {
                onPress:()=>{
                    // alert("update");
                    this.props.parentFlatList.refs.EditModal.showEditModal(flatlistData[this.props.index], this);

                },
                text:'edit',type:'primary'},
                {

                    onPress:()=>{
                        const deletingRow =this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'yakin hapus ?',
                            [
                                {text: 'No',onPress:()=> console.log('Cancel Pressed'),style:'cancel'},
                                {text: 'Yes',onPress:()=> {
                                    flatlistData.splice(this.props.index,1);
                                    this.props.parentFlatlist.refreshFlatList(deletingRow);
                                }},
                            ],
                            {cancelable:true}
                        )
                    },
                    text:'delete',type:'delete'
                }
            ],
            rowId: this.props.index,
            sectionId:1
        };

        return(
            <Swipeout {...swipeSettings}>
             <View style={{
                flex:1,
                flexDirection:'column',
              
            }}>
            <View style={{flex:0,
                flexDirection:'row',
                //backgroundColor:'red'
            backgroundColor:this.props.index% 2==0?'red':'orange'
            }}>
                <Image
                source ={{uri:this.props.item.imageUrl}}
                style ={{width:100,height:100,margin:5, borderRadius:90}}>

                </Image>
                <View style={{flex:1,flexDirection:"column", textAlign:'center',fontWeightL:'bold'}}>
                <TouchableOpacity style={{marginRight:10}} underlayColor='skyblue' onPress={()=> {this.setState({show:true})} }>

                   

                <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                 <Modal
                 transparent={true}
                 visible={this.state.show}
                 >
                     <View style={{backgroundColor:"#000000aa",flex:1}}>
                         <View style={{backgroundColor:"black", margin:50, padding:40, borderRadius:10, flex:1}}>
                             <Text style={{textAlign:"justify", fontSize:15, color:"yellow", fontWeight:'bold',shadowColor:'black', shadowRadius:30}}>
                                 {this.props.item.link}
                             </Text>
                             <Button title="Kembali" onPress={()=> {this.setState({show:false})}}/>
                         </View>
                     </View>
 
                 </Modal>
                 </TouchableOpacity>
                 <Button title="Review" color='black' fontWeight='bold' onPress={()=> {this.setState({show:true})}}/>

               
                {/* <Text style={styles.flatListItem}>{this.props.item.link}</Text> */}
            </View>
            </View>
            <View
            style={{height:2,backgroundColor:'white'}}></View>
            </View>
            </Swipeout>
           
        )
    }
}

const styles = StyleSheet.create({
    flatListItem:{ color:'skyblue',padding: 10,fontSize:20,fontWeight:'bold'} 
});

export default class BasicFlatListData extends Component{
   constructor(props){
       super(props);
       this.state= ({
           deletedRowkey :null,
       });
       this._onPressAdd=this._onPressAdd.bind(this);
   }
   refreshFlatList = (activeKey) =>
        this.setState((prevState) => {
            return {
                deletedRowkey: activeKey 
            };
        });
        // this.refs.FlatList.scrollToEnd();
    
        _onPressAdd ()
        {
            // alert("berhasil di tambah");
            this.refs.AddModal.showAddModal();
        }

    render(){
        return(
            <View style={{flex:1,marginTop: Platform.os === 'android' ? 34 : 0}}>
                <Header/>
                <View
                style={{
                    backgroundColor:'yellow',
                    height: 50,
                    flexDirection:'row',
                    justifyContent:"flex-end",
                    alignItems:'center',
                    borderRadius:90
                    
                    

                    

                    }}>
                        <TouchableHighlight
                        style={{marginRight:10}}
                        underlayColor='skyblue'
                        onPress={this._onPressAdd}>
                         <Image
                    style={{width:35, height:35}}
                    source={require('../icons/images.jpg')}/>
                    </TouchableHighlight>

                </View>
                <FlatList
                ref={"FlatList"}
                    data={flatlistData}
                    renderItem={({item,index}) =>{
                        return(
                                <FlatListItem item={item} index={index} parentFlatList={this} >
                                </FlatListItem>
                        );
                        }}
                        >
                </FlatList>
                <AddModal ref={'AddModal'} parentFlatList={this} >


                </AddModal>
                <EditModal ref={'EditModal'} parentFlatList={this}>

                </EditModal>
            </View> 
         )
    }
}