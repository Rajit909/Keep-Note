import express from "express";

import { Home } from "../controller/note.controller.js";

const Router = express();

Router.get("/", Home)


export default Router