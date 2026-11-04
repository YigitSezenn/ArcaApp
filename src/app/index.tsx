import { Card } from '@/components/ui/card';
import { Theme } from '@/lib/theme';
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetSpringConfigs
} from '@gorhom/bottom-sheet';
import { ThemedButton } from '@rcaferati/react-native-awesome-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { tr } from "date-fns/locale";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [firstbalance, setFirstBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const bottomSheetModalRef  = useRef<BottomSheetModal>(null);
  const replaceamount = amount.replace(",", ".");
  const parsedAmount = parseFloat(replaceamount);
  const isAmountValid = !amount || isNaN(parsedAmount) || parsedAmount <= 0;
  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    stiffness: 500,
  });

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const time = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(time);
  }, []);

  const handlebalance = async () => {
    if (isAmountValid) {
      return;
    }

    const current = Number.isNaN(firstbalance) ? 0 : firstbalance;

    try {
      const newBalance = current + parsedAmount;

      await AsyncStorage.setItem('balance', newBalance.toString());
      setFirstBalance(newBalance);
      setAmount("");
      closeModal();
      console.log('Başarılı', `${parsedAmount.toFixed(2)}₺ bakiyenize eklendi.`);
    }
    catch (e) {
      console.log('Hata', 'Bakiye kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(e);
    }
  };

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const savedBalance = await AsyncStorage.getItem("balance");
        const value = savedBalance === null ? NaN : parseFloat(savedBalance);
        if (!Number.isNaN(value)) {
          setFirstBalance(value);
        }
      } catch (e) {
        console.log('Hata', 'Kayıtlı bakiyeniz yüklenirken bir sorun oluştu.');
       console.error(e);
      }
    };

    loadBalance();
  }, []);

  
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Arca'ya Hoşgeldiniz</Text>
      <Card style={styles.card}>
        <Text style={styles.date}>
          {format(now, "d MMMM yyyy: HH:mm:ss", { locale: tr })}
        </Text>
        <Text style={styles.cardtext}>
          Bakiyeniz: {firstbalance.toFixed(2)}₺
        </Text>
      </Card>
      <View style={styles.content}>
        <Pressable style={styles.Button} onPress={openModal}>
          <Text style={styles.link}>Bakiye Ekle</Text>
        </Pressable>
        </View>
        <BottomSheetModal
         ref={bottomSheetModalRef}
         animationConfigs={animationConfigs}
         keyboardBehavior = "interactive"
         keyboardBlurBehavior = "restore"
         android_keyboardInputMode = "adjustResize"
         enableDynamicSizing={true}
        
        >
           <BottomSheetView style={styles.sheet}>
            <Text style={styles.sheetTitle}>Bakiye Ekle</Text>
          <Text style={styles.sheetHint}>Kartına eklenecek tutarı gir</Text>
          <View style={styles.amountBox}>
          <BottomSheetTextInput
                style={styles.input}
                placeholder="0,00"
                placeholderTextColor={Theme.textMuted}
                keyboardType="numeric"
                value={amount}
                onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ","))}
                 maxLength={10}
              />
            </View>
             
              <View style = {styles.modalButton}>
            <ThemedButton
              name="basic"
              type="anchor"
              stretch
              progress
              disabled={isAmountValid}
              buttonStyle={{
                borderRadius :8,
                shadowColor:"transparent",
               
              }
                
              }
             
              onPress={(next) => { void handlebalance().finally(() => next?.());
}}
                 
      
            >
              Bakiye Ekle
            </ThemedButton>
          </View>
          </BottomSheetView>
         
        </BottomSheetModal>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  date: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: Theme.border,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    paddingTop: 24,
    paddingHorizontal: 24,
    fontWeight: "700",
    color: Theme.primary,
  },
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: Theme.primary,
    borderRadius: 12,
    padding: 16,
  },
  cardtext: {
    fontSize: 20,
    color: Theme.onPrimary,
    fontStyle: "italic",
    fontWeight: "600",
  },
  Button: {
    marginTop: 2,
    padding: 2,
  },
  link: {
    fontSize: 16,
    color: Theme.primary,
    fontWeight: "600",
  },
  sheet: {
    backgroundColor: Theme.background,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Theme.primary,
  },
  sheetHint: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 14,
    color: Theme.textMuted,
  },
  amountBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 22,
    fontWeight: "600",
    color: Theme.text,
    paddingVertical: 14,
  },
  modalButton: {
    marginTop: 20,
    marginHorizontal: 2,
    marginBottom: 24,
  },
});