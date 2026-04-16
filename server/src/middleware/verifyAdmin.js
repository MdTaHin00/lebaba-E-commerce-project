
//! user role admin na holay user ar data deva na

const verifyAdmin = (req,res,next)=>{

    //* user body moday (token moday) role = admin na hola error
    if(req.role !== "admin"){
     return res.status(401).send({message:"Unauthorized, Access denied"})
    }

    next()
}

module.exports = verifyAdmin ;