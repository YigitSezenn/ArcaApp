import { BALANCE_UPDATED_EVENT } from '@/components/AddModal';
import { Card } from '@/components/ui/card';
import { Theme } from '@/lib/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { DeviceEventEmitter, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [firstbalance, setFirstBalance] = useState(0);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const time = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(time);
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const savedBalance = await AsyncStorage.getItem('balance');
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
    const sub = DeviceEventEmitter.addListener(
      BALANCE_UPDATED_EVENT,
      (value: number) => setFirstBalance(value),
    );
    return () => sub.remove();
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
    alignSelf: 'center',
    backgroundColor: Theme.primary,
    borderRadius: 12,
    padding: 16,
  },
  cardtext: {
    fontSize: 20,
    color: Theme.onPrimary,
    fontStyle: 'italic',
    fontWeight: '600',
  },
});
