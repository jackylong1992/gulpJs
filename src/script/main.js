console.log("hello from main");
console.log("not sure this has source map or not");
// this time I use uglify
var long_varialbename = "jacky";
console.log(long_varialbename);

function jacky () {
    var local_var = 1;
    local_var++;
    console.log(local_var);
}