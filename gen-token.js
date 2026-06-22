// Script de prueba para generar el token JWT con las llaves .pem
require('dotenv').config();
const { signToken } = require('./src/services/jwt.service');

const token = signToken({ id: 'usr_001', name: 'Test User' });
console.log(token);
