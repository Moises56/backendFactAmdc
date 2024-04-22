export const options = {
  definition: {
    // openapi: '3.0.0',
    info: {
      title: "Factura-AMDC API",
      version: "1.0.0",
      description: "A robust Express Library API",
    },
    // servers: [
    //     {
    //         url: 'http://localhost:3000'
    //     }
    // ]
  },
  apis: ["./src/routes/**/*.js"],
};
