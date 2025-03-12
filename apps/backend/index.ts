import express from "express";
const app = express();
import { prismaClient } from "@repo/db/client";

app.use(express.json());

app.get("/users", (req, res) => {
  prismaClient.user
    .findMany()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.post("/user", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "username and password is required" });
  }

  const newUser = prismaClient.user
    .create({
      data: {
        username,
        password,
      },
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.listen(8080);
