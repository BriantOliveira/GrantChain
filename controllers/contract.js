/*
*  GrantChain - Contract Instance  
*/
const contractService = require('../queries/contract');
const { clientResponse } = require('../utils/clientResponse');
const logger = require('../utils/logger');


/** Create a new Contract */
const newContract = async (req, res) => {
  try {
    // TODO: Need to add some validation here for the body
    const { body } = req;

    const contract = await contractService.createNewContract(body);

    return clientResponse(res, 200, {
      message: 'Contract created successfully',
      data: { contract },
    });
  } catch (error) {
    logger.error(`An unexpected error has occurred: ${error}`);
    return clientResponse(res, 500, error);
  }
};

/** Retrieve the contracts in the database */
const getContracts = async (_, res) => {
  try {
    const contracts = await contractService.getContractInstance();

    if (!contracts || contracts.length === 0) {
      logger.warn('No contracts found in the database');
      // TODO: Should this actually be a 404?
      clientResponse(res, 404, { message: 'No contracts found' });
    }

    return clientResponse(res, 200, {
      message: 'Returning all contracts',
      data: { contracts },
    });
  } catch (error) {
    logger.error(`An unexpected error has occured: ${error}`);
    return clientResponse(res, 500);
  }
};

/** GET Contracts details by Id */
const getContractByID = async (req, res) => {
  try {
    const { id } = req.params;

    const contracts = await contractService.getContractInstanceByID(id);

    if (!contracts) {
      logger.error(`Contracts with ID ${id} not found`);
      return clientResponse(res, 404, {
        message: 'Could not find requested contracts',
      });
    }

    return clientResponse(res, 200, {
      message: 'Returning found contract',
      data: { contracts },
    });
  } catch (error) {
    logger.error(`An unexpected error has occured: ${error}`);
    return clientResponse(res, 500);
  }
};

/** Get all contract by collaborator id */
const getContractByUserID = async (req, res) => {
  try {
    const { collaboratorsId } = req.params;

    const contract = await contractService.getContractInstanceByUserID(collaboratorsId);

    if (!contract || contract.length === 0) {
      logger.error(`Contract Instance with collaboratorsId ${collaboratorsId} not found`);
      return clientResponse(res, 404, {
        message: 'Could not find any contract',
      });
    }

    return clientResponse(res, 200, {
      message: 'All user contract found',
      data: { contract },
    });
  } catch (error) {
    logger.error(`An unexpected error has occured: ${error}`);
    return clientResponse(res, 500);
  }
};

/** Get all contract by organization id */
const getContractByOrganizationID = async (req, res) => {
  try {
    const { organizationId } = req.params;

    const contract = await contractService.getContractInstanceByOrganizationID(organizationId);

    if (!contract || contract.length === 0) {
      logger.error(`Contract Instance with organizationId ${organizationId} not found`);
      return clientResponse(res, 404, {
        message: 'Could not find any contract',
      });
    }

    return clientResponse(res, 200, {
      message: 'All Organization contract found',
      data: { contract },
    });
  } catch (error) {
    logger.error(`An unexpected error has occured: ${error}`);
    return clientResponse(res, 500);
  }
};

const deleteContractInstance = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await contractService.deleteContractInstance(id);

    if (!result) {
      logger.error(`Contract with ID ${id} not found and not deleted`);
      clientResponse(res, 404, { message: 'Could not find requested contract' });
    }

    // FIXME: Should probably return the ID of the reciept that was deleted instead of the result, which is an instead
    return clientResponse(res, 204, {
      message: 'Contract was successfully deleted',
      data: { result },
    });
  } catch (error) {
    logger.error(`An unexpected error has occured: ${error}`);
    return clientResponse(res, 500);
  }
};

module.exports = {
  newContract,
  getContracts,
  getContractByID,
  getContractByUserID,
  getContractByOrganizationID,
  deleteContractInstance
};
