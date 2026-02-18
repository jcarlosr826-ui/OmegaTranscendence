const proxies = ["proxy1","proxy2"];

exports.autoBuy = ()=>{
 let proxy = proxies[Math.floor(Math.random()*proxies.length)];
 console.log("Buying using proxy:", proxy);
};
