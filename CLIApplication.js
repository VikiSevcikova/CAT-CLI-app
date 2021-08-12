class CLIApplication {
  
  static ids = [];
  startupTime = undefined;
  ApplicationID = undefined;

  NodeExecutable = undefined;
  ModuleName = undefined;

  suppliedParamaters = [];

  supportedParamaters = [
    {
      Switch: "-version",
      Message: "Version 1",
      CallBack: () => {
        console.log(this.Message);
      },
    },
  ];

  static generateARandomID(min, max) {
    let newID = Math.floor(Math.random() * (max - min) + min);
    if (CLIApplication.ids[newID] != undefined) {
      CLIApplication.ids.push(this.generateARandomID(newID++, newID + max));
    } else {
      CLIApplication.ids.push(newID);
      return newID;
    }
  }
  constructor(
    ApplicationName,
    process = require("process"),
    supportedParamaters
  ) {
    this.startupTime = Date.now();
    this.ApplicationID = CLIApplication.generateARandomID(0, 1000);
    this.ApplicationName = ApplicationName;
    // first argument can be called process.argv0 or process.argc[0]
    this.NodeExecutable = process.argv0;
    this.ModuleName = process.argv[1];

    //the parameters after node filename.js
    if (process.argv.length > 2) {
      if (process.argv.length > 2) {
        this.suppliedParamaters = process.argv.slice(2, process.argv.length);
      }
    }
    //supported paramaters from the children
    for (let i = 0; i < supportedParamaters.length; i++) {
      this.supportedParamaters.push(supportedParamaters[i]);
    }
  }

  checkParams() {
    for (let i = 0; i < this.suppliedParamaters.length; i++) {
      for (let j = 0; j < this.supportedParamaters.length; j++) {
        if(this.suppliedParamaters[i] === this.supportedParamaters[j].Switch){
          console.log("-- " + this.supportedParamaters[j].Message + " --");
          this.supportedParamaters[j].CallBack(this.suppliedParamaters.splice(i+1));
          break;
        }
      }
    }
  }
}

module.exports = CLIApplication;