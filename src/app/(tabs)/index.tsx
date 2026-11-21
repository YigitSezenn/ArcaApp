import Expenditure from '@/components/Expenditure';
import { Card } from '@/components/ui/card';
import { getBalance, onBalanceChange } from '@/lib/balance';
import { Theme } from '@/lib/theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [firstbalance, setFirstBalance] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const expenditureRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const time = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(time);
  }, []);

  useEffect(() => {
    getBalance()
      .then(setFirstBalance)
      .catch((e) => {
        console.log('Hata', 'Kayıtlı bakiyeniz yüklenirken bir sorun oluştu.');
        console.error(e);
      });
    return onBalanceChange(setFirstBalance);
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Arca'ya Hoşgeldiniz</Text>
      <Card style={styles.card}>
        <Text style={styles.date}>
          {format(now, 'd MMMM yyyy: HH:mm:ss', { locale: tr })}
        </Text>
        <Text style={styles.cardtext}>
          Bakiyeniz: {firstbalance.toFixed(2)}₺
        </Text>
      </Card>
      <View>
        <Pressable onPress={() => expenditureRef.current?.present()}>
          <Text style = {styles.title}>İşlem Ekle</Text>
        </Pressable>
      </View>

      <Expenditure ref={expenditureRef} />
    </SafeAreaView>
  );}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  date: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: Theme.border,
  },
  title: {
    fontSize: 20,
    paddingTop: 24,
    paddingHorizontal: 24,
    fontWeight: '700',
    color: Theme.primary,
  },
  card: {
    width: '90%',
    height : '10%',
    alignSelf: 'center',
    backgroundColor: Theme.primary,
    borderRadius: 12,
    padding: 12,
  },
  cardtext: {
    fontSize: 20,
    color: Theme.onPrimary,
    fontStyle: 'italic',
    fontWeight: '600',
  },
});

