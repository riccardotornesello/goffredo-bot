import { Client, Events, GatewayIntentBits } from 'discord.js';
import { BOT_TOKEN } from './data/config';
import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
  VoiceConnection,
  PlayerSubscription,
  AudioPlayer,
} from '@discordjs/voice';

function stopPlaying(
  subscription: PlayerSubscription,
  connection: VoiceConnection,
  audioPlayer: AudioPlayer
) {
  try {
    audioPlayer.stop();
  } catch (e) {}
  try {
    subscription.unsubscribe();
  } catch (e) {}
  try {
    connection.destroy();
  } catch (e) {}
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  // Exclude bot
  if (newState.member?.user.bot) return;

  // Exclude if not joining a channel
  if (oldState.channelId !== null) return;

  // Join the voice channel
  const connection = joinVoiceChannel({
    channelId: newState.channel.id,
    guildId: newState.channel.guild.id,
    adapterCreator: newState.channel.guild.voiceAdapterCreator,
  });

  // Prepare the audio player
  const audioPlayer = createAudioPlayer();
  const resource = createAudioResource('paperissima-sprint.mp3');
  audioPlayer.play(resource);

  // Start playing
  const subscription = connection.subscribe(audioPlayer);

  // Stop playing when the audio is finished
  audioPlayer.on(AudioPlayerStatus.Idle, () => {
    stopPlaying(subscription, connection, audioPlayer);
  });

  // Stop playing after 15 seconds (just in case)
  // setTimeout(() => {
  //   stopPlaying(subscription, connection, audioPlayer);
  // }, 15_000);
});

client.login(BOT_TOKEN);
