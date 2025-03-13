const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sharedLink: {
      type: String,
      default: () => uuidv4(),
    },
    columns: [
      {
        title: {
          type: String,
          required: true,
        },
        cards: [
          {
            text: {
              type: String,
              required: true,
            },
            author: {
              type: String,
            },
            votes: {
              type: Number,
              default: 0,
            },
            timestamp: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
