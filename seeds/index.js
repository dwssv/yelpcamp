const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6168fffecbf1e20cca02f71e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad esse quibusdam consectetur est aspernatur ipsam nesciunt praesentium obcaecati vero asperiores nihil sequi veritatis nisi voluptates dignissimos, corrupti quaerat eligendi beatae.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/de3tvsweh/image/upload/v1635134996/YelpCamp/ccyyw8vbf2nna9rog5sv.jpg',
                    filename: 'YelpCamp/ccyyw8vbf2nna9rog5sv'
                },
                {
                    url: 'https://res.cloudinary.com/de3tvsweh/image/upload/v1635135000/YelpCamp/fxzgdep0ihwyxzwrhzxx.jpg',
                    filename: 'YelpCamp/fxzgdep0ihwyxzwrhzxx'
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})