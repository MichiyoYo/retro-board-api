const express = require('express');
const boardController = require('../controllers/boardController');
const auth = require('../middleware/auth');

const router = new express.Router();

// Create a new board
router.post('/', auth, boardController.createBoard);

// Get all boards
router.get('/', auth, boardController.getBoards);

// Get a specific board
router.get('/:id', auth, boardController.getBoard);

// Get a board by shared link
router.get('/shared-board/:link', boardController.getBoardBySharedLink);

// Update a board
router.patch('/:id', auth, boardController.updateBoard);

// Add a card to a column
router.post('/:boardId/columns/:columnId/cards', boardController.addCard);

// Delete a board
router.delete('/:id', auth, boardController.deleteBoard);

module.exports = router;
