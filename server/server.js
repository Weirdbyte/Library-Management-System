import {app} from './app.js';

console.log(`PORT: ${process.env.PORT}`); // Debugging line

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

