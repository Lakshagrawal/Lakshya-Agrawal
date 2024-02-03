const express = require('express');
const bodyParser = require('body-parser');
const say = require('say');
const app = express();
const port = 3001; // You can choose any available port

app.use(bodyParser.json());

app.post('/speak', (req, res) => {
  const { text } = req.body;
  console.log(text)
  // Perform text-to-speech using the 'say' library
  say.speak(text, (err) => {
    if (err) {
      console.error('Error speaking:', err);
      res.status(500).json({ success: false, error: 'Error speaking' });
    } else {
      console.log(`Speaking: ${text}`);
      res.json({ success: true, message: `Speaking: ${text}` });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
