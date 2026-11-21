
import { removalToBalance } from "@/lib/balance";
import { Theme } from "@/lib/theme";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { ThemedButton } from "@rcaferati/react-native-awesome-button";
import { Ref, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function Expenditure({ ref }: { ref: Ref<BottomSheetModal> }) {
const [balance,setbalance] = useState("")
const replaceamount = balance.replace(',', '.');
  const parsedAmount = parseFloat(replaceamount);
  const isAmountValid = !balance || isNaN(parsedAmount) || parsedAmount <= 0;


const handle  = async() =>
{
  if(isAmountValid)
   return; 
 try {
      await removalToBalance(parsedAmount);
      setbalance('');
      if (ref && typeof ref === "object") ref.current?.dismiss();
    } catch (e) {
      if (e instanceof Error && e.message === "Yetersiz Bakiye") {
        Alert.alert("Yetersiz bakiye", "Harcama tutarı bakiyenden büyük olamaz.");
      } else {
        Alert.alert("Hata", "Harcama kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

 const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    stiffness: 500,
  });
  return (
      <BottomSheetModal
        ref={ref}
        animationConfigs={animationConfigs}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        enableDynamicSizing={true}
      >
        <BottomSheetView style={styles.sheet}>
          <Text style={styles.sheetTitle}>Harcama Ekle</Text>
          <Text style={styles.sheetHint}>Tutarınızdan düşülecek harcamayı girin</Text>
          <View style={styles.amountBox}>
            <BottomSheetTextInput
              style={styles.input}
              placeholder="0,00"
              placeholderTextColor={Theme.textMuted}
              keyboardType="numeric"
              value={balance}
              onChangeText={(text) => setbalance(text.replace(/[^0-9]/g, ','))}
              maxLength={10}
            />
          </View>

          <View style={styles.modalButton}>
            <ThemedButton
              name="basic"
              type="anchor"
              stretch
              progress
              disabled={isAmountValid}
              buttonStyle={{
                borderRadius: 8,
                shadowColor: 'transparent',
              }}
              onPress={(next) => {
                void handle().finally(() => next?.());
              }}
            >
              Harcama Ekle
            </ThemedButton>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
  )
  
}
const styles = StyleSheet.create({
  tabWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fabIcon: {
  width: 32,
  height: 32,
},
  fabTouch:
  {
    top:-22
  },
  fab:{
    width:62,
    height:62,
    borderRadius:30,
    backgroundColor:Theme.primary,
    alignItems:'center',
    justifyContent:'center',
    elevation:8,
    shadowColor:'#000',
    shadowOffset:{width:0,height:4},
    shadowOpacity:0.30,
    shadowRadius:4.65,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabText: {
    marginTop: 4,
    fontSize: 10,
    color: Theme.tabLabel,
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
    fontWeight: '700',
    color: Theme.primary,
  },
  sheetHint: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 14,
    color: Theme.textMuted,
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    color: Theme.text,
    paddingVertical: 14,
  },
  modalButton: {
    marginTop: 20,
    marginHorizontal: 2,
    marginBottom: 24,
  },
});
