module.exports = {

    loginErr: (req, res, next) => {
        try {
            if (!req.body.password) {
                return res.status(400).json('Veuillez renseigner un mot de passe !');
            }
            if (!req.body.email) {
                return res.status(400).json(`Veuillez renseigner un nom d'utilisateur !`);
            }
            next();
        } catch(error) {
            console.log(error);
            throw error.name;
        };
    },

    jwtErr: (req, res, next) => {
        try {
            if (!req.params.token) {
                return res.status(401).json('Token Invalide !');
            }
            next();
        } catch (error) {
            console.log(error);
            throw error.name;
        };
    }
};