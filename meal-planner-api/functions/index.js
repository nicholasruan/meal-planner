const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const port = 3001;
const app = express();
const cors = require('cors');

admin.initializeApp();

app.use(cors());

// get all users
app.get('/users', (request, response) => {
	if (request.method !== 'GET') {
		return response.status(400).json({error: 'Method not allowed.'})
	}

	admin.firestore().collection('users').get()
		.then(data => {
			let users = [];
			data.forEach((doc) => {
				users.push(doc.data());
			});
			return response.json(users);
		})
		.catch(err => {
			console.log('Error getting users', err);
		});
});

app.delete('/deleteUser', (request, response) => {
	if (request.method !== 'DELETE') {
		return response.status(400).json({error: 'Method not allowed.'})
	}

	admin.firestore().collection('users').doc(request.body.uid).delete()
	    .then(() => {
	      return response.json({ message: 'User deleted successfully'});
	    })
	    .catch(err => {
	      response.status(500).json({ error: 'Something went wrong.'});
	      console.log(err);
			});
});

// add a user
app.post('/addUser', (request, response) => {
  if (request.method !== 'POST') {
    return response.status(400).json({error: 'Method not allowed.'})
  }
  const newUser = {
    name: request.body.name,
    email: request.body.email,
    uid: request.body.uid
  }
  admin.firestore().collection('users').doc(newUser.uid).set(newUser)
    .then((user) => {
      return response.json({ message: `user created successfully`})
    })
    .catch(err => {
			console.log(err);
      return response.status(500).json({ error: 'Something went wrong.'});
    });
});

exports.app = functions.https.onRequest(app);
