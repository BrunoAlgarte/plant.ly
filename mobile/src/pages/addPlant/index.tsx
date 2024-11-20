import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import React, { useState } from "react";
import api from "../../utils/api";
import styles from "./styles";
import axios from "axios";

type AddPlantScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddPlant"
>;

const AddPlant = () => {
  const navigation = useNavigation<AddPlantScreenNavigationProp>();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !type) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("@PlantApp:userId");

      if (!userId) {
        Alert.alert("Erro", "Usuário não encontrado");
        return;
      }

      const imageBase64 = image
        ? await fetch(image)
            .then((res) => res.blob())
            .then((blob) => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });
            })
        : null;

      const payload = {
        user_id: userId,
        name: name.trim(),
        type: type.trim(),
        image:
          imageBase64 ||
          (await fetch(require("../../assets/logo_novo.png"))
            .then((res) => res.blob())
            .then((blob) => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });
            })),
      };

      const response = await api.post(`/v1/plants/user/${userId}`, payload);

      if (response.status === 201) {
        Alert.alert("Sucesso", "Planta adicionada com sucesso!", [
          { text: "OK", onPress: () => navigation.navigate("Main") },
        ]);
      }
    } catch (error) {
      console.error("Erro ao adicionar planta:", error);
      if (axios.isAxiosError(error)) {
        console.error("Detalhes do erro:", error.response?.data);
      }
      Alert.alert("Erro", "Erro ao adicionar planta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={themas.colors.white}
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={themas.colors.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Adicionar Planta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.selectContainer}>
        <Picker
          selectedValue={type}
          style={styles.select}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label="Selecione o tipo" value="" />
          <Picker.Item label="Folhosa" value="Folhosas" />
          <Picker.Item label="Raiz" value="Raízes" />
          <Picker.Item label="Fruto" value="Frutos" />
          <Picker.Item label="Leguminosa" value="Leguminosas" />
          <Picker.Item label="Condimento" value="Condimentos" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCamera}>
        <Text style={styles.buttonText}>Usar Câmera</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Adicionar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddPlant;
