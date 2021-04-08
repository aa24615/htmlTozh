

const setArgv = (argv)=>{
  this.argv = argv;
};
const getInputPath = ()=>{

};

const getOutPath = ()=>{
  console.log(this.argv);
};


const getConfigPath = ()=>{
  this.argv.forEach((v, k)=>{
    if (v.indexOf('--config')>=0) {
      this.argv.splice(k, 1);
    }
  });
};


module.exports = {
  setArgv: setArgv,
  getInputPath: getInputPath,
  getOutPath: getOutPath,
  getConfigPath: getConfigPath,

};
