require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const specs = require('./swagger');
const swaggerUi = require('swagger-ui-express');
mongoose.connect('mongodb+srv://tapanpatel:tapanpatel@mongocluster.2v9b1cl.mongodb.net/csci5709project', { useNewUrlParser: true });
const cors = require('cors');

// mongoose.connect(process.env.DBURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
app.use(cors()); // Enable CORS

const wishlistRoutes = require('./routes/wishlist');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

app.use('/wishlist', wishlistRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port =  3001;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Swagger documentation available at http://{hostname}:${port}/api-docs/`);
});
