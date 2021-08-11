let CLIApplication = require("./CLIApplication");

let CatCLI = new CLIApplication("CatCLI", require("process"), [
  {
    Switch: "--help",
    Message: "Shows Suported Params",
    CallBack: () => {
      const fs = require("fs");
      try {
        const data = fs.readFileSync("help.txt", "utf8");
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    },
  },
  {
    Switch: "--createFile",
    Message: "Create new file",
    CallBack: (data) => {
      const fs = require("fs");
      let newFile = data[0];
      fs.writeFile(newFile, '', (err) => {
        if (err) {
          console.error("Couldn't create file. " + err);
        } else {
          console.log("File was updated.");
        }
      });
    },
  },
  {
    Switch: "--writeFile",
    Message: "Write to the file",
    CallBack: (data) => {
      const fs = require("fs");
      let file = data[0];
      let text = data[1] ? data[1] : "";
      fs.writeFile(file, text, (err) => {
        if (err) {
          console.error("Couldn't add text to the file. " + err);
        } else {
          console.log("Text was added to the file.");
        }
      });
    },
  },
  {
    Switch: "--appendFile",
    Message: "Append to the file",
    CallBack: (data) => {
      const fs = require("fs");
      let file = data[0];
      let text = data[1] ? data[1] : "";

      fs.appendFile(file, text, (err) => {
        if (err) {
          console.error("Couldn't append text to the file. " + err);
        } else {
          console.log("File was updated.");
        }
      });
    },
  },
  {
    Switch: "--renameFile",
    Message: "Rename File",
    CallBack: (data) => {
      const fs = require("fs");
      console.log(rename)
    },
  },
  {
    Switch: "--deleteFile",
    Message: "Delete File",
    CallBack: (data) => {
      const fs = require("fs");
      let file = data[0];

      fs.unlink(file, (err) => {
        if (err) {
          console.error("Couldn't delete the file." + err);
        } else {
          console.log("File was deleted.");
        }
      });
    },
  },
  {
    Switch: "--listFiles",
    Message: "List Files",
    CallBack: (data) => {
      const fs = require("fs");
      const path = require("path");

      const directory = data[0];
      try {
        process.chdir(directory);
      } catch (err) {
        console.error(`Couldn't find the directory. ${err}`);
      }
      fs.readdir(process.cwd(), (err, files) => {
        if (err) {
          console.error(err);
        } else {
          let filesString = "";
          files.forEach((file) => {
            filesString = filesString + file + "\t";
          });
          console.log(filesString);
        }
      });
    },
  },
  {
    Switch: "--copyFile",
    Message: "Copy File",
    CallBack: (data) => {
      const fs = require("fs");
      const source = data[0];
      const copy = data[1]
        ? data[1]
        : source.split(".")[0] + "_copy." + source.split(".")[1];
      fs.copyFile(source, copy, (err) => {
        if (err) {
          console.log("Couldn't copy the file." + err);
        } else {
          console.error("File was copied.");
        }
      });
    },
  },
  {
    Switch: "--moveFile",
    Message: "Move File",
    CallBack: (data) => {
      const fs = require("fs");
      const oldPath = data[0];
      const newPath = data[1];
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.log("Couldn't move the file." + err);
        } else {
          console.error("File was moved.");
        }
      });
    },
  },
  {
    Switch: "--size",
    Message: "File Size",
    CallBack: (data) => {
        const fs = require("fs");
        const file = data[0];
        const fileInfo = fs.statSync(file);
        console.log(file + '\t' + fileInfo.size + " bytes");
    },
  },
  {
    Switch: "--viewFile",
    Message: "View File",
    CallBack: (data) => {
        const fs = require("fs");
        // const readline = require('readline');
        // let countLines = 0;
        const file = data[0];
        const pause = data[1] === "--pause" ? true : false;
        const lineToPause = data[2] ? data[2] : null;

        if(!pause){
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                  console.error("Couldn't read file. " + err);
                } else {
                  console.log(data);
                }
              });
        }else{
            const lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/);
            for(let i = 0; i < lines.length; i++){
                console.log(i)
                if(i === parseInt(lineToPause)){
                    console.log("PAUSE")
                    setTimeout(()=>{console.log("RESUME")}, 10000); // wait for 10seconds
                }else{
                    console.log(lines[i]);
                }
            }
        }


        // const readLine = readline.createInterface({
        //     input: fs.createReadStream(file),
        //     output: process.stdout,
        //     terminal: false
        // });

        // readLine.on('line', (line) => {
        //     countLines++;
        //     console.log(line);
        //     // console.log(countLines);
        //     if (lineToPause && countLines === parseInt(lineToPause)) {
        //       console.log("Pausing stream");
        //       readLine.pause();
        //     }
        //   })
        //   .on('pause', ()=>{
        //     setTimeout(()=>{readLine.resume();}, 10000);
        //     countLines=0;
        //   })
      },
  },
]);


CatCLI.checkParams();
