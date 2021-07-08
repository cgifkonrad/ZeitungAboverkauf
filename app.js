const express = require('express')
const app = express()
const port = 4500
var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
app.set('view engine', 'ejs');

/*System Types */
let abonnements = [
    {
        id: 1,
        name: 'Printed newspaper',
        description: 'Gedruckte Zeitung bestellen',
    },
    {
        id: 2,
        name: 'E-paper',
        description: 'Elektronisches Abo als PDF'
    },
    {
        id: 3,
        name: 'Website',
        description: 'Abo als Online-Angebot im Browser'
    }
]

let payments = [
    {
        id: 1,
        name: 'Lastschrift',
        description: 'Lastschrifteizug von deutschem Konto',
    },
    {
        id: 2,
        name: 'Kreditkarte',
        description: 'Vorauszahlung mit Kreditkarte'
    },
    {
        id: 3,
        name: 'PayPal',
        description: 'Vorauszahlung mit PayPal'
    }
]

let deliveries = [
    {
        id: 1,
        name: 'Zeitungsjunge',
        description: 'Der Zeitungsbote kommt am Morgen vorbei und liefert die Zeitung in den Briefkasten',
    },
    {
        id: 2,
        name: 'Post',
        description: 'Die Zeitung wird vom Postboten gebracht'
    },
    {
        id: 3,
        name: 'Digital',
        description: 'Die Zeitung ist digital. Sie muss nicht physisch geliefert werden.'
    }
]
app.use(express.static('public'));

app.get('/', (req, res) => {
    //res.send('<h1>Zeitung Aboverkauf Home Page</h1>');
    res.sendFile(__dirname + "/" + "index.htm");
})

app.get('/favicon.ico', (req, res) => {
    //res.sendFile( __dirname + "/public/images/" + "favicon.ico");
    res.redirect ("https://www.weiterbildung-reutlingen-university.de/favicon.ico");
})

app.get('/types/:requestedType', (req, res) => {
    //res.header("Content-Type", "application/json")
    res.header("Content-Type", "text/html")
    let header = "<h1>Zeitung Aboverkauf Typen</span >:</h1 > <div id='app-list'>";
    let param = req.params.requestedType;
    switch (param) {
        case 'abonnements':
            res.send(printList('abonnements', abonnements, header));
            break;
        case 'deliveries':
            res.send(printList('deliveries', deliveries, header));
            break;
        case 'payments':
            res.send(printList('payments', payments, header));
            break;
        default:
            let response = printList('payments', payments, header) +
                printList('deliveries', deliveries, '') +
                printList('abonnements', abonnements, '');
            res.send(response);
            break;
    }
});
/**Utility function**/
function printList(name, listData, header) {
    let returnHtml = header + "";
    //set title
    returnHtml += "<h3>" + name + "</h3>";
    //check the list
    let total = listData.length;
    //create list
    returnHtml += "<ul>";
    for (i = 0; i < total; ++i) {
        // create an item for each one
        returnHtml += "<li>" + listData[i]['name'] + "</li>";
    }
    returnHtml += "</ul>";
    returnHtml += "</div>";
    return returnHtml;
}

// index page
app.get('/render/', function (req, res) {
    res.render('pages/index',
        {
            titleValue: "Zeitung Aboverkauf Home Page"
        }
    );
});

// about page
app.get('/render/about', function (req, res) {
    res.render('pages/about');
});


app.get('/render/system-types/:requestedType', function (req, res) {
    let param = req.params.requestedType;
    switch (param) {
        case 'abonnements':
            res.render('pages/types',
                {
                    titleValue: "Abonnements",
                    systemTypes: [{
                        title: "Abonnements",
                        content: abonnements
                    }]
                
                });
            break;
        case 'deliveries':
            res.render('pages/types',
                {
                    titleValue: "Deliveries",
                    systemTypes: [{
                        title: "Deliveries",
                        content: deliveries
                    }]
                
                });
            break;
        case 'payments':
            res.render('pages/types',
                {
                    titleValue: "Payments",
                    systemTypes: [{
                        title: "Payments",
                        content: payments
                    }]
                
                });
            break;
        default:
            res.render('pages/types', {
                titleValue: "System-types",
                systemTypes: [{
                    title: "Abonnements",
                    content: abonnements
                }, {
                    title: "Deliveries",
                    content: deliveries
                }, {
                    title: "Payments",
                    content: payments
                }]
            })
            break;
    }


});