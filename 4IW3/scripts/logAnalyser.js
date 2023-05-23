const fs = require("fs/promises");
/** @var {import('mongoose').model} LogModel */
const LogModel = require("./logModel");

const filePath = "./access.log";
fs.access(filePath, fs.constants.R_OK)
  .then(() => fs.readFile(filePath))
  .then((data) => data.toString().split("\n"))
  .then((lines) =>
    Promise.all(
      lines.map((line) => {
        const regex =
          /^(?<id>[0-9]+) (?<ip>[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}) \[(?<date>[0-9]{4}-[0-9]{2}-[0-9]{2})\] "(?<method>GET|POST|PUT|PATCH|DELETE|TRACE|HEAD|OPTIONS|CONNECT) (?<path>[^"]+)" (?<status>[0-9]{3})$/;
        const { groups: result } = regex.exec(line);
        const lineParsed = {
          _id: result.id,
          ip: result.ip,
          date: new Date(result.date),
          request: {
            method: result.method,
            path: result.path,
          },
          response: {
            status: result.status,
          },
        };
        return LogModel.create(lineParsed);
      })
    )
  )
  .then(() => console.log("Lines inserted") || LogModel.connection.close())
  .catch((e) => console.error(e));
