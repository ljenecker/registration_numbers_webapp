module.exports = function (registrationService) {
    async function show (req, res, next) {
        try {
            let results = await registrationService.getTowns();
            res.render('home', {
      				towns: results
      			});
        } catch (err) {
            next(err);
        }
    };

    return {
        show
    };
};
