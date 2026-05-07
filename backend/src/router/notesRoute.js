import express, { json } from "express";
import {
  createNote,
  deleteNote,
  getNote,
  updateNote,
  getOneNote
} from "../controller/noteController.js";

const route = express.Router();

route.get("/",getNote)
route.get("/:id",getOneNote)
route.post("/", createNote);
route.put("/:id", updateNote);
route.delete("/:id", deleteNote);

export default route;
