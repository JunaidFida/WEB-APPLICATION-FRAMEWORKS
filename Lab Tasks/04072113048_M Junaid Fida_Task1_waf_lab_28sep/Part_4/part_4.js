//Name : Muhammad Junaid Fida 
//Reg No:04072113048
const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 5500;

let serialNumber = 1;

const logRequest = (reqUrl, queryParams) => {
    const logEntry = `${serialNumber++}, ${new Date().toISOString()}, ${reqUrl}, ${Object.keys(queryParams).length}\n`;
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) throw err;
    });
};

const appendToFile = (fileName, data) => {
    fs.appendFile(fileName, data, (err) => {
        if (err) throw err;
    });
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;

    // logRequest(parsedUrl.pathname, queryParams);
    if (parsedUrl.pathname !== '/favicon.ico') {
        logRequest(parsedUrl.pathname, queryParams);
    }

    if (parsedUrl.pathname === '/') {
   
        res.end('Welcome to the Home Page');
    } else if (parsedUrl.pathname === '/users') {
        const userData = `${queryParams.id}, ${queryParams.name}, ${queryParams.age}, ${queryParams.city}, ${queryParams.uni}\n`;
        appendToFile('users.txt', userData);
        res.end('User data appended');
    } else if (parsedUrl.pathname === '/products') {
        const productData = `${queryParams.id}, ${queryParams.title}, ${queryParams.price}\n`;
        appendToFile('products.txt', productData);
        
        res.end('Product data appended');
    } else if (parsedUrl.pathname === '/books') {
        const bookData = `${queryParams.id}, ${queryParams.title}, ${queryParams.edition}, ${queryParams.year}, ${queryParams.press}\n`;
        appendToFile('books.txt', bookData);
        
        res.end('Book data appended');
    } else if (parsedUrl.pathname === '/display') {
       
        res.end('Display Page');
    } else {
       
        res.end('Page not found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});