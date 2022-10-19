const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
    serverUrl = 'http://localhost:3000' // адрес сервера на локалке
} else {
    serverUrl = 'https://auction-online.onrender.com'; // адрес сервера после выгрузки
}

module.exports = serverUrl;