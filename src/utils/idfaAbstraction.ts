import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';

export async function getIDFA(): Promise<string | null> {
  try {
    const advertisingInfo: AdvertisingInfoResponse =
      await ReactNativeIdfaAaid.getAdvertisingInfo();
    return advertisingInfo.isAdTrackingLimited ? ' ' : advertisingInfo.id;
  } catch (error) {
    console.error('Error fetching IDFA:', error);
    return '';
  }
}

export default {
  getIDFA,
};
