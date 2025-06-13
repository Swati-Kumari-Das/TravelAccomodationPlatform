const express =require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing =require("../models/listing.js");
const{isLoggedIn,isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listing.js")
const ExpressError = require("../utils/ExpressError.js");
const multer=require('multer');

const{storage}=require("../cloudConfig.js");
const upload=multer({storage})

router
.route("/")
.get( wrapAsync(listingController.index))
.post(
    isLoggedIn
    ,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);


//new route 
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(
    wrapAsync(listingController.showListing))
.put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing))
.delete(
            isLoggedIn,
            isOwner,wrapAsync(listingController.deleteListing));


//edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editForm));

// //update Route 
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing));
// // app.put("/listings/:id", async (req, res) => {
// //     let { id } = req.params;
// //     let updatedData = req.body.listing;

// //     // Fetch the existing listing from DB
// //     let existingListing = await Listing.findById(id);

// //     // If the user didn't provide a new image, retain the old one
// //     if (!updatedData.image || updatedData.image.trim() === "") {
// //         updatedData.image = existingListing.image;
// //     }

// //     await Listing.findByIdAndUpdate(id, { ...updatedData });
// //     res.redirect(`/listings/${id}`);
// // });


//DELETE ROUTE 

// router.delete("/:id",
//     isLoggedIn,
//     isOwner,wrapAsync(listingController.deleteListing));

module.exports=router;