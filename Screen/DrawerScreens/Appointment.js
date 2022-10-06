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
    // <SafeAreaView>
      <View style={[styles.mainBody]}>
        
        <View style={{ flex: 1,}}>
          <Text style={[styles.main_heading]}>Your Appointments</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", marginVertical:10 }}>
            <Pressable style={[styles.upcomingApptBtn,{shadowColor: '#52006A', elevation: 1, shadowRadius:1,}]}>
              <Text style={{ color: '#546BF6', fontWeight: "bold" }}>Upcoming</Text>
            </Pressable>
            <Pressable style={[styles.upcomingApptBtn,{backgroundColor: '#eeeff5',}]}>
              <Text underlayColor={"white"} style={[styles.text]}>Past</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView decelerationRate="fast" horizontal>
          {upcomingAppointments.map((source) => (
            <View key={source} style={[styles.appointmentCard,{ flex: 4}]}>
              <View style={{ margin: 25 }}>
                <Text style={{ color: '#c3c8d1', fontWeight: 'bold' }}>In 3 days</Text>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, paddingVertical: 10 }}>Consultation with {source.doctorname}</Text>
                <Text style={[styles.appointmentCardDetails]}><Ionicons name='calendar-outline' size={24} color="white" /> {source.selectedDay.month} {source.selectedDay.day}</Text>
                <Text style={[styles.appointmentCardDetails]}><Ionicons name='time' size={24} color="white" /> {source.selectedTime} </Text>
                <Text style={[styles.appointmentCardDetails]}><Ionicons name='location' size={24} color="white" /> {source.address} </Text>
                <Text style={[styles.appointmentCardDetails]}><Ionicons name='call' size={24} color="white" /> {source.contactNumber} </Text>
                <TouchableHighlight style={[styles.rescheduleBtn]}><Text style={{ color: "white", textAlign: 'center', fontWeight: 'bold' }}>RESCHEDULE</Text></TouchableHighlight>
              </View>
            </View>
          ))}
        </ScrollView>

      </View>
    // </SafeAreaView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin:"5%"
  },
  main_heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#0d233c",
  },
  upcomingApptBtn:{
    width: "50%",
    aspectRatio: 10 / 2.5,
    justifyContent:'center',
    alignItems:"center", 
    borderRadius:4, 
  },
  appointmentCard:{
    backgroundColor: "#4E4EF5",
    width:305, 
    marginVertical:40,
    marginHorizontal:20,
    borderRadius: 8 
  },
  appointmentCardDetails:{
    color: 'white',
    paddingVertical: 10
  },
  rescheduleBtn:{
    borderColor: "white", 
    borderRadius: 6, 
    borderWidth: 1, 
    width: 130,
    height: 40, 
    marginTop: 40, 
    paddingTop: 8 
  }
})