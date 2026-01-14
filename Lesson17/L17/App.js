import React,{ useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        width: 110,
        marginLeft: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'center',
    },
})

//Create a new variable named originalData
let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    // Exercise 1B - add useEffect()
    useEffect(() => {
        // Add fetch() - Exercise 1A
        const myurl = "https://onlinecardappwebservice-2ruf.onrender.com/allcards"
        fetch(myurl)
            .then((response)=>{
                return response.json();
            })
            .then((myJson)=>{
                setMyData(myJson);
                originalData = myJson;
            });
    }, []);

    const FilterData = (text) => {
        text = text.toLowerCase();
        if(text != '') {
            let myFilteredData = originalData.filter((item) =>
                item.card_name.toLowerCase().includes(text));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <View style={{borderWidth: 1, flexDirection: 'row', marginLeft: 5, marginRight: 5}}>
                <Text style={styles.textStyle}>{item.card_name}</Text>
                <Image
                    source={{uri: item.card_pic}}
                    style={{width: 250, height: 360 ,margin :20, borderWidth:2, borderRadius:10}}
                />
            </View>
        );
    };

    return (
        <View>
            <StatusBar/>
            <Text style={{fontWeight: "bold"}}>Search:</Text>
            <TextInput style={{borderWidth:1, margin: 5, marginBottom: 20}} onChangeText={(text) => {FilterData(text)}}/>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;