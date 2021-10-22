exports.read = (req, res) => {
    req.profile.hashedPassword = undefined;
    req.profile.salt = undefined;
    console.log(req.profile)
    return res.json(req.profile);
};