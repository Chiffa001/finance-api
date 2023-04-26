import { verify } from 'jsonwebtoken';

export const checkToken = async (token: string, secret: string) => {
  return await new Promise((resolve, reject) => {
    verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }

      resolve(decoded);
    });
  });
};
