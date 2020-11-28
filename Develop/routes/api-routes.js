const db = require("../models");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
      db.Workout.find({})
        //return as json
        .then((workout) => {
          res.json(workout);
        })
        .catch((err) => res.json(err));
    });

    app.post("/api/workouts", (req,res) => {
        db.Workout.create({})
          .then((newWorkout) => {
              res.json(newWorkout);
          })
          .catch((err) => res.json(err));
    });

    app.put("/api/workouts/:id", ({ params, body }, res) => {
        //giving the _id for mongo from the params passed in through the URL
        //mongo command to push an exercise onto the workout
        db.Workout.findByIdAndUpdate({ _id: params.id }, { $push: { exercises: body } }
        )
          //promise to return the updated workout as json
          .then((updatedWorkout) => {
            res.json(updatedWorkout);
          })
          .catch((err) => res.json(err));
      });

      app.get("/api/workouts/range", (req, res) => {
        //find all workouts from mongo to display in workout dashboard
        db.Workout.find({})
          .then((workout) => {
            res.json(workout);
          })
          .catch((err) => res.json(err));
      });

      app.post("/api/workouts/range", (req, res) => {
        db.Workout.create({})
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
      });
};