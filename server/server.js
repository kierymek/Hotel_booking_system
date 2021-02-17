require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(cors());

app.use(express.json());

// app.use((req, res, next) => {
//     console.log("yeah our middlewhere");
//     next();
// });

// app.use(morgan("dev"));

// get all hotels
app.get("/api/v1/hotels", async (req, res) => {
    try {
        const results =  await db.query("select * from hotele left join(select id_hotel, count(*),  trunc(avg(ocena), 2) as srednia_ocena from recenzje join oceny on oceny.id_oceny = recenzje.id_ocena group by id_hotel) recenzje on hotele.id_hotelu = recenzje.id_hotel join (select nazwa as nazwa_miasta, id_miasta from miasta) miasta on miasta.id_miasta = hotele.id_miasta;");
        res.status(200).json({
            status : "success",
            results : results.rows.length, 
            data: {
                hotels : results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a city
app.get("/api/v1/hotels/cities/:nazwa", async (req, res) => {
    try {
        const city =  await db.query("select * from miasta where nazwa = $1;", [
            req.params.nazwa
        ]);

        res.status(200).json({
            status : "success",
            data: {
                city : city.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Get all cities
app.get("/api/v1/hotels/cities", async (req, res) => {
    try {
        const cities =  await db.query("select * from miasta join(select nazwa as nazwa_kraju, id_kraju from kraje) kraje on kraje.id_kraju = miasta.id_kraju;");

        res.status(200).json({
            status : "success",
            results : cities.rows.length, 
            data: {
                cities : cities.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Get all countries
app.get("/api/v1/hotels/countries", async (req, res) => {
    try {
        const countries =  await db.query("select * from kraje;");

        res.status(200).json({
            status : "success",
            results : countries.rows.length, 
            data: {
                countries : countries.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a hotel
app.get("/api/v1/hotels/:id", async (req, res) => {
    try {
        const hotel =  await db.query("select * from hotele left join(select id_hotel, count(*),  trunc(avg(ocena), 2) as srednia_ocena from recenzje join oceny on oceny.id_oceny = recenzje.id_ocena group by id_hotel) recenzje on hotele.id_hotelu = recenzje.id_hotel left join opis_hotelu on hotele.id_hotelu = opis_hotelu.id_hotel where hotele.id_hotelu = $1;", [
            req.params.id
        ]);
        const reviews =  await db.query("select * from recenzje join oceny on recenzje.id_ocena = oceny.id_oceny where id_hotel = $1;", [
            req.params.id
        ]);
        const options = await db.query("select * from opcje join status on status.id_opcji = opcje.id_opcji where id_hotel = $1;", [
            req.params.id
        ]);

        res.status(200).json({
            status : "success",
            data: {
                hotel : hotel.rows[0],
                reviews : reviews.rows,
                options : options.rows
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Get an option
app.get("/api/v1/hotels/options/:idOption", async (req, res) => {
    try {
        const option =  await db.query("select * from opcje join status on status.id_opcji = opcje.id_opcji where opcje.id_opcji = $1;", [
            req.params.idOption
        ]);

        res.status(200).json({
            status : "success",
            data: {
                option : option.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a client
app.get("/api/v1/hotels/clients/:idClient", async (req, res) => {
    try {
        const client =  await db.query("select * from klienci join dane_klienta on dane_klienta.id_klient = klienci.id_klient where klienci.id_klient = $1;", [
            req.params.idClient
        ]);

        res.status(200).json({
            status : "success",
            data: {
                client : client.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a client by nickname and password
app.get("/api/v1/hotels/clients/login/:nickname/:password", async (req, res) => {
    try {
        const client =  await db.query("select * from klienci join dane_klienta on dane_klienta.id_klient = klienci.id_klient where pseudonim = $1 and haslo = $2;", [
            req.params.nickname, req.params.password
        ]);
        if(client.rows[0] == undefined) {
            res.status(201).json({
                status : "failed"
            });
        } else {
            res.status(200).json({
                status : "success",
                data: {
                    client : client.rows[0],
                },
            });
        }
    } catch (err) {
        console.log(err);

    }
});

// Get all client's reservations
app.get("/api/v1/hotels/clients/:id/reservations", async (req, res) => {
    try {
        const reservations =  await db.query("select *, to_char( od_kiedy, 'DD-MM-YYYY') as zameldowanie, to_char( do_kiedy, 'DD-MM-YYYY') as wymeldowanie from rezerwacje join(select nazwa, id_hotelu from hotele) hotele on hotele.id_hotelu = rezerwacje.id_hotel join(select rodzaj, id_opcji from opcje) opcje on opcje.id_opcji = rezerwacje.id_opcji where id_klient = $1;", [
            req.params.id
        ]);

        res.status(200).json({
            status : "success",
            data: {
                reservations : reservations.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Create a hotel
app.post("/api/v1/hotels", async (req, res) => {
    try {
        const city = await db.query("select * from miasta where nazwa = $1;", [
            req.body.city_name
        ]);
        if(city.rows[0] === undefined) {
            res.status(200).json({
            status : "failed"
            });
        } else {
            const results =  await db.query(
                "insert into hotele (nazwa, id_miasta, cena) values ($1, $2, $3) returning *;", [
               req.body.name, city.rows[0].id_miasta, req.body.price_range
           ]);
           console.log(results.rows);
           res.status(201).json({
               status : "success",
               data: {
                   hotel : results.rows[0],
               },
           });
        }
    } catch (err) {
        res.status(203).json({
            status : "already exists",
            data: {
                err: err.toString(),
            }
            });
    }
});

// update description
app.put("/api/v1/hotels/:id/description", async (req, res) => {
    try {
        const results =  await db.query(
            "update opis_hotelu set opis = $1 where id_hotel = $2 returning *;", [
                req.body.description, req.params.id
        ]);
        console.log(results.rows[0]);
        res.status(200).json({
            status : "success",
            data: {
                description : results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// post description
app.post("/api/v1/hotels/:id/description", async (req, res) => {
    try {
        const description =  await db.query(
                    "insert into opis_hotelu (id_hotel, opis) values ($1, $2) returning *;", [
                        req.params.id, req.body.description
               ]);
        console.log(description.rows[0]);
        res.status(200).json({
            status : "success",
            data: {
                description : description.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});



// Create a city
app.post("/api/v1/hotels/cities", async (req, res) => {
    try {
        const country = await db.query("select * from kraje where nazwa = $1;", [
            req.body.country_name
        ]);
        if(country.rows[0] == undefined) {
            res.status(200).json({
                status : "failed"
            });
        } else {
            const results =  await db.query(
                "insert into miasta (nazwa, id_kraju) values ($1, $2) returning *;", [
               req.body.name, country.rows[0].id_kraju
           ]);
           console.log(results.rows);
           res.status(201).json({
               status : "success",
               data: {
                   city : results.rows[0],
               },
           });
        }
    } catch (err) {
        console.log(err);
    }
});

// Create a country
app.post("/api/v1/hotels/countries", async (req, res) => {
    try {
        const results =  await db.query(
             "insert into kraje (nazwa) values ($1) returning *;", [
            req.body.name
        ]);
        console.log(results.rows);
        res.status(201).json({
            status : "success",
            data: {
                country : results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// update hotels
app.put("/api/v1/hotels/:id", async (req, res) => {
    try {
        const results =  await db.query(
            "update hotele set nazwa = $1, cena = $2 where id_hotelu = $3 returning *;", [
                req.body.name, req.body.price_range, req.params.id
        ]);
        console.log(results.rows[0]);
        res.status(200).json({
            status : "success",
            data: {
                hotel : results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// delete hotel
app.delete("/api/v1/hotels/:id", async (req, res) => {
    try {
        const results =  await db.query(
            "delete from hotele where id_hotelu = $1;", [
            req.params.id
        ]);
        res.status(204).json({
            status : "success",
        });
    } catch (err) {
        console.log(err);
    }
});

// delete city
app.delete("/api/v1/hotels/cities/:id", async (req, res) => {
    try {
        const results =  await db.query(
            "delete from miasta where id_miasta = $1;", [
            req.params.id
        ]);
        res.status(204).json({
            status : "success",
        });
    } catch (err) {
        console.log(err);
        res.status(401).json({
            status : "Hotels related with country still exist",
            data: {
                err: err.toString(),
            }
        });
    }
});

// delete country
app.delete("/api/v1/hotels/countries/:id", async (req, res) => {
    try {
        const results =  await db.query(
            "delete from kraje where id_kraju = $1;", [
            req.params.id
        ]);
        res.status(204).json({
            status : "success",
        });
    } catch (err) {
        console.log(err);
        res.status(401).json({
            status : "Cities related with country still exist",
            data: {
                err: err.toString(),
            }
        });
    }
});

// delete reservation
app.delete("/api/v1/hotels/reservations/:id", async (req, res) => {
    try {
        const results =  await db.query(
            "delete from rezerwacje where id_rezerwacja = $1;", [
            req.params.id
        ]);
        res.status(204).json({
            status : "success",
        });
    } catch (err) {
        console.log(err);
    }
});

//add review
app.post("/api/v1/hotels/:id/addReview", async (req, res) => {
    try {
        const newRating = await db.query("insert into oceny (ocena) values ($1) returning *;", [
            req.body.rating
        ]);
        const newReview = await db.query("insert into recenzje (recenzja, id_hotel, imie, id_ocena) values ($1, $2, $3, $4) returning *;", [
            req.body.review, req.params.id, req.body.name, newRating.rows[0].id_oceny
        ]);
        console.log(newRating);
        console.log(newReview);
        res.status(201).json({
            status : "success",
            data: {
                review : newReview.rows[0],
                rating : newRating.rows[0]
            },
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status : "review too short",
            data: {
                err: err.toString(),
            }
        });
    }
});

//add hotel option
app.post("/api/v1/hotels/:id/addOption", async (req, res) => {
    try {
        const newOption = await db.query("insert into opcje (rodzaj, id_hotel) values ($1, $2) returning *;", [
            req.body.option, req.params.id
        ]);
        const newStatus = await db.query("insert into status (id_opcji, wolny) values ($1, true) returning *;", [
            newOption.rows[0].id_opcji
        ]);
        console.log(newOption);
        console.log(newStatus);
        res.status(201).json({
            status : "success",
            data: {
                option : newOption.rows[0],
                status : newStatus.rows[0]
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//add reservation of a new client
app.post("/api/v1/hotels/:idHotel/reservation/:idOption/newUser", async (req, res) => {
    try {
        const newClient = await db.query("insert into klienci (imie, nazwisko) values ($1, $2) returning *;", [
            req.body.name, req.body.surname
        ]);
        const newClientData = await db.query("insert into dane_klienta (id_klient, pseudonim, haslo) values ($1, $2, $3) returning *;", [
            newClient.rows[0].id_klient, req.body.nickname, req.body.password
        ]);
        const newReservation = await db.query("insert into rezerwacje (od_kiedy, do_kiedy, id_hotel, id_opcji, id_klient) values ($1, $2, $3, $4, $5) returning *;", [
            req.body.start_date, req.body.end_date, req.params.idHotel, req.params.idOption, newClient.rows[0].id_klient
        ]);

        console.log(newClient.rows[0]);
        console.log(newClientData.rows[0]);
        console.log(newReservation.rows[0]);
        res.status(201).json({
            status : "success",
            data: {
                newClient : newClient.rows[0],
                newClientData : newClientData.rows[0],
                newReservation : newReservation.rows[0]
            },
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status : "wrong client data",
            data: {
                err: err.toString(),
            }
        });
    }
});

//add reservation of an existing client
app.post("/api/v1/hotels/:idHotel/reservation/:idOption/existingUser", async (req, res) => {
    try {
        const existingClientData = await db.query("select * from dane_klienta where pseudonim = $1 and haslo = $2;", [
            req.body.nickname, req.body.password
        ]);
        const newReservation = await db.query("insert into rezerwacje (od_kiedy, do_kiedy, id_hotel, id_opcji, id_klient) values ($1, $2, $3, $4, $5) returning *;", [
            req.body.start_date, req.body.end_date, req.params.idHotel, req.params.idOption, existingClientData.rows[0].id_klient
        ]);

        console.log(existingClientData);
        console.log(newReservation);
        res.status(201).json({
            status : "success",
            data: {
                existingClientData : existingClientData.rows[0],
                reservation : newReservation.rows[0]
            },
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status : "wrong client data",
            data: {
                err: "Dany użytkownik nie istnieje! Nieprawidlowy login lub hasło!",
            }
        });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});

