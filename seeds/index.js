const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Connection error:");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 40) + 10;
    const camp = new Campground({
      author: "644c489d2a8088408ebf9c5e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Consectetur voluptatesomnis totam nihil nesciunt ipsa corrupti provident culpa, 
        perferendis explicabo,reiciendis autem blanditiis, vitae dignissimos sit officia quisquam? Accusamus,at.`,
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dhtobqfx0/image/upload/v1682803488/YelpCamp/c8mv7plwziamvxfdtmer.jpg",
          filename: "YelpCamp/c8mv7plwziamvxfdtmer",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
