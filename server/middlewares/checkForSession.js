module.exports = function(req, res, next){
    // console.log('middleware', req.session)
    const {session} = req
    if(!session.user){
        session.user = {username: '', cart: [], total: 0}
    }
    next()
}