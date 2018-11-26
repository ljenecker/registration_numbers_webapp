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

    async function regAdd (req, res, next) {
        try {
            var registrationNumber = req.body.registrationNumber;
            // var registrationNumberCode = registrationNumber.substring(0, 3);
            //
            // if (registrationNumberCode.match(/\d+/g)) {
            //     console.log('Has numbers');
            // }
            // else {
            //     console.log('Has no numbers');
            // }

            let results = await registrationService.getTowns();
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    };

    return {
        show,
        regAdd
    };
};
