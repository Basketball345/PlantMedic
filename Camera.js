import { Camera} from 'expo-camera';
import React, {useState, useEffect, useRef} from 'react'
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";

let base64Photo;

const CamPage = ({navigation}) => {

    {/*This is an object container created by React.useref(). The object has a "current" property that is initially set to null */} 
    let cameraRef = useRef();

    {/*These two state variables are used to prevent the bug where moving from one tab to another freezes the camera*/}
    const [initialized, setInitialized] = useState(false);
    const isFocused = useIsFocused();

    {/*Also allows for the restart of the camera if the user decides to hit "back" on the preview page */}
    const [here, setHere] = useState(true)

    const [HasCameraPermissions, setHasCameraPermissions] = useState();
    const [photo, setPhoto] = useState();

    {/*If the screen is in focus, the initilized variable becomes true, re-rendering the camera component */}
    useEffect(() => {
        setInitialized(isFocused);
      }, [isFocused]);

    {/*Get camera permission from the user*/}
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

    {/*Asynchronous function that takes a picture on press of a button*/}
    const takePic = async () => {
        const options = {
            quality: 1,
            base64: true,
            exif: false
        };

        {/*The "cameraRef.current." is needed to refer to the camera component.
        Only the "current" property of the cameraRef object holds the reference to the camera component*/} 
        let newPhoto = await cameraRef.current.takePictureAsync(options)
        setPhoto(newPhoto)
        base64Photo = newPhoto.base64
        setHere(false)
        setPhoto(null)
        navigation.navigate("Preview", {base64: base64Photo})
    };

    {/*Run the loading screen until the initialized state is true. Then, the camera will be re-rendered, preventing the freezing*/}
    if (!initialized){
        return(
            <SafeAreaView style={styles.ActivityIndicatorStyle}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator size="large" color='#ebebeb'/>
                </View>
            </SafeAreaView>
        )
    }
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#93c7a1'}}>
            <View style={{flex: 0.5, backgroundColor: '#93c7a1', alignItems: 'center'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
                    Detection
                </Text>
            </View>
            {/*The cameraRef object you create is assigned to point to the camera.
            Note: Only the "current" property within the object (not the entire object) points to the camera component.*/}
            <Camera style={styles.container} ref={cameraRef}></Camera>
            <View style={{flex: 0.75, backgroundColor: '#93c7a1', justifyContent:'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.buttoncam} onPress={(takePic)}> 
                </TouchableOpacity>
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
})
export default CamPage