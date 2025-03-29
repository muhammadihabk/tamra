import mongoose from 'mongoose';
import * as argon from 'argon2';

export const data = async () => {
  let users = [
    {
      name: 'user_1',
      email: 'user_1@mail.com',
      password: 'password_1',
      picture: '<url>',
      habits: [
        {
          _id: new mongoose.Types.ObjectId(),
          name: 'Quran',
          goal: {
            count: 1,
            repeat: {
              every: 1,
              interval: 'day',
            },
            reminder: '03:00 PM',
          },
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: 'habit_2',
          is_yes_no: true,
          goal: {
            count: 40,
            repeat: {
              on: ['Mon', 'Thu'],
              every: 2,
              interval: 'week',
            },
            reminder: '03:00 PM',
          },
        },
      ],
    },
    {
      name: 'user_2',
      email: 'user_2@mail.com',
      password: 'password_2',
      picture: '<url>',
      habits: [
        {
          _id: new mongoose.Types.ObjectId(),
          name: 'habit_2',
          goal: {
            count: 3,
            repeat: {
              on: ['Last Fri'],
              every: 1,
              interval: 'month',
            },
            reminder: '03:00 PM',
          },
        },
      ],
    },
  ];
  users = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await argon.hash(user.password);
      return { ...user, password: hashedPassword };
    }),
  );

  const habitsLogs = [
    {
      count: 640,
      date: new Date('2025-01-01'),
      habitId: users[0].habits[0]._id,
    },
    {
      count: 640,
      date: new Date('2025-01-02'),
      habitId: users[0].habits[0]._id,
    },
    {
      count: 320,
      date: new Date('2025-01-03'),
      habitId: users[0].habits[0]._id,
    },
    {
      count: 40,
      date: new Date('2025-01-06'),
      habitId: users[0].habits[1]._id,
    },
    {
      count: 1,
      date: new Date('2025-01-06'),
      habitId: users[1].habits[0]._id,
    },
  ];

  return {
    users,
    habitsLogs,
  };
};
