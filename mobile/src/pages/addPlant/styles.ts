import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.white,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: themas.colors.primary,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: themas.colors.primary,
        borderRadius: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff87',
    },
    select: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: themas.colors.primary,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff87',
    },
    button: {
        backgroundColor: themas.colors.primary,
        padding: 15,
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: themas.colors.white,
        fontSize: 16,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        color: themas.colors.primary,
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    selectContainer: {
        width: '100%',
        borderWidth: 2,
        borderColor: themas.colors.primary,
        borderRadius: 15,
        marginBottom: 15,
        backgroundColor: '#ffffff87',
    },
});

export default styles;
