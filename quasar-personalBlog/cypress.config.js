const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9000', // Ajusta la URL base según tu configuración
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
