const path = require('path');
const MTProto = require('@mtproto/core');
const { sleep } = require('@mtproto/core/src/utils/common');
const { _ } = require('lodash');
const tempStorage = require('@mtproto/core/src/storage/temp');

const api_id = process.env.TG_API_ID;
const api_hash = process.env.TG_API_HASH;

tempStorage.path = path.resolve(__dirname, './storage.json');
class CustomStorage {
  //set(key: string, value: string): Promise<void>;
  //get(key: string): Promise<string|null>;
}

class TelegramApi {

  mtproto: any

  constructor() {
    this.mtproto = new MTProto({
      //test: true,
      api_id,
      api_hash,
      storageOptions: {
        //tempStorage
        path: path.resolve(__dirname, './storage.json')
      }
    });
  }

  async call(method: string, params: any, options = {}): Promise<void> {
    try {
      const result = await this.mtproto.call(method, params, options);

      return result;
    } catch (error: any) {
      console.log(`${method} error:`, error);

      const { error_code, error_message } = error;

      if (error_code === 420) {
        const seconds = Number(error_message.split('FLOOD_WAIT_')[1]);
        const ms = seconds * 1000;

        await sleep(ms);

        return this.call(method, params, options);
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_');

        const dcId = Number(dcIdAsString);

        // If auth.sendCode call on incorrect DC need change default DC, because
        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId);
        } else {
          Object.assign(options, { dcId });
        }

        return this.call(method, params, options);
      }

      return Promise.reject(error);
    }
  }
}

const mtproto = new TelegramApi();

async function tgGetUser() {
  try {
    const user = await mtproto.call('users.getFullUser', {
      id: {
        _: 'inputUserSelf',
      },
    });
    return user
  } catch(error) {
    console.log('TG-GET-USER-ERROR->', error)
    return null
  }
}

function tgSendCode(phone: string) {
  return mtproto.call('auth.sendCode', {
    phone_number: phone,
    settings: {
      _: 'codeSettings',
    },
  });
}

function tgSignIn(code: string, phone: string, phone_code_hash: string) {
  return mtproto.call('auth.signIn', {
    phone_code: code,
    phone_number: phone,
    phone_code_hash: phone_code_hash,
  });
}

function tgSignUp(phone: string, phone_code_hash: string) {
  return mtproto.call('auth.signUp', {
    phone_number: phone,
    phone_code_hash: phone_code_hash,
    first_name: 'MTProto',
    last_name: 'Core',
  });
}

function tgGetPassword() {
  return mtproto.call('account.getPassword', {});
}

function tgCheckPassword(srp_id: any, A: any, M1: any) {
  return mtproto.call('auth.checkPassword', {
    password: {
      _: 'inputCheckPasswordSRP',
      srp_id,
      A,
      M1,
    },
  });
}

(async () => {
  const user = await tgGetUser();

  const phone = process.env.TG_API_PHONE || '89276732588';
  const code = '72889';
  if (!user) {
    const responeCodeRequest = await tgSendCode(phone);

    const phone_code_hash = _.get(responeCodeRequest, 'phone_code_hash');

    try {
      const signInResult = await tgSignIn(
        code,
        phone,
        phone_code_hash,
      );
      if (_.get(signInResult, '_') === 'auth.authorizationSignUpRequired') {
        await tgSignUp(
          phone,
          phone_code_hash,
        );
      }
    } catch (error: any) {
      if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
        console.log(`TG-SIGN-IN-ERROR->`, error);

        return;
      }

      const password = process.env.TG_API_PASS;

      const responseGetPass = await tgGetPassword();

      const { srp_id, current_algo, srp_B } = _.get(responseGetPass);
      const { g, p, salt1, salt2 } = current_algo;

      const { A, M1 } = await mtproto.mtproto.crypto.getSRPParams({
        g,
        p,
        salt1,
        salt2,
        gB: srp_B,
        password,
      });

      const checkPasswordResult = await tgCheckPassword( srp_id, A, M1 );
    }
  }
})();

try {
  //console.log('MTPROTO-1->', mtproto.mtproto);
  mtproto.mtproto.updates.on('updatesTooLong', (updateInfo: any) => {
    //console.log('TG-updatesTooLong:', updateInfo);
  });
  
  mtproto.mtproto.updates.on('updateShortMessage', (updateInfo: any) => {
    //console.log('TG-updateShortMessage:', updateInfo);
  });
  
  mtproto.mtproto.updates.on('updateShortChatMessage', (updateInfo: any) => {
    //console.log('TG-updateShortChatMessage:', updateInfo);
  });
  
  mtproto.mtproto.updates.on('updateShort', (updateInfo: any) => {
    //console.log('TG-updateShort:', updateInfo);
  });
  
  mtproto.mtproto.updates.on('updatesCombined', (updateInfo: any) => {
    //console.log('TG-updatesCombined:', updateInfo);
  });
  
  mtproto.mtproto.updates.on('updates', (updateInfo: any) => {
    //console.log('TG-updates:', updateInfo);
  });
  
  mtproto.mtproto.updates.on('updateShortSentMessage', (updateInfo: any) => {
    //console.log('TG-updateShortSentMessage:', updateInfo);
  });
} catch(err) {
  console.log('MTPROTO-ERR->', err);
}


module.exports = {
  mtproto
}