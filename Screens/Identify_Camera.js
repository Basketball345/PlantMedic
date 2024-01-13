import { Camera} from 'expo-camera';
import React, {useState, useEffect, useRef} from 'react'
import { View, Text, SafeAreaView, StyleSheet, Modal, Dimensions, Switch, ActivityIndicator} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";

let base64PhotoID;

const IDCam = ({navigation}) => {
    {/*This is an object container created by React.useref(). The object has a "current" property that is initially set to null */} 
    let cameraRef = useRef();

    {/*To prevent freezing of the camera */}
    const isFocused = useIsFocused();

    const [initialized, setInitialized] = useState(false);
    const [here, setHere] = useState(true)
    const [HasCameraPermissions, setHasCameraPermissions] = useState();
    const [photo, setPhoto] = useState(null);
    const [photoCounter, setPhotoCounter] = useState(0);
    const [photoDisplay, setPhotoDisplay] = useState(null);
    const [AllPhotos, setAllPhotos] = useState('');
    
    {/*This is to record which options are selected in the modal. toggleOption updates the value of the option switch that has been flipped*/}
    const [selectedOptions, setSelectedOptions] = useState({leaf: false, flower: false, fruit: false, bark: false, auto: false})
    const toggleOption = (optionKey) => {
        setSelectedOptions({...selectedOptions, [optionKey]: !selectedOptions[optionKey]})
      }


    const [modal, setModal] = useState(false)
    
    useEffect(() => {
        setPhoto(null)
        setPhotoCounter(0)
        setModal(false)
        setPhotoDisplay(null)
        setAllPhotos('')
        setSelectedOptions({leaf: false, flower: false, fruit: false, bark: false, auto: false})
        setHere(false)
        setInitialized(isFocused);
      }, [isFocused]);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermissions(cameraPermission.status === 'granted');
        })();
    }, [here])

    if (HasCameraPermissions === undefined) {
        return <Text> Requesting Permissions ... </Text>
    } else if (!HasCameraPermissions){
        return <Text> Permission for camera not granted. Please change this in settings. </Text>
    }

    let combinedString;

    const takePic = async () => {
        const options = {
            quality: 1,
            base64: true,
            exif: false
        };

        {/*The "cameraRef.current." is needed to refer to the camera component.
        Only the "current" property of the cameraRef object holds the reference to the camera component*/} 

        {/*Bring up modal automatically after user takes 5 pictures */}
        if((5-photoCounter) > 0){
            let newPhoto = await cameraRef.current.takePictureAsync(options)
            setPhoto(newPhoto)
            setPhotoCounter(photoCounter+1)
            base64PhotoID = newPhoto.base64
            combinedString = AllPhotos + base64PhotoID + "-";
            setAllPhotos(combinedString)
            setPhotoDisplay(base64PhotoID)
        } else {
            setModal(true)
        };
    };

    {/*Run on press of "next" on modal. Ensures no freezing of the camera and the initialization of all state variables after leaving the page*/}
    const transition = () => {
        setPhoto(null)
        setPhotoCounter(0)
        setModal(false)
        setPhotoDisplay(null)
        setAllPhotos('')
        setSelectedOptions({leaf: false, flower: false, fruit: false, bark: false, auto: false})
        setHere(false)
        navigation.navigate("ID Results", {Photos: AllPhotos, organs: selectedOptions, display: photoDisplay})
    }

    if (initialized) {
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#93c7a1'}}>
                <View style={{flex: 0.5, backgroundColor: '#93c7a1', alignItems: 'center'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
                        Images Left: {5 - photoCounter}
                    </Text>
                </View>
                {/*The cameraRef object you create is assigned to point to the camera.
                Note: Only the "current" property within the object (not the entire object) points to the camera component.*/}
                <View style={{flex: 5}}>
                    <Camera style={styles.container} ref={cameraRef}></Camera>
                </View>
                <View style={{flex: 0.75, backgroundColor: '#93c7a1', justifyContent:'center', alignItems: 'center'}}>
                    <View style={styles.buttoncam}>
                        <TouchableOpacity style={styles.buttoncam} onPress={(takePic)}/> 
                    </View>
                    <View style={styles.analyzebutton}>
                        <MaterialIcons name="navigate-next" size={80} color="white" onPress={() => setModal(true)}/>
                    </View>
                </View>
                <Modal visible={modal} animationType='slide' transparent={true}>
                    <View style={styles.background}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Select each organ shown in your photos. The number of selections should match your photo count.</Text>
                            
                            {/*Creates a new array with each of the option keys and displays/activates them through the provided function*/}
                            {Object.keys(selectedOptions).map(optionKey => (
                            <View key={optionKey} style={styles.optionContainer}>
                            <Text>{optionKey}</Text>
                            {/*Pressing the switch calls the toggleOption function to update the respective key's value */}
                            <Switch 
                            onValueChange={() => toggleOption(optionKey)}
                            value={selectedOptions[optionKey]} 
                            />
                            </View>
                        ))}
                            <MaterialIcons name="navigate-next" size={40} color="black" onPress={(transition)}/>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
    return(
        <SafeAreaView style={styles.ActivityIndicatorStyle}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size="large" color='#ebebeb'/>
            </View>
        </SafeAreaView> 
    )
    
}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        backgroundColor: '#93c7a1',
    },
    container:{
       flex: 6,
       alignItems: 'center',
       justifyContent: 'center', 
    },
    buttoncam: {
        backgroundColor: "white",
        width: 90,
        height: 60,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    modalView: {
        height: '50%',
        margin: 5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 5,
        shadowRadius: 5,
        justifyContent: 'space-between',
      },
    analyzebutton: {
        position: 'absolute',
        left: Dimensions.get('window').width * 0.82,
    },
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0, 0.70)',
    },
    modalText: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: 'black'
    },
    optionContainer: {
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center",
        width: "40%",
        marginBottom: 2,
        marginTop: 16,
    }
})

export default IDCam
