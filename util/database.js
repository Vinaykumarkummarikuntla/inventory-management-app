const fs = require("fs");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("details", "vinay", "admin@9618", {
  dialect: "mysql",
  host: "ecommerce-mysql-database.mysql.database.azure.com",
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(
        "/media/vinay/CC4A7C094A7BEE98/inventory management app/certificate/DigiCertGlobalRootCA.crt.pem"
      ), // Path to the CA certificate
    },
  },
});

module.exports = sequelize;
