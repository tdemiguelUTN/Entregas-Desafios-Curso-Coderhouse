import { program } from "commander";

program
  .option("-m, --mode <mode>", "ambiente a ejecutar", "dev")
  .option("-p, --port <port>", "puerto", 8080)
  .option("-d, --debug", "variable para modo debug", false)
  .parse();

// console.log("options", program.opts());      //devuelve las opciones (ya definidas) que mande por argumento
// console.log("others", program.args);         //en este caso, permite recuperar los demas argumentos que NO defini

export default program;