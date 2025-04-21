import {isAuthenticated, isAuthorized} from "../middlewares/isAuthenticated.js";
import {
    addBook,
    deleteBook,
    getAllBooks,
} from "../controllers/bookController.js"
import express from "express";

const router=express.Router();
//authentication and authorization is required
router.post("/admin/add",isAuthenticated,isAuthorized("Admin"),addBook);
//only authorization is needed to getAllBooks
router.get("/all",isAuthenticated,getAllBooks);
router.delete("/delete/:id",isAuthenticated,isAuthorized("Admin"),deleteBook);

export default router;

