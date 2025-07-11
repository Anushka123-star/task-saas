const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const sequelize = require('./config/db');
const auth = require('./middleware/auth');
require('dotenv').config();

const app = express();
app.use(express.json());

// DB sync
sequelize.sync().then(() => console.log('DB connected'));

// Register
app.post('/register', async (req, res) => {
const { username, password } = req.body;
const hash = await bcrypt.hash(password, 10);
try {
const user = await User.create({ username, password: hash });
res.status(201).json({ message: 'User created', user: { id: user.id, username: user.username } });
} catch (err) {
res.status(400).json({ error: 'User already exists' });
}
});

// Login
app.post('/login', async (req, res) => {
const { username, password } = req.body;
const user = await User.findOne({ where: { username } });

if (!user || !(await bcrypt.compare(password, user.password))) {
return res.status(401).json({ error: 'Invalid credentials' });
}

const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
res.json({ token });
});

// Protected route
app.get('/me', auth, async (req, res) => {
res.json({ user: req.user });
});

app.listen(process.env.PORT, () => {
console.log(`Auth service running on port ${process.env.PORT}`);
});

sequelize.authenticate().then(() => {
    console.log('✅ PostgreSQL connection successful');
}).catch(err => {
    console.error('❌ Unable to connect to DB:', err);
});
