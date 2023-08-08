import { AppDataSource } from '../data-source';
import { Sound } from '../entity';

export async function getUserSounds(userId: string) {
  await AppDataSource.initialize();

  const res = await AppDataSource.getRepository(Sound).find({
    where: { userId },
  });
  return res.map((sound) => ({
    id: sound.id,
    name: sound.name,
    status: sound.status,
  }));
}

export async function addSound({ userId, name }): Promise<string> {
  await AppDataSource.initialize();

  const sound = new Sound();
  sound.userId = userId;
  sound.name = name;
  sound.status = 'pending';

  const res = await AppDataSource.getRepository(Sound).save(sound);
  return res.id;
}
