const packageJson = require("./package.json");

const isGreaterVersion = (firstVersion, secondVersion) => {
  const [firstMajor, firstMinor, firstPatch] = firstVersion.split(".");
  const [secondMajor, secondMinor, secondPatch] = secondVersion.split(".");

  // first checking major
  if (Number(firstMajor) > Number(secondMajor)) {
    return true;
  }
  if (Number(firstMajor) < Number(secondMajor)) {
    return false;
  }

  // if equal, then checking minor
  if (Number(firstMinor) > Number(secondMinor)) {
    return true;
  }
  if (Number(firstMinor) < Number(secondMinor)) {
    return false;
  }

  // if equal, then checking patch
  return Number(firstPatch) > Number(secondPatch);
};

const handler = () => {
  const currentPackageVersion = packageJson.version;
  const myArgs = process.argv.slice(2);
  const currentVersion = myArgs[0];

  if (isGreaterVersion(currentPackageVersion, currentVersion)) {
    // returning package version as new if it is greater
    console.log(currentPackageVersion);
  } else {
    // if package deployed version is greater, then increment it and use as new
    const [major, minor, patch] = currentVersion.split(".");

    const newVersion = [major, minor, Number(patch) + 1].join(".");
    // instead of process.stdout.write()
    console.log(newVersion);
  }
};

handler();
