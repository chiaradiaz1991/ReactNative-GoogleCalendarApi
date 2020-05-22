import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import axios from 'react-native-axios';
import moment from 'moment';

let API_KEY = 'YOUR_TOKEN';
let LANG = 'es';
let COUNTRY = 've';
let NAME = 'VENEZUELA';

export default class CalendarApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: [],
    };
  };

  async componentDidMount() {
    try {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${LANG}.${COUNTRY}%23holiday%40group.v.calendar.google.com/events?key=${API_KEY}`;
      const request = axios.get(url);
      const response = await request;
      this.setState({
        holidays: response.data.items,
      });
    } catch (error) {
      console.log("Error fetching Data", error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri:
              'https://i.pinimg.com/originals/fc/cd/bd/fccdbd24735e3cf50d5eb2bccb37eb9e.jpg',
          }}
          style={styles.backgroundImage}>
          <Text style={styles.title}>International Holidays in {NAME}</Text>
          {
            this.state.holidays.length > 0 ?
              (
                <FlatList
                  data={this.state.holidays}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.itemContainer}>
                        <Text style={styles.summary}>{item.summary}</Text>
                        <View style={styles.containerContent}>
                          <View style={styles.textContainer}>
                            <Text style={styles.dateText}>Start Date</Text>
                            <Text style={styles.dates}>
                              {moment(item.start.date).format('M/D/YY')}
                            </Text>
                          </View>
                          <View style={styles.textContainer}>
                            <Text style={styles.dateText}>End Date</Text>
                            <Text style={styles.dates}>
                              {moment(item.end.date).format('M/D/YY')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => item.key}
                />
              ) : (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>Please choose another country</Text>
                </View>
              )
          }
        </ImageBackground>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    display: 'flex',
    paddingTop: 30,
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'center',
    borderBottomColor: 50,
    fontFamily: 'Futura',
    color: '#15013b',
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'column',
  },
  summary: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Futura',
    color: '#15013b',
    marginVertical: 5,
  },
  containerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  dates: {
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'Futura',
    color: '#33038c',
  },
  errorContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  error: {
    fontFamily: 'Futura',
    color: '#15013b',
    fontSize: 18,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Futura',
    color: 'grey',
  },
  textContainer: {
    justifyContent: 'center',
  },
});