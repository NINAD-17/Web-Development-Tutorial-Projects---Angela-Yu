const mongoose = require('mongoose');

// Connect MongoDB
mongoose.set('strictQuery', true);
const db = mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', {
  useNewUrlParser: true
});

// Creating Schema (Blueprint)
const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Please check your data entry, No name specified!']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitsSchema
});

// Using schema to create mongoose model
const Fruit = mongoose.model('Fruit', fruitsSchema) // 'Fruit' is a collection name
const Person = mongoose.model('Person', personSchema);

// Creating document from model
// const fruit = new Fruit({
//   // name: 'Apple',
//   rating: 2,
//   review: 'Pretty girl you like peaches'
// });

// fruit.save();
//

const pineapple = new Fruit({
  name: 'PineApple',
  rating: 8,
  review: 'Eat in summer only pineapple'
})

// pineapple.save();

const chicku = new Fruit({
  name: 'Chicku',
  rating: 6,
  review: 'As sweet as sugar'
})

chicku.save();

const person = new Person({
  name: 'Ninad',
  age: 19
})
// person.save();
//

const person2 = new Person({
  name: 'Amy',
  age: 12,
  favoriteFruit: pineapple
})

// person2.save();

// const mangu = new Fruit({
//   name: 'Mango',
//   rating: 10,
//   review: 'This is world\'s best Fruit'
// })
//
// const orange = new Fruit({
//   name: 'Orange',
//   rating: 7,
//   review: 'Bit sour'
// })
//
// const banana = new Fruit({
//   name: 'Banana',
//   rating: 9,
//   review: 'It\'s Best'
// })

// Fruit.insertMany([mangu, orange, banana], function(err) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log('Successfully saved all fruits in fruits DB');
//   }
// });

// Fruit.find(function(err, fruitsData) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close(function() {
//       console.log('Mongoose default connection disconnected through app termination');
//       process.exit(0);
//     });
//     fruitsData.forEach(function(fruit) {
//       console.log(fruit.name);
//     });
//   }
// });
//
// Fruit.updateOne({_id: '63ce9447002b55dfc4e5f6a7'}, {name: 'Peach'}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('Successfully Updated the document :)');
//   }
// });

Person.updateOne({name: 'Ninad'}, {favoriteFruit: chicku}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('Successfully updated');
  }
})
//
// Fruit.deleteOne({_id: '63ce9447002b55dfc4e5f6a7'}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('Successfully deleted one document :)');
//   }
// })

// Person.deleteMany({name: 'Ninad'}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('Deleted all Successfully');
//   }
// })
