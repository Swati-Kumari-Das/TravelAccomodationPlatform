const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review =require("./review.js")

const listingSchema= new Schema({
      title:{
            type:String,
            required:true,
      },
      description:String,


     

      // image:{
      //       filename: String,
      //       // type:String,
      //       url: {
      //             type: String,
      //             // required: true,
      //             default:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      //             ,
      //              set:(v)=> v === "" ? "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      //              :v,
      //         }
           
      // },
      image:{
        url:String,
        filename:String,
      },
      
      price: Number,
      location: String,
      country:String,
      category: {
            type: String,
            enum: [
                "Trending",
                "Rooms",
                "Mountains",
                "Iconic Cities",
                "Pools",
                "Camping",
                "Farm",
                "Domes",
                "Boats",
                "Beach"
            ],
            required: true,
        },
      reviews:[
            {
              type:Schema.Types.ObjectId,
              ref:"Review" , 
            },
      ],
      owner:{
        type:Schema.Types.ObjectId,
        ref:"User", 
      },
});


listingSchema.post("findOneAndDelete",async(listing)=>{
      if (listing)
      {
            await Review.deleteMany({_id:{$in:listing.reviews}});
   
      }
  });



//model create
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;