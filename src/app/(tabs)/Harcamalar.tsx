

import { View, Text, StyleSheet } from "react-native";
import Screen from "@/components/Screen";
import { useAppTheme } from "@/theme";
import { useEffect, useState } from "react";


function Datenow()
{
  const today = new Date();
  return today.toLocaleDateString("tr-TR",
    {
    day: "numeric",
    month: "long",
    weekday: "long",
    }
  )
}


function Harcamalar() {
  const [date,setdate] = useState(Datenow);
  const theme = useAppTheme();

  useEffect(() => {
    const id = setInterval(() => {
      setdate((old) => {
        const now = Datenow();
        return old !== now ? now : old;
      });
    }, 60_000);
 
    return () => clearInterval(id);
  }, []);


  return (
    <Screen style={[{ backgroundColor: theme.background}]}>
      <View>
    <Text style={[styles.Datetext, { color: theme.text }]}>{date}</Text>
      </View>
      <View>
     
      </View>
      <View style = {styles.container}>
      <Text style={[styles.text, { color: theme.text }]}>Harcamalarım</Text>
    </View>
    </Screen>
    
  );
}
export default Harcamalar;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
   
  },

  Datetext : {
    fontSize: 20,
    fontWeight: "bold",
    //marginBottom: 20,
    padding:20
  },
});
