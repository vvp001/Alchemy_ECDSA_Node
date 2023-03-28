
### Solution for Alchemy university Etherium bootcamp first week assignment

Please test the same with addressed saved in index.js of server

Private_key: fae27b265c8b933cc2210076547c190110244472ef4defe2c73c76f4142a2c6a 

publicKey:0420cc3478e05fe7e6d746e9736db72c20360319592151825889f5b4128709b0d0ba7cc92b3b0c414d46697d59ee07f32e6162a95aae4e3fbfbc343a2d7e50756e 
address: 0xfee7c627eebc53e5185caaee92bee871158e4299

========================================

private_key:85862e6b1b3528a32dbce7590a197d7b025f086b728acbdcdc804dd4402e3efb 

publicKey: 04ada7122f82eba6350fd90208ba8e53b8b339459bda1dc1d1e8c723ffaadaed950c1b8f2b8eacba2f3fba27985af70535e800ce682f85c8bb31b287c52ebad59a 

address: 0x1958cd5ba9302e9c067e56d3bca705e67768316e

======================================

Private_key: 58a8f7b2b1c486696c8a5cb44b1a9c67217f26d27e6246009cfc309aa7e37287 

publicKey :04171f6434957b9ee55f50a04e7c2104096017d1b3be76a627fe39bdea7bb0b318431669db7fb9757
64a395998da5ea81dabfc4785c1dcbfbeebb0d5b671bcf6e0 
address:0xeb77dc8bfec7bc141203efb3f055ee4069c0bb3a
 

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.


