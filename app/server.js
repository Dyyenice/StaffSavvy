const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "Welcome to StaffSavvy application." });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
const Role = db.role;
const Rolegroup = db.rolegroups;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});


function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
    Role.create({
        id: 4,
        name: "pending"
    });
    Role.create({
        id: 5,
        name: "taskAdmin"
    });

    Role.create({
        id: 6,
        name: "userGroupAdmin"
    });
    Role.create({
        id: 7,
        name: "roleGroupAdmin"
    });
    Role.create({
        id: 8,
        name: "pendingPersonnelsAdmin"
    });
    Role.create({
        id: 9,
        name: "companyPersonnelsAdmin"
    });
    Role.create({
        id: 10,
        name: "companyJobPostingsAdmin"
    });
    Role.create({
        id: 11,
        name: "EventAdmin"
    });
    Rolegroup.create({
        id: 1,
        name:"default"
    }).then(rolegroup =>{
        rolegroup.setRoles([1])
    });
    Rolegroup.create({
        id: 2,
        name:"pending"
    }).then(rolegroup =>{
        rolegroup.setRoles([4])
    });
    Rolegroup.create({
        id:3,
        name:"admin"
    }).then(rolegroup =>{
        rolegroup.setRoles([3])
    });

}
require('./routes/company.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/public.routes')(app);
