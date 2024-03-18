import { Client, Authenticator } from "tdlib-native";
import { TDLibAddon } from "tdlib-native/addon";

async function init() {
  // Loading addon
  const adapter = await TDLibAddon.create();

  // Make TDLib shut up. Immediately
  Client.execute(adapter, "setLogVerbosityLevel", {
    new_verbosity_level: 0
  });

  const client = new Client(adapter);
  const authenticator = Authenticator.create(client)
    .tdlibParameters({
      api_id: Number.parseInt(process.env.TG_API_ID || '0'),
      api_hash: process.env.TG_API_HASH,
      system_language_code: "ru",
      device_model: "Server https://git.i-novus.ru/grp/eco-monitor/smi_analytics",
    //   application_version: `Build for TDLib-${
    //     version._ === "optionValueString" ? version.value : ""
    //   }`,
      database_directory: "../database",
      database_encryption_key: process.env.TG_API_HASH,
    //   files_directory: "../td/files",
      system_version: "0.0.0",
      use_test_dc: false
    })
    //.phone(process.env.TG_API_PHONE)
    // .token(process.env.TELEGRAM_BOT_TOKEN);

  // Start polling responses from TDLib
  client.start();
//   await authenticator.authenticate();
  // client authorized as bot

  // Call any tdlib method
  await client.api.getOption({ name: "version" });
  // => Promise { _: "optionValueString", value: "1.8.22" }

  // or use a wrapper
  await client.tdlibOptions.get("version");
  // => Promise "1.8.22"

  // Subscribe to updates
  client.updates.subscribe(console.log);

  // Pause receiving updates. Will freeze method all running API calls
  // client.pause();
  // Resume pause
  // client.start();

  // Destroy
  await client.api.close({});
  client.destroy();
}