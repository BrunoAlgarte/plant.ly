import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.white
    },
    boxTop:{
        height: Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxMid:{
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: themas.colors.primary,
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    logo:{
        width: 150,
        height: 150,
        marginBottom: 20
    },
    welcomeText:{
        fontSize: 20,
        color: themas.colors.white,
        marginBottom: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    titleInput:{
        marginLeft: 5,
        marginBottom: 5,
        color: themas.colors.white,
        fontSize: 12
    },
    boxInput:{
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: themas.colors.white,
        borderRadius: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff87'
    },
    input:{
        flex: 1,
        height: '100%',
        marginRight: 10
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: themas.colors.white,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    loginButtonText: {
        color: themas.colors.primary,
        fontSize: 16,
        fontWeight: 'bold'
    },
    forgotPassword: {
        marginTop: 15,
        color: themas.colors.white
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    registerText: {
        color: themas.colors.white,
        fontSize: 12
    },
    registerButton: {
        marginLeft: 5,
        color: themas.colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    }
})