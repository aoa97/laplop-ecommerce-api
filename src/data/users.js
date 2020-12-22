import bcypt from 'bcryptjs';

const users = [
    {
        isAdmin: true,
        name: "Admin User",
        email: "admin@example.com",
        password: bcypt.hashSync("010011012", 10)
    },
    {
        name: "Ahmed Usama",
        email: "ahmed@example.com",
        password: bcypt.hashSync("010011012", 10)
    },
    {
        name: "Youssef Usama",
        email: "youssef@example.com",
        password: bcypt.hashSync("010011012", 10)
    },
]

export default users