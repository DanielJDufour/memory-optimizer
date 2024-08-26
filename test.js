const fs = require("fs");
const test = require("flug");
const optimizer = require("./memory-optimizer.js");

test("code.json", ({ eq }) => {
  const data = JSON.parse(fs.readFileSync("./data/code.json", "utf-8"));
  const original = JSON.stringify(data);
  eq(data.releases[0].languages === data.releases[1].languages, false);
  eq(
    data.releases[0].contact ===
      data.releases[data.releases.length - 1].contact,
    false
  );
  optimizer.optimize(data, { debug_level: 0 });
  eq(data.releases[0].languages === data.releases[1].languages, true);
  eq(
    data.releases[0].contact ===
      data.releases[data.releases.length - 1].contact,
    true
  );
  eq(JSON.stringify(data), original);
});
