import { Card } from '@/components/ui/card';
import { Theme } from '@/lib/theme';
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetSpringConfigs
} from '@gorhom/bottom-sheet';
import { format, parseISO } from 'date-fns';
import { tr } from "date-fns/locale";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight =
//   Platform.OS === 'ios'
//     ? Dimensions.get('window').height
//     : require('react-native-extra-dimensions-android').get(
//         'REAL_WINDOW_HEIGHT',
//       );

export const formatDate = (
  date: string | number | Date,
  pattern = 'dd/MM/yyyy HH:mm'
) =>
  format(
    typeof date === 'string' ? parseISO(date) : new Date(date),
    pattern
  )

export default function Index() {
  const [firstbalance, setFirstBalance] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const bottomSheetModalRef  = useRef<BottomSheetModal>(null);

const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, [])
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
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
          />
            </View>
            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Ekle</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetModal>
        {/* <Modal
          isVisible={isModalVisible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          onBackdropPress={closeModal}
          onSwipeComplete={closeModal}
          swipeDirection="down"
          avoidKeyboard
          style={styles.bottomModal}
        >
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>Bakiye Ekle</Text>
            <Text style={styles.sheetHint}>Kartına eklenecek tutarı gir</Text>
            <View style={styles.amountBox}>
              <Text style={styles.currency}>₺</Text>
              <TextInput
                style={styles.input}
                placeholder="0,00"
                placeholderTextColor={Theme.textMuted}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Ekle</Text>
            </Pressable>
          </View>
        </Modal>
      </View> */}
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
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    backgroundColor: Theme.background,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: Theme.border,
    marginBottom: 16,
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
  currency: {
    fontSize: 22,
    fontWeight: "700",
    color: Theme.primary,
    marginRight: 8,
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
    alignItems: "center",
    backgroundColor: Theme.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: Theme.onPrimary,
  },
});