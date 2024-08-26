const walk = require("deepest-walk");

function optimize(obj, options) {
  var debug_level =
    typeof options === "object" && typeof options.debug_level === "number"
      ? options.debug_level
      : 0;
  if (debug_level >= 2) console.log("[memory-optimizer] starting");

  const index = {};

  function hash32(str) {
    var hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  walk({
    data: obj,
    types: ["array", "object"],
    callback: function ({ data, mod, type }) {
      if (debug_level >= 10)
        console.log("\n[memory-optimizer] calling callback");
      if (debug_level >= 10) console.log("[memory-optimizer] data:", data);
      if (debug_level >= 5) console.log("[memory-optimizer] type:", type);
      if (typeof data === "object") {
        const str = JSON.stringify(data);
        const hash = hash32(str);
        if (debug_level >= 5) console.log("[memory-optimizer] hash:", hash);
        if (hash in index) {
          if (debug_level >= 5) console.log("[memory-optimizer] replacing");
          mod(index[hash]);
        } else {
          index[hash] = data;
        }
      }
    }
  });

  if (debug_level >= 2) console.log("[memory-optimizer] finishing");

  // encourage garbage collection on index
  for (let key in index) {
    delete index[key];
  }

  return obj;
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return { optimize: optimize };
  });
}

if (typeof module === "object") {
  module.exports = { optimize };
}

if (typeof self === "object") {
  self.memory_optimizer = {
    optimize: optimize
  };
}

if (typeof window === "object") {
  window.memory_optimizer = {
    optimize: optimize
  };
}
