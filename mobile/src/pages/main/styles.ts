import { Dimensions, StyleSheet, StatusBar } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: themas.colors.white,
        paddingTop: StatusBar.currentHeight || 0,
    },
    content: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 20,
        gap: 20,
        paddingHorizontal: 2,
        paddingTop: 16,
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
    },
    cardSubtitle: {
        color: themas.colors.white,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: themas.colors.primary,
    },
    addButton: {
        backgroundColor: themas.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 25,
        gap: 8,
    },
    addButtonText: {
        color: themas.colors.white,
        fontSize: 16,
        fontWeight: '500',
    },
    plantList: {
        gap: 12,
    },
    plantCard: {
        backgroundColor: themas.colors.white,
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: themas.colors.gray,
        marginBottom: 12,
    },
    plantInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    plantImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: themas.colors.primary,
        resizeMode: 'contain',
    },
    plantDetails: {
        flex: 1,
    },
    plantName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themas.colors.primary,
    },
    plantType: {
        fontSize: 14,
        color: themas.colors.primary,
    },
    plantDate: {
        fontSize: 12,
        color: themas.colors.gray,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 12,
        gap: 8,
    },
    viewButton: {
        backgroundColor: themas.colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    deleteButton: {
        backgroundColor: themas.colors.primary,
        padding: 8,
        borderRadius: 25,
    },
    buttonText: {
        color: themas.colors.white,
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themas.colors.primary,
    },
}); 