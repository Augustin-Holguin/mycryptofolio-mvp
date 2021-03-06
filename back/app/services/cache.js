const jwt = require('../services/jwt');
const {createClient} = require('redis');
const db = createClient();
db.connect();

const prefix = 'mycryptofolio:';

let timeout = 60;

const keys = [];

let newKey;

const cache = async (req, res, next) => {
    if (req.url === '/cryptos') {
        timeout = 60 * 5;
    };

    newKey = `${prefix}${req.url}`

    if (req.userId) {
        newKey = `${prefix}${req.userId.id}:${req.url}`
    }

    const key = newKey;

    if (await db.exists(key)) {
        const cachedString = await db.get(key);
        const cachedValue = JSON.parse(cachedString);
        if (req.userId) {
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(req.userId));
        }
        return res.json(cachedValue);
    };

    const originalResponseJson = res.json.bind(res);

    res.json = async (data, err) => {
        const str = JSON.stringify(data);
        if (!err) {
            keys.push(key);
            await db.set(key, str, {EX: timeout, NX: true});
        }
        originalResponseJson(data);
    }
    next();
};

const flush = async (req, res, next) => {
    let key;
    while(key=keys.shift()) {
        await db.del(key);
    }
    next();
}

module.exports = {cache, flush};