module.exports = function RegistrationNumberService (pool) {
    async function getTown (id) {
        let townsResult = await pool.query('SELECT * FROM towns WHERE id = $1', [id]);
        let towns = townsResult.rows[0];
        return towns;
    }

    async function getTownByCode (code) {
        let townsResult = await pool.query('SELECT id FROM towns WHERE code = $1', [code]);
        let towns = townsResult.rows[0];
        return towns;
    }

    async function getTowns () {
        let townsResult = await pool.query('SELECT * FROM towns');
        return townsResult.rows;
    }

    async function createTown (town) {
        let data = [
            town.code,
            town.location
        ];

        let results = await pool.query(`insert into towns(code, location) values ($1, $2) returning id, code, location`, data);

        return results.rows[0];
    }

    async function updateTown (town) {
        return pool.query('UPDATE towns SET location = $1 WHERE id = $2', [town.location, town.id]);
    }

    async function deleteTown (id) {
        return pool.query('DELETE FROM towns WHERE id = $1', [id]);
    }

    async function getRegistrationNumber (registrationNumber) {
        let data = [
            registrationNumber.registration_number_area,
            registrationNumber.registration_number
        ];
        let townsResult = await pool.query('SELECT * FROM registration_numbers WHERE registration_number_area = $1 and registration_number = $2 ', data);
        let towns = townsResult.rows[0];
        return towns;
    }

    async function getRegistrationNumbers () {
        let townsResult = await pool.query('SELECT * FROM registration_numbers');
        let towns = townsResult.rows;
        return towns;
    }

    async function createRegistrationNumber (registrationNumber) {
        let data = [
            registrationNumber.registration_number_area,
            registrationNumber.registration_number
        ];

        let town = await getTownByCode(registrationNumber.registration_number_area);

        if (!town) { return 'Unable to add registration number - NO TOWN CODE FOUND'; }

        let results = await pool.query(`insert into registration_numbers(registration_number_area, registration_number, town_id) values ($1, $2, (select id from towns where code = $1)) returning id, registration_number_area, registration_number, town_id`, data);

        return results.rows[0];
    }

    async function deleteRegistrationNumber (id) {
        return pool.query('DELETE FROM registration_numbers WHERE id = $1', [id]);
    }

    async function deleteRegistrationNumbers () {
        return pool.query('DELETE FROM registration_numbers');
    }

    return {
        getTown,
        getTowns,
        createTown,
        updateTown,
        deleteTown,
        getRegistrationNumber,
        getRegistrationNumbers,
        createRegistrationNumber,
        deleteRegistrationNumber,
        deleteRegistrationNumbers

    };
};
