#!/usr/bin/env node
// Usage: node add_user.js alice alice@example.com password123
// This script appends a user to users.json. For demo only — passwords stored in plain text.

const fs = require('fs');
const path = require('path');

const [,, username, email, password] = process.argv;
if (!username || !email || !password) {
  console.error('Usage: node add_user.js <username> <email> <password>');
  process.exit(1);
}

const file = path.join(__dirname, '..', 'users.json');
const raw = fs.readFileSync(file, 'utf8');
const obj = JSON.parse(raw);

const id = 'local-' + Date.now();
const user = {
  id,
  username,
  email,
  password,
  created: new Date().toISOString()
};

obj.users.push(user);
fs.writeFileSync(file, JSON.stringify(obj, null, 2), 'utf8');
console.log('User added:', id);
