const FleetManagement = artifacts.require("FleetManagement");

module.exports = function (deployer) {
  deployer.deploy(FleetManagement);
};

