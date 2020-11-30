const db = require("../models");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
      db.Workout.find({})
        // {}안에 아무것도 안적어되도는건 이미 스키마에가 required된게 없어서
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
          //mongoose $push = excercises.push (req.body)
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
};