const nodemailer=require("nodemailer")

const conf=nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:587,
  // secure:true,
  auth:{
    user:"modelartsystem02@gmail.com",
    pass:"pvzs gpgl thnc rmad"
  }
})

conf.verify().then(()=>{
  console.log("Ready for send any email");
})

module.exports=conf