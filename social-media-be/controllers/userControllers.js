const fs = required("fs");

const data = fs.readFileSync("./database/user.json", "utf-8");

module.exports = {
  register: (req, res) => {
    const id = Math.max(...data.map((item) => item.id)) + 1;
    req.body.id = id;
    data.push(req.body);
    fs.writeFileSync("./database/user.json", JSON.stringify(data), "utf-8");
    res.status(200).send("Register success");
  },
};
