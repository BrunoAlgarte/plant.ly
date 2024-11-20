import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { style } from "./styles";
import { themas } from "../../global/themes";
import api from "../../utils/api";
import { LineChart } from "react-native-svg-charts";
import { BarChart } from "react-native-svg-charts";
import { Grid } from "react-native-svg-charts";
import { XAxis } from "react-native-svg-charts";
import { YAxis } from "react-native-svg-charts";
import * as d3 from "d3";

interface RouteParams {
  id: string;
}

interface Plant {
  _id: string;
  name: string;
  type: string;
  image: string;
  date_created: string;
}

interface Species {
  name: string;
  scientific_name: string;
  watering_tips: string;
  sunlight_tips: string;
  soil_tips: string;
  temperature_min: number;
  temperature_max: number;
  growth_time: string;
}

export function PlantDetails() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [species, setSpecies] = useState<Species | null>(null);
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [media, setMedia] = useState<{ media_temperatura_do_ar: string; media_umidade_do_ar: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as RouteParams;

  const fetchPlantDetails = async () => {
    try {
      const { data: plantData } = await api.get(`/v1/plants/${id}`);
      setPlant(plantData);

      const { data: speciesData } = await api.get(
        `/v1/species/name/${plantData.type}`
      );
      setSpecies(speciesData);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da planta");
    } finally {
      setLoading(false);
    }
  };

  const getSensor = async () => {
    try {
      const { data } = await api.get(
        `/v1/sensors?plantid=${id}&startDate=2024-11-18&endDate=2024-11-19`
      );
      setSensorData(data);
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar dados do sensor.");
    } finally {
      setLoading(false);
    }
  };
  console.log("sensorData", sensorData);

  const getMedia = async () => {
    try {
      const { data } = await api.get(
        `/v1/sensors/average?plantid=${id}&startDate=2024-11-18&endDate=2024-11-19`
      );
      setMedia(data);
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar dados do sensor.");
    } finally {
      setLoading(false);
    }
  };
  console.log("media", media);

  useEffect(() => {
    fetchPlantDetails();
    getSensor();
    getMedia();
  }, [id]);

  if (loading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color={themas.colors.primary} />
      </View>
    );
  }

  const sortedHumidityData = sensorData
    .slice(-20)
    .map((data) => data.humidity_air)
    .sort((a, b) => b - a);
  const sortedTemperatureData = sensorData
    .slice(-20)
    .map((data) => data.temperature_air)
    .sort((a, b) => b - a);
  console.log("sortedHumidityData", sortedHumidityData);
  console.log("sortedTemperatureData", sortedTemperatureData);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        backgroundColor={themas.colors.white}
        barStyle="dark-content"
      />

      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={themas.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={style.content}>
        <View style={style.plantHeader}>
          <Image
            source={
              plant?.image
                ? { uri: plant.image }
                : require("../../assets/logo_novo.png")
            }
            style={style.plantImage}
          />
          <Text style={style.plantName}>{plant?.name}</Text>
          <Text style={style.plantType}>{plant?.type}</Text>
          <Text style={style.plantDate}>
            Adicionado em:{" "}
            {plant?.date_created
              ? new Date(plant.date_created).toLocaleDateString()
              : ""}
          </Text>
        </View>

        <View style={style.infoSection}>
          <InfoItem icon="tag" title="Tipo" value={species?.name} />
          <InfoItem
            icon="book"
            title="Nome científico"
            value={species?.scientific_name}
          />
          <InfoItem
            icon="droplet"
            title="Rega"
            value={species?.watering_tips}
          />
          <InfoItem icon="sun" title="Sol" value={species?.sunlight_tips} />
          <InfoItem icon="target" title="Solo" value={species?.soil_tips} />
          <InfoItem
            icon="thermometer"
            title="Temperatura"
            value={`Min ${species?.temperature_min}°C - Max ${species?.temperature_max}°C`}
          />
          <InfoItem
            icon="trending-up"
            title="Crescimento"
            value={species?.growth_time}
          />
        </View>

        <View style={style.averageSection}>
          <Text style={style.averageTitle}>Média temperatura do ar: {media ? media.media_temperatura_do_ar : 'N/A'}</Text>
          <Text style={style.averageTitle}>Média umidade do ar: {media ? media.media_umidade_do_ar : 'N/A'}</Text>
        </View>

        <View style={{ height: 500, marginBottom: 50, paddingHorizontal: 4 }}>
          <Text style={style.graphName}>Temperatura</Text>
          <Text style={style.graphDescription}>
            Últimas 20 leituras de temperatura
          </Text>
          <LineChart
            style={{ flex: 1, marginLeft: 5 }}
            data={sensorData.slice(-20).map((data) => data.temperature_air)}
            svg={{ stroke: "red", strokeWidth: 2, translateX: 35 }}
            contentInset={{ top: 20, bottom: 20 }}
            yAccessor={({ item }) => item}
            yScale={d3.scaleLinear}
          >
            <YAxis
              data={sortedTemperatureData}
              yAccessor={({ item }) => item}
              style={{ position: "relative", left: 0, top: 0, bottom: 0 }}
              contentInset={{ top: 155, bottom: 10 }}
              svg={{
                fill: "black",
                fontSize: 10,
                dx: -155,
              }}
              numberOfTicks={8}
              formatLabel={(value) => `${value}ºC`}
            />
            <Grid />
            {/* <XAxis
              style={{ marginBottom: 10 }}
              data={sensorData.slice(-20).reverse()}
              formatLabel={(value, index) => index + 1}
              contentInset={{ left: 25, right: 10 }}
            /> */}
          </LineChart>

          <Text style={style.graphName}>Umidade</Text>
          <Text style={style.graphDescription}>
            Últimas 20 leituras de umidade
          </Text>
          <BarChart
            style={{ flex: 1 }}
            data={sensorData.slice(-20).map((data) => data.humidity_air)}
            svg={{
              fill: "#1e722f",
              strokeWidth: 2,
              stroke: "white",
              translateX: 27,
            }}
            contentInset={{ top: 20, bottom: 20 }}
            yAccessor={({ item }) => item}
            yScale={d3.scaleLinear}
            numberOfTicks={10}
          >
            {/* <Grid 
            /> */}
            {/* <XAxis
              style={{ marginTop: 10 }}
              data={sensorData.slice(-20).reverse()}
              formatLabel={(value, index) => index + 1}
              contentInset={{ left: 30, right: 10 }}
            /> */}
            <YAxis
              data={sortedHumidityData}
              style={{ position: "relative", left: 0, top: 0, bottom: 0 }}
              contentInset={{ top: 190, bottom: 5 }}
              svg={{
                fill: "black",
                fontSize: 10,
                dx: -155,
              }}
              numberOfTicks={10}
              formatLabel={(value) => `${value}%`}
            />
          </BarChart>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface InfoItemProps {
  icon: string;
  title: string;
  value?: string;
}

const InfoItem = ({ icon, title, value }: InfoItemProps) => (
  <View style={style.infoItem}>
    <View style={style.infoHeader}>
      <Feather name={icon as any} size={24} color={themas.colors.primary} />
      <Text style={style.infoTitle}>{title}:</Text>
    </View>
    <Text style={style.infoValue}>{value}</Text>
  </View>
);

export default PlantDetails;
