const adminAuth = (req, res, next) => {
    console.log("Admin auth check");
    
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized admin");
    } else {
        next()
    }
};

const userAuth = (req, res, next) => {
    console.log("User auth check");
    
    const token = "xyzdsfd";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized user");
    } else {
        next()
    }
};


module.exports = {
    adminAuth,
    userAuth
};