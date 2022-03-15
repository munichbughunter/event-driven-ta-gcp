const app = require('./app');
const PORT = parseInt(parseInt(process.env.PORT)) || 8080;

app.listen(PORT, () => 
    console.log(`Server listening on port ${PORT}`)
);
