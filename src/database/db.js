//importar obj sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar obj q vai fazer  operaç~oes no banco de daddo
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.serialize(() => {
//criar tabela com comandos sql

    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         adress TEXT,
    //         adress2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    //inserir dados
    // const query = `
    // INSERT INTO places (
    //     image,
    //     name,
    //     adress,
    //     adress2,
    //     state,
    //     city,
    //     items
    // ) VALUES (?,?,?,?,?,?,?);
    // `

//     const values = [
//         "http://localhost:3000/icones/aparasdepapel.jpg",
//         "Paper Sider",
//         "Guilherme Gambella, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

// function afterInsertData(err) {
//     if (err) {
//         return console.log(err)
//     }

//     console.log("Cadastrado com sucesso")
//     console.log(this)
// }

//     db.run(query, values, afterInsertData)

//     //consultar dados
    // db.all(`SELECT name FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    //  })

   // deletar dados
    db.run(`DELETE FROM places WHERE id = ?`, [14], function(err) {
        if (err) {
            console.log(err)
        }

        console.log("Registro deletado com sucesso")
    })
})