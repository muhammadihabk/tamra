import { Router } from 'express';
import UserService from '../user/user.service';
import { DuplicateKeyError } from '../../common/errors';
import { ICreateUser, ILoginInput } from '../user/user.types';
import { isValidPassword } from '../../config/auth/password';
import { issueJWT } from '../../config/auth/issueJWT';

const authController = Router();

authController.post('/sign-up', async (req, res) => {
  try {
    const user: ICreateUser = req.body;
    const createdUser = await UserService.create(user);

    const token = issueJWT(createdUser!._id);

    res
      .status(201)
      .cookie('authToken', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.JWT_EXPIRATION),
      })
      .json({
        id: createdUser!._id,
      });
  } catch (error) {
    if (error instanceof DuplicateKeyError) {
      res.sendStatus(409);
    }
  }
});

authController.post('/sign-in', async (req, res) => {
  const loginInput: ILoginInput = req.body;
  const user = await UserService.authFindOne({ email: loginInput.email });
  if (!user) {
    console.log("[Auth]: Email isn't found.");
    res.sendStatus(404);
    console.log('404');
    return;
  }
  if (!isValidPassword(loginInput.password, user.salt, user.hash)) {
    console.log(`[Auth]: Invalid credentials for user`, user);
    res.sendStatus(401);
    console.log('401');
    return;
  }

  const token = issueJWT(user._id);

  res
    .cookie('authToken', token, {
      httpOnly: false,
      maxAge: Number(process.env.JWT_EXPIRATION),
    })
    .json({
      id: user._id,
    });
});

export default authController;
