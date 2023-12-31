import Contribution from "../../../main/models/contribution.model.js";
import { fn, col } from "sequelize";

async function createContribution(data) {
  try {
    return await Contribution.create(data);
  } catch (err) {
    throw err;
  }
}

async function createContributions(json) {
  try {
    return await Contribution.bulkCreate(json);
  } catch (err) {
    throw err;
  }
}

async function getContributions() {
  try {
    return await Contribution.findAll();
  } catch (err) {
    throw err;
  }
}

async function getContribution(id) {
  try {
    return await Contribution.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function getContributionsByIdClient(id) {
  try {
    return await Contribution.findOne({
      where: {
        idCliente: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getContributionByIdPlan(id) {
  try {
    return await Contribution.findOne({
      where: {
        idPlano: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getBalance(id) {
  try {
    return await Contribution.findAll({
      where: {
        idPlano: id,
      },
      attributes: [[fn("sum", col("valorAporte")), "total"]],
      raw: true,
    });
  } catch (err) {
    throw err;
  }
}

async function deleteContribution(id) {
  try {
    await Contribution.update(
      {
        rollback: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return `Contribution ${id} was deactivated`;
  } catch (err) {
    throw err;
  }
}

export default {
  createContribution,
  createContributions,
  getContributions,
  deleteContribution,
  getContribution,
  getContributionByIdPlan,
  getContributionsByIdClient,
  getBalance,
};
