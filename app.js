var readlineSync = require("readline-sync");
var net = require("net");

var HOST = "localhost";
var PORT = 9000;

var client = null;

function OpenConnection() {
    if (client) {
        console.log("--Connection is already opened--");
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }

    client = new net.Socket();

    client.on("error", function (err) {
        client.destroy();
        console.log("--ERROR: Connection could not be opened. Msg: %s--", err.message);
        console.log("--Please wait until the server is opened again.--")
        return;
    });

    client.on("data", function (data) {
        console.log("--Reply: %s--", data); 
        setTimeout(function () {
            menu();
        }, 0);  
    });

    client.connect(PORT, HOST, function () {
        console.log("--Connection opened successfully!--");
        setTimeout(function () {
            menu();
        }, 0);
    });

}

function SendData(data) {
    if (!client) {
        console.log("--Server is not available in the moment!--");
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }

    client.write(data);

}

function CloseConnection() {
    if (!client) {
        console.log("--Connection is not opened or already closed--");
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }

    client.destroy();
    client = null;
    console.log("--Connection closed successfully!--");
    setTimeout(function () {
        menu();
    }, 0);
}

function menu() {
    var lineRead = readlineSync.question("\n\nEnter option (1-Open, 2-Order, 3-Close, 4-Quit) [MUST OPEN CONNECTION FIRST!]: ");

    switch(lineRead) {
        case "1":
            OpenConnection();
            break;
        case "2":
            var data = readlineSync.question("Enter Order Items with Quantities and your Name, Company, Email and Phone No. to order [Format: ItemNames, PreferableSource, RespectiveQuantities, FullName, CompanyName, CompanyEmail, Phone No.]: ");
            SendData(data);
            break;
        case "3":
            CloseConnection();
            break;
        case "4":
            return;
        default:
            setTimeout(function () {
                menu();
            }, 0);
            break;
    }

}

setTimeout(function () {
    menu();
}, 0);