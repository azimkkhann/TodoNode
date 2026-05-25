const express = require("express");
const path = require("path");
const fs = require("fs").promises
const app = express();

app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.get("/", (req, res)=>{
    res.sendFile(
        path.join(__dirname, "main.html"));
})



app.post("/", async (req, res) =>{
    let content = req.body;
    let data = await fs.readFile("todolist1.json", "utf-8");
    data = JSON.parse(data);
    data.push(content);
    data = JSON.stringify(data);
    console.log(data);
    await fs.writeFile("todolist1.json", data);
    res.send("Successfully entered!")
})


app.put("/:id", (req, res) =>{
    let id = req.params.id;
    let data = fs.readFileSync("todolist1.json", "utf-8");
    data = JSON.parse(data);

    if(data[id]){
        data[id].username = req.body.name;
    }else{
        res.send("no id")
    }
    data = JSON.stringify(data);
    
    fs.writeFileSync("todolist1.json", data);

    res.send("Sucessfully edited the todo")
    console.log(data)
})

app.delete("/:id", function(req, res){

    let id = req.params.id;
    let data = fs.readFileSync("todolist1.json", "utf-8");
    data = JSON.parse(data);

    if(data[id]){
       data.splice(id, 1);
    }else{
        res.send("no id")
    }

    data = JSON.stringify(data);
    fs.writeFileSync("todolist1.json", data);
    res.send("Deleted todo successfully");
    console.log(data)

})




app.listen(3000)