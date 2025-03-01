import mongoose from 'mongoose';

export const users = [
  {
    name: 'user_1',
    email: 'user_1@mail.com',
    password: 'password_1',
    picture: '',
    habits: [
      {
        _id: new mongoose.Types.ObjectId(),
        habit: {
          name: 'Quran',
          is_shared: true,
        },
        goal: {
          count: 1,
          repeat: {
            every: 1,
          },
          interval: 'day',
          reminder: new Date(),
        },
      },
      {
        _id: new mongoose.Types.ObjectId(),
        habit: {
          name: 'habit_2',
          is_yes_no: true,
        },
        goal: {
          count: 40,
          repeat: {
            every: 1,
            on: ['Mon', 'Thu'],
          },
          interval: 'week',
          reminder: new Date(),
        },
      },
    ],
  },
  {
    name: 'user_2',
    email: 'user_2@mail.com',
    password: 'password_2',
    picture: '',
    habits: [
      {
        _id: new mongoose.Types.ObjectId(),
        habit: {
          name: 'habit_2',
        },
        goal: {
          count: 3,
          repeat: {
            every: 1,
            on: ['Last Fri'],
          },
          interval: 'month',
          reminder: new Date(),
        },
      },
    ],
  },
];

export const habitsLogs = [
  {
    count: 640,
    date: new Date('2025-01-01'),
    habit_id: users[0].habits[0]._id,
  },
  {
    count: 640,
    date: new Date('2025-01-02'),
    habit_id: users[0].habits[0]._id,
  },
  {
    count: 320,
    date: new Date('2025-01-03'),
    habit_id: users[0].habits[0]._id,
  },
  {
    count: 40,
    date: new Date('2025-01-06'),
    habit_id: users[0].habits[1]._id,
  },
  {
    count: 1,
    date: new Date('2025-01-06'),
    habit_id: users[1].habits[0]._id,
  },
];
