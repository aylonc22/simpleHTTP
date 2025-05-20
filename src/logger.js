let VERBOSE = false;

function setVerbose(flag) {
  VERBOSE = flag;
}

function log(...args) {
  if (VERBOSE) {
    console.log(...args);
  }
}

module.exports = {
  log,
  setVerbose
};
