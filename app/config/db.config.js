module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "admin123",
    DB: "staffsavvy",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};