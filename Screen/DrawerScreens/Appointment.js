import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableHighlight } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../Components/Loader';
import Global from '../Components/Global';
import AddAppointment from './AddAppointment';


const { width } = Dimensions.get("window");
const height = width * 0.6;

const Appointment = ({ route,navigation }) => {
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
  const [appointments, setappointments] = useState([]);
  const [loading, setLoading] = useState(false);




  useEffect(() => {


    async function fetchData() {
      const ress = await AsyncStorage.getItem('user_id')
      const client = JSON.parse(ress);
      console.log("valuess", client.id)

      setLoading(true);
      let response = await Global.fetchpost("GET",
        `https://user-api-v2.simplybook.me/admin/bookings?filter[client_id]=${client.id}`
      );
      let res = await response.json();
      console.log("json response", res.data);
      setLoading(false);

      if (res.data) {
        setappointments(res.data);
      }
      else {
        Alert.alert("", "Something went wrong!", [{ text: "OK", onPress: () => { } }],
          {
            cancelable: false,
          }
        );
      }
    }
    fetchData();

  }, loading)

  const deleteAppointment = async (deleteId) => {
    console.log("delete id", deleteId);
    Alert.alert(
      "Alert",
      "Are you sure to delete this appointment?",
      [

        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "YES", onPress: () => 
      
      callDeleteApi(deleteId)

      }
      ]
    );

    const callDeleteApi = async (deleteId) => {
      setLoading(true);
      // doctors list fetching starts
      let response = await Global.fetchpost("DELETE",
        `https://user-api-v2.simplybook.me/admin/bookings/${deleteId}`
      );
      let res = await response.json();
      console.log("json response", res);
      setLoading(false);

      // if (res.data) {
      //   setDoctorList(res.data)
      // }
      // else {
       
      // }
    }
  }
  const checkAppointments = () => {

    console.log("appointments", appointments)
  }

  return (
    <View style={[styles.mainBody]}>
      <Loader loading={loading} />
      <View>
        <Text style={[styles.main_heading]}>Your Appointments</Text>
      </View>

      <View >
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Pressable style={[styles.upcomingApptBtn, { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2, }]}>
            <Text style={{ color: '#546BF6', fontWeight: "bold" }}>Upcoming</Text>
          </Pressable>
          <Pressable onPress={checkAppointments} style={[styles.upcomingApptBtn, { backgroundColor: '#eeeff5', }]}>
            <Text underlayColor={"white"} style={[styles.text]}>Past</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView pagingEnabled contentContainerStyle={{ flexGrow: 1 }} decelerationRate="fast" horizontal showsHorizontalScrollIndicator={false} >
        {appointments == undefined || appointments.length == 0 ? (
          <LinearGradient colors={['#5a85f6', '#5366f5', '#4c47f5']} style={{ width: "90%", marginVertical: 40, marginHorizontal: 20, borderRadius: 8 }}>
            <View style={{ margin: 25 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, paddingVertical: 10, textAlign: 'center' }}>No Appointments yet</Text>
            </View>
          </LinearGradient>

        )
          :
          appointments.map((source) => (
            <LinearGradient colors={['#5a85f6', '#5366f5', '#4c47f5']} key={source} style={[styles.appointmentCard]}>
              <View style={{ margin: 25 }}>
                <Text style={{ color: '#c3c8d1', fontWeight: 'bold' }}>In 3 days</Text>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, paddingVertical: 10 }}>Consultation with {source.provider.name}</Text>
                <Text style={[styles.appointmentCardDetails]}><Ionicons name='calendar-outline' size={24} color="white" /> {source.start_datetime}</Text>
                <Text style={[styles.appointmentCardDetails]}><Ionicons name='time' size={24} color="white" /> {source.end_datetime} </Text>
                <Text style={[styles.appointmentCardDetails]}><Ionicons name='location' size={24} color="white" /> {source.location == null ? 'NOT GIVEN' : source.location} </Text>
                <Text style={[styles.appointmentCardDetails]}><Ionicons name='call' size={24} color="white" /> {source.status} </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableHighlight
                    style={[styles.rescheduleBtn]}
                    onPress={() => navigation.navigate('AddAppointment', {
                      provider_id: source.provider.id,
                      service_id: source.service.id,
                      start_time: source.start_datetime,
                      appointment_id: source.id
                    })}>
                    <Text style={{ color: "white", textAlign: 'center', fontWeight: 'bold' }} >RESCHEDULE</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[styles.rescheduleBtn, { backgroundColor: '#db413d' }]}
                    onPress={() => deleteAppointment(source.id)}
                  >
                    <Text style={{ color: "white", textAlign: 'center', fontWeight: 'bold' }} >CANCEL</Text>
                  </TouchableHighlight>
                </View>

              </View>
            </LinearGradient>
          ))

        }
      </ScrollView>

    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: "5%",
    marginTop: "10%"
  },
  main_heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#0d233c",
  },
  upcomingApptBtn: {
    width: "50%",
    aspectRatio: 10 / 2.5,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 2,
  },
  appointmentCard: {
    // backgroundColor: "",
    width: 300,
    marginVertical: 40,
    marginHorizontal: 20,
    borderRadius: 8
  },
  appointmentCardDetails: {
    color: 'white',
    paddingVertical: 10
  },
  rescheduleBtn: {
    borderColor: "white",
    borderRadius: 6,
    borderWidth: 1,
    width: 120,
    height: 40,
    // marginTop: 40,
    marginVertical: 40,
    marginHorizontal: 4,
    paddingTop: 8
  }
})