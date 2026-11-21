import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';

const BALANCE_KEY = 'balance';
export const BALANCE_UPDATED_EVENT = 'balanceUpdated';
export const Ependiture_EVENT = 'addExpenditure';

/** Kayıtlı bakiyeyi döner; yoksa/bozuksa 0. */
export async function getBalance(): Promise<number> {
  const saved = await AsyncStorage.getItem(BALANCE_KEY);
  const value = saved === null ? 0 : parseFloat(saved);
  return Number.isNaN(value) ? 0 : value;
}

/** Bakiyeyi yazar ve dinleyicilere haber verir. */
export async function setBalance(value: number): Promise<void> {
  await AsyncStorage.setItem(BALANCE_KEY, value.toString());
  DeviceEventEmitter.emit(BALANCE_UPDATED_EVENT, value);
}
// ** Harcama ekler
export async function setExpendirute(value: number): Promise<void> {
  await AsyncStorage.setItem(Ependiture_EVENT , value.toString());
  DeviceEventEmitter.emit(Ependiture_EVENT , value);
}

/** Mevcut bakiyeye tutar ekler, yeni bakiyeyi döner. */
export async function addToBalance(amount: number): Promise<number> {
  const next = (await getBalance()) + amount;
  await setBalance(next);
  return next;
}
export async function removalToBalance(amount: number): Promise<number> {
  const next = (await getBalance ()) - amount;
  await setBalance(next);
  await setExpendirute(amount);
  return next;
}

/** Bakiye değiştiğinde (ör. AddModal'dan ekleme) listener'ı çağırır.
 *  Dönen fonksiyon dinlemeyi bırakır (ekran kapanınca çağrılmalı). */
export function onBalanceChange(listener: (value: number) => void): () => void {
  const sub = DeviceEventEmitter.addListener(BALANCE_UPDATED_EVENT, listener);
  return () => sub.remove();
}

