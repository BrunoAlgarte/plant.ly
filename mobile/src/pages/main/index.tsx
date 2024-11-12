import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ImageBackground, 
    SafeAreaView,
    StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/header';
import { themas } from '../../global/themes';
import { style } from './styles';
import { RootStackParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export function MainScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={style.container}>
            <StatusBar 
                backgroundColor={themas.colors.white}
                barStyle="dark-content"
            />
            
            <Header 
                title="Menu Principal"
                showMenu={true}
                showProfile={true}
                onMenuPress={() => {}}
                notificationCount={3}
            />

            <View style={style.content}>
                <TouchableOpacity 
                    style={style.card}
                    
                >
                    <ImageBackground
                        source={require('../../assets/img/floresta.jpg')}
                        style={style.cardBackground}
                        imageStyle={style.cardImage}
                    >
                        <View style={style.cardOverlay}>
                            <Text style={style.cardTitle}>DASH</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={style.card}
                    
                >
                    <ImageBackground
                        source={require('../../assets/img/canto_1.jpg')}
                        style={style.cardBackground}
                        imageStyle={style.cardImage}
                    >
                        <View style={style.cardOverlay}>
                            <Text style={[style.cardTitle, style.greenText]}>
                                PLANTAS
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
} 