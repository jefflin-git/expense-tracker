module.exports = app => {
    app.use((req, res, next) => {
        res.locals.isAuthenticated = req.isAuthenticated()
        res.locals.user = req.user
        res.locals.success_msg = req.flash('success_msg')
        res.locals.warning_msg = req.flash('warning_msg')
        next()
    })
}