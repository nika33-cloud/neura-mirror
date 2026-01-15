export const adminCheck = async (req, res, next) => {
    const validUser = req.user;
    try {
        if (validUser.isAdmin === "ADMIN"){
            next()
        } else{
            res.status(400).json({
                success:false,
                message: "unauthorized"
            })
            
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server"
        })
    }
}




