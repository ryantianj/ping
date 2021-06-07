import { Platform } from 'react-native';
// const giftedchatplatform = Platform.OS === 'web' ? 'react-native-gifted-chat' : 'react-native-gifted-chat';

const webgc = await import('react-native-gifted-chat');
import * as webgc from 'react-web-gifted-chat';
import * as mobilegc from 'react-native-gifted-chat';

const exportedGiftedChat = Platform.OS === 'web' ? webgc : mobilegc;
export default exportedGiftedChat;