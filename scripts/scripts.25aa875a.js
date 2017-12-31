"use strict";angular.module("emptyChairWidgetApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","nvd3"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("emptyChairWidgetApp").controller("MainCtrl",["$scope",function(a){function b(){for(var a=[],b=[],c=[],d=0;d<100;d++)a.push({x:d,y:Math.sin(d/10)}),b.push({x:d,y:d%10==5?null:.25*Math.sin(d/10)+.5}),c.push({x:d,y:.5*Math.cos(d/10+2)+Math.random()/10});return[{values:a,key:"Sine Wave",color:"#ff7f0e",strokeWidth:2,classed:"dashed"},{values:c,key:"Cosine Wave",color:"#2ca02c"},{values:b,key:"Another sine wave",color:"#7777ff",area:!0}]}this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.options={chart:{type:"lineChart",height:200,margin:{top:20,right:20,bottom:40,left:55},x:function(a){return a.x},y:function(a){return a.y},useInteractiveGuideline:!0,dispatch:{stateChange:function(a){console.log("stateChange")},changeState:function(a){console.log("changeState")},tooltipShow:function(a){console.log("tooltipShow")},tooltipHide:function(a){console.log("tooltipHide")}},xAxis:{axisLabel:"Time (ms)"},yAxis:{axisLabel:"Voltage (v)",tickFormat:function(a){return d3.format(".02f")(a)},axisLabelDistance:-10},callback:function(a){console.log("!!! lineChart callback !!!")}},title:{enable:!0,text:"Una gráfica ahí"},subtitle:{enable:!0,text:"Subtitle for simple line chart. Ay lorem lorem, lorem ipsum, lorem lorem, hasta cuando (8)",css:{"text-align":"center",margin:"10px 13px 0px 7px"}},caption:{enable:!0,html:"<b>Figure 1.</b> Gráfica sideral intergaláctika.",css:{"text-align":"justify",margin:"10px 13px 0px 7px"}}},a.data=b()}]),angular.module("emptyChairWidgetApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("emptyChairWidgetApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'\x3c!-- <div class="jumbotron">\n  <h1>\'Allo, \'Allo!</h1>\n  <p class="lead">\n    <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br>\n    Always a pleasure scaffolding your apps.\n  </p>\n  <p><a class="btn btn-lg btn-success" ng-href="#!/about">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p>\n</div> --\x3e <div class="row marketing"> <h1>Explore su Status</h1> <p> Esto es un widget. </p> <div class="container"> <div class="row"> <nvd3 options="options" data="data" class="with-3d-shadow with-transitions"></nvd3> </div> </div></div>')}]);