const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2] || 'JUL02';
const values = [`%${cohortName}%`];

const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM assistance_requests
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
JOIN teachers ON teachers.id = assistance_requests.teacher_id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(assistRequest => {
    console.log(`${assistRequest.cohort}: ${assistRequest.teacher}`);
  })
});