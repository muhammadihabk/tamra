import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

function issueJWT(id: string) {
  const payload = {
    sub: id,
  };
  const token = jwt.sign(payload, secret!, {
    expiresIn: '1d',
  });

  return token;
}

export { issueJWT };
