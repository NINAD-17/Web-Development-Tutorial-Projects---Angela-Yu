// var generateName = require('sillyname');

import generateName from "sillyname";
import superheroes from "superheroes";

// SillyName
var sillyName = generateName();
console.log(`My name is ${sillyName}`);

// Superheroes
console.log(`I am ${superheroes.random()}`)
