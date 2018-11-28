module.exports = function (registrationService) {
    async function show (req, res, next) {
        try {
            let results = await registrationService.getTowns();
            let registrationNumberResults = [];
            let registrationNumberCode = req.query.filter;

            if (req.query.filter) {
                registrationNumberResults = await registrationService.getRegistrationNumbersByTown(registrationNumberCode);
            } else {
                registrationNumberResults = await registrationService.getRegistrationNumbers();
            }

            results = results.map(function (town) {
                town.selected = town.code === registrationNumberCode ? 'selected' : '';
                return town;
            });

            res.render('home', {
                towns: results,
                registrationNumbers: registrationNumberResults
            });
        } catch (err) {
            next(err);
        }
    };

    async function regAdd (req, res, next) {
        try {
            var registrationNumberFull = req.body.registrationNumber;
            registrationNumberFull = registrationNumberFull.toUpperCase();
            var registrationNumberStart = registrationNumberFull.substring(0, 3);

            if (registrationNumberStart.match(/C[A-Z][A-Z]/)) {
                var registrationNumberCode = registrationNumberFull.substring(0, 3);
                var registrationNumber = registrationNumberFull.substring(4, 9);
                let registrationNumberResults = await registrationService.createRegistrationNumber({
                    registration_number_area: registrationNumberCode,
                    registration_number: registrationNumber
                });
            }

            if (registrationNumberStart.match(/C[A-Z]\s/)) {
                var registrationNumberCode = registrationNumberFull.substring(0, 2);
                var registrationNumber = registrationNumberFull.substring(3, 10);
                let registrationNumberResults = await registrationService.createRegistrationNumber({
                    registration_number_area: registrationNumberCode,
                    registration_number: registrationNumber
                });
            }

            res.redirect('/');
        } catch (err) {
            next(err);
        }
    };

    async function regFilter (req, res, next) {
        try {
            var filter = req.body.filter;
            // find all the matching reg numbers
            if (filter === 'ALL') {
                res.redirect('/');
            } else {
                res.redirect('/?filter=' + filter);
            }
        } catch (err) {
            next(err);
        }
    };

    async function regReset (req, res, next) {
        try {
            await registrationService.deleteRegistrationNumbers();
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    };

    return {
        show,
        regAdd,
        regFilter,
        regReset
    };
};
