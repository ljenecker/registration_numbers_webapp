const assert = require('assert');
const RegistrationNumberService = require('../services/registration-service');
const pg = require('pg');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://lorenzo:123@localhost:5432/registration_numbers_app_tests';

const pool = new Pool({
    connectionString
});

describe('The basic registration number web app', function() {
    beforeEach(async function() {
        await pool.query('delete from registration_numbers;');
        await pool.query('delete from towns;');
    });

    it('should be able to get a town', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        let town = await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });

        town = await registrationNumberService.getTown(town.id);
        assert.equal('CA', town.code);
    });

    it('should be able to get all towns', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });

        await registrationNumberService.createTown({
            code: 'CJ',
            location: 'Paarl'
        });


        let towns = await registrationNumberService.getTowns();
        assert.equal(2, towns.length);
    });

    it('should be able to add a town', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        let town = await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });
        assert.equal('CA', town.code);
    });

    it('should be able to update a town', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        let town = await registrationNumberService.createTown({
            code: 'CA',
            location: 'Kaap Stad'
        });

        town.location = 'Cape Town';
        await registrationNumberService.updateTown(town);


        let updateTown = await registrationNumberService.getTown(town.id);
        assert.equal('Cape Town', updateTown.location);
    });

    it('should be able to delete a town', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        let town = await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });

        await registrationNumberService.deleteTown(town.id)

        let updateTown = await registrationNumberService.getTown(town.id);
        assert.equal(null, updateTown);

    });

    it('should be able to get a registration number', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });

        await registrationNumberService.createRegistrationNumber({
            registration_number_area: 'CA',
            registration_number: 123456
        });

        let registrationNumberResults = await registrationNumberService.getRegistrationNumber({
            registration_number_area: 'CA',
            registration_number: 123456
        });

        assert.equal('CA123456', registrationNumberResults.registration_number_area + registrationNumberResults.registration_number);
    });

    it('should be able to get all registration numbers', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });

        await registrationNumberService.createRegistrationNumber({
            registration_number_area: 'CA',
            registration_number: 123456
        });

        await registrationNumberService.createRegistrationNumber({
            registration_number_area: 'CA',
            registration_number: 789123
        });

        let registrationNumberResults = await registrationNumberService.getRegistrationNumbers();

        assert.equal(2, registrationNumberResults.length);
    });

    it('should be able to add a registration number', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        let town = await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });

        let registrationNumberResults = await registrationNumberService.createRegistrationNumber({
            registration_number_area: 'CA',
            registration_number: 123456
        });

        assert.equal('CA', registrationNumberResults.registration_number_area);
    });

    it('should NOT be able to add a registration number if town does not exist', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        let town = await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });

        let registrationNumberResults = await registrationNumberService.createRegistrationNumber({
            registration_number_area: 'CP',
            registration_number: 123456
        });

        assert.equal('Unable to add registration number - NO TOWN CODE FOUND', registrationNumberResults);
    });

    it('should be able to delete a registration number', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        let town = await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });

        let registrationNumberResults = await registrationNumberService.createRegistrationNumber({
            registration_number_area: 'CA',
            registration_number: 123456
        });

        await registrationNumberService.deleteRegistrationNumber(registrationNumberResults.id)


        let updateRegistrationNumber = await registrationNumberService.getRegistrationNumber({
            registration_number_area: 'CA',
            registration_number: 123456
        });

        assert.equal(null, updateRegistrationNumber);

    });

    it('should be able to delete all registration numbers', async function() {
        let registrationNumberService = RegistrationNumberService(pool);

        let town = await registrationNumberService.createTown({
            code: 'CA',
            location: 'Cape Town'
        });

        await registrationNumberService.createRegistrationNumber({
            registration_number_area: 'CA',
            registration_number: 123456
        });

        await registrationNumberService.createRegistrationNumber({
            registration_number_area: 'CA',
            registration_number: 789123
        });

        await registrationNumberService.deleteRegistrationNumbers()


        let registrationNumberResults = await registrationNumberService.getRegistrationNumbers();

        assert.equal(0, registrationNumberResults.length);

    });


    after(function() {
        pool.end();
    });
});
