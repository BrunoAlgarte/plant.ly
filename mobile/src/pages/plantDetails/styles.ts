import { StyleSheet, StatusBar } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.white,
        paddingTop: StatusBar.currentHeight || 0,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        padding: 16,
        paddingBottom: 32,
    },
    plantHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    plantImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: themas.colors.primary,
        marginBottom: 16,
        resizeMode: 'contain',
    },
    plantName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: themas.colors.primary,
        marginBottom: 4,
    },
    plantType: {
        fontSize: 18,
        color: themas.colors.primary,
        marginBottom: 4,
    },
    plantDate: {
        fontSize: 14,
        color: themas.colors.gray,
    },
    infoSection: {
        gap: 12,
        marginBottom: 46,
    },
    infoItem: {
        backgroundColor: themas.colors.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: themas.colors.primary,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: themas.colors.primary,
    },
    infoValue: {
        fontSize: 16,
        color: themas.colors.text,
        paddingLeft: 32,
    },
}); 