import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    items:{
      fontSize:15,
      padding:10,
    },
    wifi:{
     marginTop:20,
     width:'100%'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,.5)",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 10,
      paddingVertical:10,
      paddingHorizontal:15,
      width:'65%',
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 10,
      padding: 8,
      width:80,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });