const { Wallet } = require('../../../model');
const logger = require('../../../logger');
const { createErrorResponse, createSuccessResponse } = require('../../../response');

// Add a card to the users wallet
module.exports = async (req, res) => {
    try {
        // make sure the user is authenticated and we can find their ID
        const userId = res?.locals?.jwtData?.id
        if (!userId) throw new Error('Invalid user ID')

        const { card } = req.body

        // verify that there is an existing wallet for the user, if not create a new one
        const wallet = await Wallet.getWallet(userId) || new Wallet(userId);
        if (!wallet) throw new Error('Could not fetch wallet')
        wallet.addCard(card)

        res.status(201).json(createSuccessResponse({ wallet: wallet.preview() }));
    } catch (error) {
        logger.error({ error: error.message }, 'Error getting wallet')
        res.status(400).json(createErrorResponse(400, 'Error getting wallet'))
    }
}