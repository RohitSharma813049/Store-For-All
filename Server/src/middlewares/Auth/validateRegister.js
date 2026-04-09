const validateRegister = (req, res, next) => {

    const { name, identity, password } = req.body;
    
 
    console.log("validateRegister called with:", { name, identity, password });

    if (!name || !identity || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    next(); 
};

export default validateRegister;