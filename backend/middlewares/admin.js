
const admin = (req,res,next) => {
    if(req.user.role === 'Admin'){
        next()
    }
    res.status(401).json({success:false, text: "ur not an adming my dear"})
}


module.exports = admin