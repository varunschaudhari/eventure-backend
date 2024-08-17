module.exports  = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'my_secret_token',
    JWT_PL_SECRET: process.env.JWT_PL_SECRET || 'my awe = some s3cret',
    JWT_SALT: process.env.JWT_SALT || 10
};
