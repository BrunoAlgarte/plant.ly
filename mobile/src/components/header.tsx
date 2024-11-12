import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string;
    showMenu?: boolean;
    showProfile?: boolean;
    onMenuPress?: () => void;
    profileImage?: string;
    isNotificationScreen?: boolean;
    onNotificationPress?: () => void;
    notificationCount?: number;
}

export function Header({ 
    title, 
    showMenu = false,
    showProfile = false,
    onMenuPress,
    profileImage,
    isNotificationScreen = false,
    onNotificationPress,
    notificationCount = 0
}: HeaderProps) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
        <View style={styles.leftContainer}>
            {showMenu && (
            <TouchableOpacity onPress={onMenuPress}>
                <Ionicons name="menu" size={24} color="#52665A" />
            </TouchableOpacity>
            )}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightContainer}>
            {isNotificationScreen ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#52665A" />
            </TouchableOpacity>
            ) : (
            <View style={styles.rightButtons}>
                <TouchableOpacity 
                style={styles.notificationButton} 
                onPress={onNotificationPress}
                >
                <Ionicons name="notifications-outline" size={24} color="#52665A" />
                {notificationCount > 0 && (
                    <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {notificationCount > 99 ? '99+' : notificationCount}
                    </Text>
                    </View>
                )}
                </TouchableOpacity>
                
                {showProfile && (
                <TouchableOpacity>
                    <Image 
                    source={profileImage ? { uri: profileImage } : require('../assets/default-avatar.png')}
                    style={styles.profileImage}
                    />
                </TouchableOpacity>
                )}
            </View>
            )}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },
    leftContainer: {
        width: 56,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 17,
        color: '#52665A',
        fontWeight: '500',
    },
    rightContainer: {
        minWidth: 56,
        alignItems: 'flex-end',
    },
    rightButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#52665A',
    },
    notificationButton: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: '#E83F5B',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
});