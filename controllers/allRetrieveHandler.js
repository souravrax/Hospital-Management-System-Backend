const allRetriever = (res, db, position)=>{
    db.select("*")
        .from('login')
        .where("position", "=", position)
        .then(data=>{
            res.json(data);
        })
        .catch(e=>{
            res.status(404).send("No data found");
        })
}

module.exports = {
    allRetriever
}