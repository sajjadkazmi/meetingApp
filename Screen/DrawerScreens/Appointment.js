import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableHighlight } from 'react-native-gesture-handler';



const Appointment = () => {
  const [upcomingAppointments, setupcomingAppointments] = useState(
    [{
      id: "1",
      doctorname: "Dr. Ehsan Ullah",
      selectedDay: { year: 2022, month: 'October', day: 13, timestamp: 1665619200000, dateString: '2022-10-13' },
      selectedTime: "18:00",
      servicename: "Tooth Pain",
      address: "Main Street,18",
      contactNumber: "0341277410"
    },
    {
      id: "2",
      doctorname: "Dr. Azmat khan",
      selectedDay: { year: 2022, month: 'October', day: 13, timestamp: 1665619200000, dateString: '2022-10-13' },
      selectedTime: "11:00",
      servicename: "Consultation",
      address: "North Side Street,18",
      contactNumber: "0300458410"
    },
    {
      id: "3",
      doctorname: "Dr. Hafiz Rehman",
      selectedDay: { year: 2022, month: 'October', day: 13, timestamp: 1665619200000, dateString: '2022-10-13' },
      selectedTime: "16:00",
      servicename: "Cleaning",
      address: "Downtown,18",
      contactNumber: "00000000000"
    }]
  )



  useEffect(() => {
    // This is similar to componentDidMount
    // Call back-end api here
    async function fetchData() {
      const plans = []
      const response = await AsyncStorage.getItem('appointments')
      const parsed = JSON.parse(response);
      console.log('AsyncStorage.getItem', parsed)
    }
    fetchData();

  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 30, marginHorizontal: 20 }}>
        <View style={{ flex: 0.5,marginBottom:30, }}>
          <Text style={[styles.main_heading]}>Your Appointments</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Pressable style={{shadowColor: '#52006A', elevation: 2, shadowRadius:2, paddingVertical: 15, width: "49%",alignItems:"center",borderRadius:2,}}>
              <Text style={{ color: '#546BF6', fontWeight: "bold" }}>Upcoming</Text>
            </Pressable>
            <Pressable style={{ marginTop: 2, paddingVertical: 15,  width: "49%",alignItems:"center", backgroundColor: '#eeeff5',borderRadius:4 }}>
              <Text underlayColor={"white"} style={[styles.text]}>Past</Text>
            </Pressable>
          </View>
        </View>
        <ScrollView decelerationRate="fast" horizontal>
          {upcomingAppointments.map((source) => (


            <View key={source} style={{ flex: 4, backgroundColor: "#4E4EF5", width:305, marginBottom: 80, marginHorizontal:20, borderRadius: 8 }}>
              <View style={{ margin: 25 }}>
                <Text style={{ color: '#c3c8d1', fontWeight: 'bold' }}>In 3 days</Text>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, paddingVertical: 10 }}>Consultation with {source.doctorname}</Text>
                <Text style={{ color: 'white', paddingVertical: 10 }}><Ionicons name='calendar-outline' size={24} color="white" /> {source.selectedDay.month} {source.selectedDay.day}</Text>
                <Text style={{ color: 'white', paddingVertical: 10 }}><Ionicons name='time' size={24} color="white" /> {source.selectedTime} </Text>
                <Text style={{ color: 'white', paddingVertical: 10 }}><Ionicons name='location' size={24} color="white" /> {source.address} </Text>
                <Text style={{ color: 'white', paddingVertical: 10 }}><Ionicons name='call' size={24} color="white" /> {source.contactNumber} </Text>
                <TouchableHighlight style={{ borderColor: "white", borderRadius: 6, borderWidth: 1, width: 130, height: 40, marginTop: 40, paddingTop: 8 }}><Text style={{ color: "white", textAlign: 'center', fontWeight: 'bold' }}>RESCHEDULE</Text></TouchableHighlight>
              </View>
            </View>
          ))}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  main_heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#0d233c",
  }
})