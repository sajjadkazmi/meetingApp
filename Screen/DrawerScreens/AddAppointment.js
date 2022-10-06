import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableHighlight, Pressable, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';



const AddAppointment = (props) => {
    const navigation = useNavigation();
    const [question, setQuestion] = useState(1);
    const [doctorName, setdoctorName] = useState('');
    const [serviceName, setserviceName] = useState('');
    const [BGcolor, setBGcolor] = useState('white');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');



    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setQuestion(1);
    }, [])


    const handleSubmitPress = () => {

        setQuestion(question + 1)

        // if (!doctorName) {
        //     alert('Please Select Doctor');
        //     return;
        // }
        // if (!serviceName) {
        //     alert('Please Select Service Name');
        //     return;
        // }

    }
    const SubmitAppointment = async () => {

        var dataToSend = {
            id: uuid.v4(),
            doctorname: doctorName,
            servicename: serviceName,
            selectedDay: day,
            selectedTime: time

        };
        console.log("dataToSend", dataToSend)
        AsyncStorage.setItem('appointments', JSON.stringify(dataToSend));
        navigation.navigate("Appointment")

    }

    return (
        <View style={{ flex: 1, padding: 16 }}>

            <View style={{ flex: 1 }}>
                <Text style={[styles.main_heading]}>Book Appointment</Text>
                <Text style={{ fontWeight: "bold", color: "#b5bbc5" }}>Sajjad Kazmi</Text>
            </View>

            <View style={[{ flex: 8 }, styles.card, styles.shadowProp]}>

                {question == 1 && (
                    <View>
                        <Text style={{ color: "#c3c8d1", fontSize: 16, marginBottom: 10, fontWeight: "bold" }}>Select a Doctor</Text>

                        <TouchableHighlight underlayColor="#587cf6" style={[styles.walkThrough_button]} onPress={() => { setdoctorName('Dr. Ehsan Ullah'); setBGcolor('pink') }}>
                            <Text style={[styles.walkThrough_buttonText]}> Dr. Ehsan Ullah </Text>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="#587cf6" style={[styles.walkThrough_button, { backgroundColor: selected ? "red" : "transparent" }]} onPress={() => setdoctorName('Dr. Azmat khan')}>
                            <Text style={[styles.walkThrough_buttonText]}> Dr. Azmat khan </Text>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="#587cf6" style={[styles.walkThrough_button]} onPress={() => setdoctorName('Dr. Hafiz Rehman')}>
                            <Text style={[styles.walkThrough_buttonText]}> Dr. Hafiz Rehman </Text>
                        </TouchableHighlight>

                    </View>
                )}
                {question == 2 && (
                    <View>
                        <Text style={{ color: "#c3c8d1", fontSize: 16, marginBottom: 10, fontWeight: "bold" }}>HOW WE MAY HELP YOU?</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableHighlight underlayColor="#587cf6" style={[styles.category_box]} onPress={() => setserviceName('Consultation')}>
                                <View style={[styles.category_box_items]}>
                                    <Ionicons name='ios-medkit' size={24} color="#5777f6" />
                                    <Text >Consultation</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="#587cf6" style={[styles.category_box]} onPress={() => setserviceName('Tooth Pain')}>
                                <View style={[styles.category_box_items]}>
                                    <Ionicons name='ios-hammer' size={24} color="#5777f6" />
                                    <Text >Tooth Pain</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                            <TouchableHighlight underlayColor="#587cf6" style={[styles.category_box]} onPress={() => setserviceName('Cleaning')}>
                                <View style={[styles.category_box_items]}>
                                    <Ionicons name='ios-nuclear' size={24} color="#5777f6" />
                                    <Text >Cleaning</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="#587cf6" style={[styles.category_box]} onPress={() => setserviceName('Brases')}>
                                <View style={[styles.category_box_items]}>
                                    <Ionicons name='ios-flask' size={24} color="#5777f6" />
                                    <Text >Brases</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                            <TouchableHighlight underlayColor="#587cf6" style={[styles.category_box]} onPress={() => setserviceName('Dental Implants')}>
                                <View style={[styles.category_box_items]}>
                                    <Ionicons name='ios-heart' size={24} color="#5777f6" />
                                    <Text >Dental Implants</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}
                {question == 3 && (
                    <View>
                        <Text style={{ color: "#c3c8d1", fontSize: 16, marginBottom: 10, fontWeight: "bold" }}>Select Date</Text>
                        <Calendar
                            //   onDayPress={this.onDayPress(day)}
                            underlayColor="#5672F6"
                            onDayPress={day => {
                                console.log('selected day', day);
                                setDay(day);
                            }}
                            style={styles.calendar}
                            hideExtraDays
                            // markedDates={{ [this.state.selected]: { selected: true } }}
                            theme={{
                                selectedDayBackgroundColor: 'green',
                                todayTextColor: 'green',
                                arrowColor: 'green',
                            }}
                        />
                    </View>
                )}
                {question == 4 && (
                    <View>
                        <Text style={{ color: "#c3c8d1", fontSize: 16, marginBottom: 10, fontWeight: "bold" }}>Select Time Slot</Text>

                        <TouchableHighlight underlayColor={"#5672F6"} style={[styles.walkThrough_button]} onPress={() => setTime('11:00')} >
                            <Text style={[styles.walkThrough_buttonText]}>11:00 </Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={"#5672F6"} style={[styles.walkThrough_button]} onPress={() => setTime('14:30')}>
                            <Text style={[styles.walkThrough_buttonText]}>14:30 </Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={"#5672F6"} style={[styles.walkThrough_button]} onPress={() => setTime('15:00 ')}>
                            <Text style={[styles.walkThrough_buttonText]}> 15:00 </Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={"#5672F6"} style={[styles.walkThrough_button]} onPress={() => setTime('16:00')}>
                            <Text style={[styles.walkThrough_buttonText]}> 16:00 </Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={"#5672F6"} style={[styles.walkThrough_button]} onPress={() => setTime('18:00')}>
                            <Text style={[styles.walkThrough_buttonText]}> 18:00 </Text>
                        </TouchableHighlight>
                    </View>
                )}


            </View>
            <View ><Text style={{ color: "#b5bbc5", textAlign: "center", fontWeight: "600" }}>{question} of 4</Text></View>

            <View style={[{ flex: 1 }, styles.card, styles.footer]}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableHighlight underlayColor={"#556ff6"} style={[styles.button]} onPress={() => setQuestion(question != 1 ? question - 1 : 1)}>
                        <Text underlayColor={"white"} style={[styles.text]}>BACK</Text>
                    </TouchableHighlight>
                    {question == 4 ? (
                        <TouchableHighlight underlayColor={"#556ff6"} style={[styles.button]} onPress={SubmitAppointment}>
                            <Text style={[styles.text]}>SUBMIT</Text>
                        </TouchableHighlight>
                    ) : (

                        <TouchableHighlight underlayColor={"#556ff6"} style={[styles.button]} onPress={handleSubmitPress}>
                            <Text style={[styles.text]}>NEXT</Text>
                        </TouchableHighlight>
                    )}

                </View>

            </View>

        </View>
    );
};

export default AddAppointment;

const styles = StyleSheet.create({
    main_heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#000",
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    shadowProp: {
        shadowColor: '#52006A',
        elevation: 8,

    },

    category_box: {
        backgroundColor: "white",
        margin: 6,
        width: "45%",
        aspectRatio: 10 / 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#EEEFF5',
        borderWidth: 1,

    },
    category_box_items:{
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: "47%",
        alignItems: "center",
        marginHorizontal: 5,
        borderRadius: 4,
        borderColor: '#4e4ef5',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#4e4ef5',
    },

    walkThrough_buttonText: {
        color: "#0d233c",
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "HurmeGeometricSans4-SemiBold",
    },
    walkThrough_button: {
        // backgroundColor: "#1b87ff",
        borderColor: "#EEEFF5",
        borderWidth: 2,
        borderRadius: 6,
        height: 50,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});