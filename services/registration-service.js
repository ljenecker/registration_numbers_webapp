module.exports = function RegistrationNumberService (pool) {
    async function getTownById (id) {
        let townsResult = await pool.query('SELECT * FROM towns WHERE id = $1', [id]);
        let towns = townsResult.rows[0];
        return towns;
    }

    async function getTownByCode (code) {
        let townsResult = await pool.query('SELECT * FROM towns WHERE code = $1', [code]);
        let towns = townsResult.rows[0];
        return towns;
    }

    async function getTowns () {
        let townsResult = await pool.query('SELECT * FROM towns ORDER BY location ASC;');
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

    async function deleteTownById (id) {
        return pool.query('DELETE FROM towns WHERE id = $1', [id]);
    }

    async function deleteTownByCode (code) {
        return pool.query('DELETE FROM towns WHERE code = $1', [code]);
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

    async function getRegistrationNumberById (id) {
        let townsResult = await pool.query('SELECT * FROM registration_numbers WHERE id = $1', [id]);
        let towns = townsResult.rows[0];
        return towns;
    }

    async function getRegistrationNumbersByTown (code) {
        let townsResult = await pool.query('SELECT * FROM registration_numbers WHERE registration_number_area = $1', [code]);
        let towns = townsResult.rows;
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

        if (!registrationNumber.registration_number_area) { return 'Unable to add registration number - NO TOWN CODE SUPPLIED'; }
        if (!registrationNumber.registration_number) { return 'Unable to add registration number - NO REG NUMBER SUPPLIED'; }
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
        getTownById,
        getTownByCode,
        getTowns,
        createTown,
        updateTown,
        deleteTownById,
        deleteTownByCode,
        getRegistrationNumber,
        getRegistrationNumberById,
        getRegistrationNumbersByTown,
        getRegistrationNumbers,
        createRegistrationNumber,
        deleteRegistrationNumber,
        deleteRegistrationNumbers

    };
};
