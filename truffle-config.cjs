module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,      // Ganache GUI default
      network_id: "*", // REQUIRED
    }
  },

  compilers: {
    solc: {
      version: "0.5.16",
      docker: false
    }
  }
};

