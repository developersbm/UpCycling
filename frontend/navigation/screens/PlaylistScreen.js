// PlaylistScreen.js
import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import PlaylistCard from '../../components/PlaylistCard';
import playlistData from '../../dataTest/index';
import { useNavigation } from '@react-navigation/native';

const PlaylistScreen = () => {
  const navigation = useNavigation();

  const splitData = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const playlistRows = splitData(playlistData, 2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          {playlistRows.map((row, index) => (
            <View key={index} style={styles.row}>
              {row.map((playlist) => (
                <TouchableOpacity
                  key={playlist.title}
                  onPress={() => {
                    console.log(playlist.img, playlist.title, playlist.ingredients);
                    navigation.navigate('InsidePLScreen', {
                      img: playlist.img,
                      title: playlist.title,
                      ingredients: playlist.ingredients,
                    });
                  }}
                  style={styles.touchable}
                >
                  <PlaylistCard title={playlist.title} img={playlist.img} />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  subContainer: {
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  touchable: {
    flex: 1,
    marginHorizontal: 5,
  },
});
