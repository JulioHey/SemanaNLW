const express = require("express")
const server = express()

// configurar pasta publica
server.use(express.static("publics"))

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))


//pegar banco de
const db = require("./database/db")


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html", {title: "Seu marketplace de coleta de resíduos"})
})

//configurando caminhos
server.get("/create-point", (req, res) => {
    // req.query: Query Strings da nossa url


    return res.render("create-point.html")
})

server.get("/search-point", (req, res) => {
    const search = req.query.search

    if (search == "") {
        // pesquisa vazia...
        return res.render("search-point.html", {total: 0})
    } 


    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // console.log("Aqui estão seus registros: ")
        // console.log(rows)

        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-point.html", { places: rows, total})
    })
})

server.post("/savepoint", (req, res) => {
    //req.body
    console.log(req.body)

    //inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        adress,
        adress2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.cityname,
        req.body.items
    ]
    
    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
    
        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    
    db.run(query, values, afterInsertData)

    return res.render("create-point.html", {saved:true})
})

server.listen(3000)