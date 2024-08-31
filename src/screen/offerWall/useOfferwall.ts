import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import IDFA from '../../utils/idfaAbstraction';
import axios from 'axios';
import * as RNLocalize from 'react-native-localize';
const useOfferwall = () => {
  const [data, setData] = useState<OfferResponse[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function run() {
      setLoading(true);
      const endpoint = 'https://api.cashkitty.app';
      //@ts-ignore
      const {languageTag, isRTL} = {
        languageTag: 'en',
        isRTL: false,
      };
      if (
        !(
          (await AsyncStorage.getItem('userId')) &&
          (await AsyncStorage.getItem('secret'))
        )
      ) {
        //
        // Register User
        //
        const tObj: {
          [key: string]: any;
        } = {};

        try {
          tObj.batteryLevel = await DeviceInfo.getBatteryLevel();
          tObj.brand = DeviceInfo.getBrand();
          tObj.buildNumber = DeviceInfo.getBuildNumber();
          tObj.carrier = await DeviceInfo.getCarrier();
          tObj.deviceId = DeviceInfo.getDeviceId();
          tObj.freeDiskStorage = await DeviceInfo.getFreeDiskStorage();
          tObj.manufacturer = await DeviceInfo.getManufacturer();
          tObj.readableVersion = DeviceInfo.getVersion();
          tObj.systemVersion = DeviceInfo.getSystemVersion();
          tObj.totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
          tObj.totalMemory = await DeviceInfo.getTotalMemory();
          tObj.uniqueId = await DeviceInfo.getUniqueId();
          tObj.isEmulator = await DeviceInfo.isEmulator();
          tObj.deviceCountry = RNLocalize.getCountry();
          tObj.locale = RNLocalize.getLocales()[0].languageTag;
          tObj.is24hour = RNLocalize.uses24HourClock();
          tObj.timezone = RNLocalize.getTimeZone();
          tObj.idfa = await IDFA.getIDFA();
          tObj.lang = languageTag.toUpperCase();

          console.log(tObj);
          const response = await axios.post(
            endpoint + '/setup?timestamp=' + Date.now(),
            tObj,
          );

          if (
            response.data &&
            response.data.status === 1 &&
            response.data.userId &&
            response.data.secret
          ) {
            await AsyncStorage.setItem('userId', response.data.userId);
            await AsyncStorage.setItem('secret', response.data.secret);
          } else {
            console.error('Error processing user registration:', response);
          }
        } catch (error) {
          console.error('Error fetching device info:', error);
        }
      }

      if (
        (await AsyncStorage.getItem('userId')) &&
        (await AsyncStorage.getItem('secret'))
      ) {
        var body: {
          [key: string]: any;
        } = {};
        body.userId = await AsyncStorage.getItem('userId');
        body.secret = await AsyncStorage.getItem('secret');
        body.lang = languageTag.toUpperCase();

        //
        // Get Offers (New + In Progress + Completed)
        //
        var availableBody = {...body, idfa: await IDFA.getIDFA()};
        const response = await axios.post(
          endpoint + '/available?timestamp=' + Date.now(),
          availableBody,
        );
        if (response.data && response.data.status === 1) {
          setData(response.data.newOffers as OfferResponse[]);
          console.log('Available Offers:', response.data.newOffers);
        } else {
          console.error('Error fetching available offers:', response);
        }
      }
      setLoading(false);
    }
    run();
  }, []);

  return {data, loading};
};

export default useOfferwall;
