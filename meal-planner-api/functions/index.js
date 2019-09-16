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

// post req to firebase to create uid_date
app.post('/addMeal', (request, response) => {
	if (request.method !== 'POST') {
		return response.status(400).json({error: 'Method not allowed.'})
	}
	const mealBody = {
		uid: request.body.uid,
		date: request.body.date,
		title: request.body.title
	}

	const data = {
		recipeId: request.body.recipeId,
		title: request.body.title,
		date: request.body.date,
	}

	const db = admin.firestore().collection('plans').doc(`${mealBody.uid}`).collection('meals')

	db.doc(mealBody.title).set(data)
		.then((datePlan) => {
			return response.json(data)
		})
		.catch(err => {
			console.log(err);
			return response.status(500).json({ error: 'Something went wrong.'});
		});
});

// get list of meals
app.post('/getMeals', (request, response) => {
	if (request.method !== 'POST') {
		return response.status(400).json({error: 'Method not allowed.'})
	}

	const mealBody = {
		uid: request.body.uid
	}

	admin.firestore().collection('plans').doc(`${mealBody.uid}`).collection('meals').get()
		.then(data => {
			let meals = [];
			data.forEach((doc) => {
				meals.push(doc.data());
			});
			return response.json(meals);
		})
		.catch(err => {
			console.log('Error getting users', err);
		});
});


exports.app = functions.https.onRequest(app);
