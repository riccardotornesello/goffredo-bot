import { db } from './connection';

export const addSound = ({ userId, name }) =>
  new Promise((res, rej) => {
    db.run(
      'INSERT INTO sound (user_id, name) VALUES (?,?);',
      [userId, name],
      function (error) {
        if (error !== null) {
          rej(error);
        } else {
          res(this.lastID);
        }
      }
    );
  });

export const getRandomSound = (userId) =>
  new Promise((res, rej) => {
    db.get(
      'SELECT id FROM sound WHERE user_id = ? ORDER BY RANDOM() LIMIT 1;',
      [userId],
      (err, row: any) => {
        if (err) {
          rej(err);
        } else {
          res(row.id);
        }
      }
    );
  });
