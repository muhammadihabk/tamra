import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    habits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habit',
        goal: {
          type: Object,
          required: true,
          count: {
            type: Number,
            required: true,
          },
          repeat: {
            type: Object,
            required: true,
          },
          interval: {
            type: String,
            enum: ['day', 'week', 'month'],
            required: true,
          },

          reminder: {
            type: String,
            required: true,
          },
        },
      },
    ],
  },
  {
    collection: 'user',
  },
);

userSchema.path('habits.$goal.repeat').validate(function (repeat) {
  const interval = this.get('habits.$goal.interval');
  switch (interval) {
    case 'day':
      return (
        typeof repeat.every === 'number' &&
        repeat.every > 0 &&
        repeat.every < 100
      );
    case 'week':
      return (
        Array.isArray(repeat.on) &&
        repeat.on.every((day) =>
          ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day),
        )
      );
    case 'month':
      return (
        Array.isArray(repeat.on) &&
        repeat.on.every((item) => {
          if (typeof item === 'number') {
            return item >= 1 && item <= 31; // Valid date
          }
          if (typeof item === 'string') {
            const validPatterns = [
              'First',
              'Second',
              'Third',
              'Fourth',
              'Last',
            ];
            const validDays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
            return (
              item === 'Last day' ||
              (validPatterns.some((pattern) => item.startsWith(pattern)) &&
                validDays.some((day) => item.endsWith(day)))
            );
          }
          return false;
        })
      );
    default:
      return false;
  }
}, 'Invalid repeat format for the given interval.');

export const modelName = 'user';
