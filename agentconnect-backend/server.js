//Constants
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());



//root directory for REST request
app.get('/', (req, res) => {
    res.send("Hello node and express API");
}); 

app.listen(PORT, () => {
    console.log(`Node API app is running on port ${PORT}`);
});