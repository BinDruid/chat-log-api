import fetch from "node-fetch";
const channelName = "quin69";

const checkOnline = async () => {
  let a = await fetch(`https://www.twitch.tv/${channelName}`);
  if ((await a.text()).includes("isLiveBroadcast"))
    console.log(`${channelName} is live`);
  else console.log(`${channelName} is not live`);
};

checkOnline();
