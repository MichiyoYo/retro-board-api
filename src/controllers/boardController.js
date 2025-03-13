const Board = require('../models/board');

// Create a new retro board
const createBoard = async (req, res) => {
  try {
    const board = new Board({
      ...req.body,
      owner: req.user._id,
    });
    await board.save();
    res.status(201).send(board);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get all boards for logged in user
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user._id });
    res.send(boards);
  } catch (e) {
    res.status(500).send();
  }
};

// Get a specific board by ID
const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!board) {
      return res.status(404).send({ error: 'Board not found' });
    }

    res.send(board);
  } catch (e) {
    res.status(500).send();
  }
};

// Get a board by shared link
const getBoardBySharedLink = async (req, res) => {
  try {
    const board = await Board.findOne({ sharedLink: req.params.link });

    if (!board) {
      return res.status(404).send({ error: 'Board not found' });
    }

    res.send(board);
  } catch (e) {
    res.status(500).send();
  }
};

// Update board details
const updateBoard = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'columns'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const board = await Board.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!board) {
      return res.status(404).send({ error: 'Board not found' });
    }

    updates.forEach((update) => (board[update] = req.body[update]));
    await board.save();
    res.send(board);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Add a card to a board column
const addCard = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.boardId });

    if (!board) {
      return res.status(404).send({ error: 'Board not found' });
    }

    const column = board.columns.find((col) => col.id === req.params.columnId);

    if (!column) {
      return res.status(404).send({ error: 'Column not found' });
    }

    column.cards.push({
      text: req.body.text,
      author: req.body.author || 'Anonymous',
    });

    await board.save();
    res.status(201).send(column);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Delete a board
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!board) {
      return res.status(404).send({ error: 'Board not found' });
    }

    res.send(board);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  getBoardBySharedLink,
  updateBoard,
  addCard,
  deleteBoard,
};
