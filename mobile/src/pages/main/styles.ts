import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: themas.colors.white
    },
    content: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 20,
        gap: 20,
    },
    card: {
        flex: 1,
        borderRadius: 25,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 2,
        borderColor: themas.colors.gray,
    },
    cardBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        minHeight: Dimensions.get('window').height / 3,
    },
    cardImage: {
        borderRadius: 25,
    },
    cardOverlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 20,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: themas.colors.white,
        textTransform: 'uppercase',
    },
    greenText: {
        color: themas.colors.primary,
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    }
}); 