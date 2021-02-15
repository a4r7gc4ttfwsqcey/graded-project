const jwt = require('jsonwebtoken')
const authJwt = (strict = false) => {
	return (req, res, next) => {
		try {
			const authorization = req.headers.authorization
			if (!authorization) {
				req.auth = null
			} else {
				const token = authorization.split(' ')[1]
				const decodedToken = jwt.verify(token, process.env.JWTSECRET)
				req.auth = decodedToken
			}
		} catch (e) {
			req.auth = null
		} finally {
			if (strict && !req.auth) {
				res.status(401).send('Unauthorized: Invalid token')
			} else {
				next()
			}
		}
	}
}
module.exports = authJwt
