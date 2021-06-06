export default function handlebarsConfig(app) {
    app.engine( 
        "hbs",
        handlebars({
            extname: ".hbs",
            defaultLayout: "index.hbs"
        })
    )
    app.set("view engine", "hbs")
    app.set("views", "../views")
}