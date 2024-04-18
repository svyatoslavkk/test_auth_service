import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const SECRET_KEY = config.SECRET_KEY;

app.use(bodyParser.json());

const users: { [key: string]: string } = {};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

app.post('/register', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (users[username]) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users[username] = hashedPassword;

    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = users[username];
    if (!hashedPassword || !bcrypt.compareSync(password, hashedPassword)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
