const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Статичні файли Angular додатку
app.use(express.static(path.join(__dirname, 'my-angular-project')));

// Всі інші запити пересилають на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/my-angular-app/src/index.html'));
});

// Слухаємо порт
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});