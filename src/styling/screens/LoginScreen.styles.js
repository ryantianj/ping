import {StyleSheet, Dimensions} from "react-native";
import colours from "../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
        container: {
            color: colours.primary,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        textInput :{
            paddingLeft: 15,
            textAlign: 'left',
            borderWidth: 1,
            borderColor: 'black',
            fontSize: 20,
            marginTop: 10,
            backgroundColor: colours.textBox,
            width: 2 * windowWidth / 3,
            height: 50,
            borderRadius: 10
        },
        image :{
            width: 125,
            height: 100,
        },
        button : {
            marginTop: 10,
            paddingTop: 13,
            fontSize: 50,
            borderRadius: 10,
            width: 2 * windowWidth / 3,
            height: 50,
            backgroundColor: colours.logInButton
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
        },
        forgotPasswordButton : {

        },
        forgotPasswordButtonText : {
            paddingTop: 10,
            color: 'white',
            textAlign: 'center',
        },
        signUpButton : {

        },
        signUpButtonText : {
            color: 'white',
        },
        signUpButtonTextOpac : {
            position:'absolute',
            bottom: 10,
            color: 'white',
        },
        signUpButtonTextHere : {
            color: 'white',
        }


    }
)