const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const port = 3001;
const app = express();
const cors = require('cors');

admin.initializeApp();

app.use(cors());

// get user by id
app.post('/getUser', (request, response) => {
	if (request.method !== 'POST') {
		return response.status(400).json({error: 'Method not allowed.'})
	}

	admin.firestore().collection('users').doc(request.body.uid).get()
		.then(data => {
			return response.json(data.data());
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
    uid: request.body.uid,
		imgURL: 'https://recipe-image-bucket.s3.amazonaws.com/default-profile.png'
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

	const date = new Date();
	const formatDate = date.toUTCString()

	const data = {
		recipeId: request.body.recipeId,
		title: request.body.title,
		date: request.body.date,
		mealName: request.body.mealName,
		docId: formatDate
	}

	const db = admin.firestore().collection('plans').doc(`${mealBody.uid}`).collection('meals');

	db.doc(formatDate).set(data)
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

app.delete('/deleteMeal', (request, response) => {
	if (request.method !== 'DELETE') {
		return response.status(400).json({error: 'Method not allowed.'})
	}

	const reqBody = {
		uid: request.body.uid,
		docId: request.body.docId
	}

	admin.firestore().collection('plans').doc(reqBody.uid).collection('meals').doc(reqBody.docId).delete()
		.then(removed => {
			console.log(removed);
			return response.status(200).json({success: 'meal deleted'})
		})
		.catch(err => {
			console.log('Error getting users', err);
		});
});

exports.app = functions.https.onRequest(app);
