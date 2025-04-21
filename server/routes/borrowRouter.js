import express from "express";
import { borrowedBooks,
    getBorrowedBooksForAdmin,
    recordBorrowedBook,
    returnBorrowedBooks } from "../controllers/borrowController.js";
import { isAuthenticated ,isAuthorized} from "../middlewares/isAuthenticated.js";

    const router=express.Router();

    router.post("/record-borrow-book/:id",
        isAuthenticated,
        isAuthorized("Admin"),
        recordBorrowedBook
    );
    //ADMIN ONLY
    router.get("/borrowed-books-by-users",
        isAuthenticated,
        isAuthorized("Admin"),
        getBorrowedBooksForAdmin
    );

    router.get("/my-borrowed-books",
            isAuthenticated,
           borrowedBooks);

    router.put("/return-borrowed-book/:bookId",
        isAuthenticated,
        isAuthorized("Admin"),
        returnBorrowedBooks
    );  
    
    export default router;
    


        