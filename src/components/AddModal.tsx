import { Theme } from '@/lib/theme';
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { ThemedButton } from '@rcaferati/react-native-awesome-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useCallback, useRef, useState } from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const BALANCE_UPDATED_EVENT = 'balanceUpdated';
export default function AddModal() {
  const [amount, setAmount] = useState('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const replaceamount = amount.replace(',', '.');
  const parsedAmount = parseFloat(replaceamount);
  const isAmountValid = !amount || isNaN(parsedAmount) || parsedAmount <= 0;

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    stiffness: 500,
  });
  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handlebalance = async () => {
    if (isAmountValid) {
      return;
    }
    try {
      const savedBalance = await AsyncStorage.getItem('balance');
      const current = savedBalance === null ? 0 : parseFloat(savedBalance);
      const safeCurrent = Number.isNaN(current) ? 0 : current;
      const newBalance = safeCurrent + parsedAmount;

      await AsyncStorage.setItem('balance', newBalance.toString());
      DeviceEventEmitter.emit(BALANCE_UPDATED_EVENT, newBalance);
      setAmount('');
      closeModal();
      console.log('Başarılı', `${parsedAmount.toFixed(2)}₺ bakiyenize eklendi.`);
    } catch (e) {
      console.log('Hata', 'Bakiye kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(e);
    }
  };

  return (
    <View style={styles.tabWrap}>
      <TouchableOpacity onPress={openModal} style ={styles.fabTouch}>
        <View style={styles.fab}>
          <Image source={require("@/assets/icon/add-to-cart.png")} style = {styles.fabIcon}></Image>
          {/* <FontAwesome name="cart-plus" size={25} color={Theme.tabIcon} /> */}
          <Text style={styles.bottomTabText}>Add</Text>
        </View>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        animationConfigs={animationConfigs}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
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
              onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ','))}
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
                void handlebalance().finally(() => next?.());
              }}
            >
              Bakiye Ekle
            </ThemedButton>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
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
