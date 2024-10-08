const express = require('express'); // Imports the express
const app = new express(); // creates and instance of express application that will use to define servers behaviour
// `app` object represents web application and provides methids for defining routes, configuring middleware , handling re and res

const userRoutes = require('./routes/users-routes');
const eventsRoutes = require('./routes/events-routes');

app.use(express.json()); // This middleware parses incoming JSON requests and puts the parsed data into req.body
app.use(express.urlencoded({ extended: true })); // express.urlencoded() is another built-in middleware function in Express that is used to parse incoming requests with URL-encoded payloads.
// extened: true --> to parse the nested objects


// Registration of routes
app.use(`/api/v1/`, userRoutes);
app.use(`/api/v1/`, eventsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
