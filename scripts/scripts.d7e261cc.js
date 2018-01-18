"use strict";angular.module("emptyChairWidgetApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","nvd3","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/actionbtn",{templateUrl:"views/actionbtn.html",controller:"ActionbtnCtrl",controllerAs:"actionbtn"}).when("/widgets/vargas-lleras-discurso",{templateUrl:"views/wg-vargas-lleras-discurso.html",controller:"WgVargasLlerasDiscursoCtrl",controllerAs:"wgVargasLlerasDiscurso",resolve:{data:["jsonGetter",function(a){return a.get("data/vargas-lleras-words")}],options:["jsonGetter",function(a){return a.get("options/vargas-lleras-words.conf")}]}}).otherwise({redirectTo:"/"})}]),angular.module("emptyChairWidgetApp").controller("MainCtrl",["$scope",function(a){function b(){for(var a=[],b=[],c=[],d=0;d<100;d++)a.push({x:d,y:Math.sin(d/10)}),b.push({x:d,y:d%10==5?null:.25*Math.sin(d/10)+.5}),c.push({x:d,y:.5*Math.cos(d/10+2)+Math.random()/5});return[{values:a,key:"Sine Wave",color:"#ff7f0e",strokeWidth:2,classed:"dashed"},{values:c,key:"Cosine Wave",color:"#2ca02c"},{values:b,key:"Another sine wave",color:"#7777ff",area:!0}]}this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.options={chart:{type:"lineChart",height:200,margin:{top:20,right:20,bottom:40,left:55},x:function(a){return a.x},y:function(a){return a.y},useInteractiveGuideline:!0,dispatch:{stateChange:function(a){console.log("stateChange")},changeState:function(a){console.log("changeState")},tooltipShow:function(a){console.log("tooltipShow")},tooltipHide:function(a){console.log("tooltipHide")}},xAxis:{axisLabel:"Time (ms)"},yAxis:{axisLabel:"Voltage (v)",tickFormat:function(a){return d3.format(".02f")(a)},axisLabelDistance:-10},callback:function(a){console.log("!!! lineChart callback !!!")}},title:{enable:!0,text:"Una gráfica ahí"},subtitle:{enable:!0,text:"Subtitle for simple line chart. Ay lorem lorem, lorem ipsum, lorem lorem, hasta cuando (8)",css:{"text-align":"center",margin:"10px 13px 0px 7px"}},caption:{enable:!0,html:"<b>Figure 1.</b> Gráfica sideral intergaláctika.",css:{"text-align":"justify",margin:"10px 13px 0px 7px"}}};var c={data:b};a.data=c.data}]),angular.module("emptyChairWidgetApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("emptyChairWidgetApp").controller("ActionbtnCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("emptyChairWidgetApp").controller("WgVargasLlerasDiscursoCtrl",["$scope","$http","$window","timeSeriesParser","data","options",function(a,b,c,d,e,f){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var g=d.getDates(e,"dates"),h={};Object.keys(e.words).forEach(function(a){var b=e.words[a].norm1;h[a]={values:b.map(function(a,b){return{x:g[b],y:a}}),key:a}}),a.data=e,a.words=Object.keys(e.words).sort().map(function(a,b){return{word:a}});var i=a.words.map(function(a){return a}).sort(function(a,b){return e.words[b.word].score-e.words[a.word].score});a.selectedWords=i.slice(0,3),a.d3data=[],a.$watchCollection("selectedWords",function(){a.d3data=a.selectedWords.map(function(a){return h[a.word]}),a.options.chart.height=a.options.chart.height}),a.options=f,a.options.chart.xAxis.tickFormat=function(a){return d3.time.format("%Y-%m-%d")(new Date(a))},a.options.chart.yAxis.tickFormat=function(a){return Math.round(100*a)/100},a.options.chart.lines={dispatch:{elementClick:function(b){var c=b[0].pointIndex,d=a.words.map(function(a){return a}).sort(function(a,b){return e.words[b.word].norm1[c]-e.words[a.word].norm1[c]}).slice(0,3);a.selectedWords=d,a.$digest()}}}}]),angular.module("emptyChairWidgetApp").directive("multiwordSelect",function(){function a(a,b){function c(b){var c=d(a.selectedWords,b);-1==c?h(b):a.selectedWords.splice(c,1)}function d(a,b){var c=b.word;return a.map(g).indexOf(c)}function e(a,b,c){return c.indexOf(a)===b}function f(a){return a.category}function g(a){return a.word}function h(b){!a.selectLimit||a.selectedWords.length<parseInt(a.selectLimit)?a.selectedWords.push(b):i()}function i(){0==a.alerts.length&&a.alerts.push({msg:a.limitReachedMsg})}a.alerts=[],a.categories=a.words.map(f).filter(e),a.isCategorized=-1==a.categories.indexOf(void 0),a.closeAlert=function(b){a.alerts.splice(b,1)},a.toggleWord=function(b){-1!=d(a.words,b)&&c(b)},a.isSelected=function(b){return d(a.selectedWords,b)>-1}}return{templateUrl:"templates/directives/multiword-select.html",restrict:"E",scope:{words:"<",selectedWords:"=",selectLimit:"<",limitReachedMsg:"@"},link:a}}),angular.module("emptyChairWidgetApp").service("jsonGetter",["$http",function(a){this.get=function(b){return a({method:"GET",url:"files/"+b+".json"}).then(function(a){return a.data})}}]),angular.module("emptyChairWidgetApp").service("timeSeriesParser",function(){this.getDateValueTuples=function(a,b,c,d,e){var f=a[c][d][e],g=this.getDates(a,b);return f.map(function(a,b){return{x:g[b],y:a}})},this.getDates=function(a,b){return a.dates.map(function(a){return new Date(a)})},this.getNames=function(a,b){return Object.keys(a[b])}}),angular.module("emptyChairWidgetApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/actionbtn.html",'<div class="row"> <div class="widget-action-button"> <div class="widget-action-button-content"> <h1>Ciencia y visión</h1> <p>Juegue con una herramienta que le permitirá comprender el panorama político del país</p> <img id="action-button-animated-logo" src="images/weblogo.148bb8a3.gif" alt="I\'m Yeoman"> <button> <span>Explore <i>Status</i></span> </button> <p>Un desarrollo de <span> <img id="action-button-text-logo" src="images/logos/wjlogo-small.d33ca671.png" alt="I\'m Yeoman"> </span> </p> </div> </div> <div></div></div>'),a.put("views/main.html",'\x3c!-- <div class="jumbotron">\n  <h1>\'Allo, \'Allo!</h1>\n  <p class="lead">\n    <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br>\n    Always a pleasure scaffolding your apps.\n  </p>\n  <p><a class="btn btn-lg btn-success" ng-href="#!/about">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p>\n</div> --\x3e <div class="row"> <div class="container-fluid widget-container"> <h1>Título</h1> <p> Instrucciones </p> <div class="row"> <div class="col-sm-6"> <nvd3 options="options" data="data" class="with-3d-shadow with-transitions"></nvd3> </div> <div class="col-sm-6"> <nvd3 options="options" data="data" class="with-3d-shadow with-transitions"></nvd3> </div> </div> <div class="row"> t> <nvd3 options="options" data="data" class="with-3d-shadow with-transitions"></nvd3> </div> </div></div>'),a.put("views/wg-vargas-lleras-discurso.html",'<div class="row"> <div class="container-fluid widget-container"> <h1>¿Cómo se ha transformado el discurso de Vargas Lleras?</h1> <p> Seleccione hasta 5 términos y estudie su evolución en el tiempo. </p> \x3c!--     <div class="visible-sm visible-xs">\n      <uib-accordion>\n        <div uib-accordion-group\n             class="panel-default"\n             is-open="status.open"  >\n        <uib-accordion-heading>\n            seleccione los términos aquí \n            <i class="pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': status.open, \'glyphicon-chevron-right\': !status.open}"></i>\n        </uib-accordion-heading>\n        <multiword-select words=words\n                          selected-words = selectedWords\n                          select-limit = 5\n                          limit-reached-msg="Solo puede seleccionar hasta cinco palabras a la vez">\n        </multiword-select>\n        </div>\n      </uib-accordion>      \n      </div> --\x3e \x3c!-- <pre>{{words2| json : 4}}</pre> --\x3e <nvd3 options="options" data="d3data"></nvd3> <multiword-select words="words" selected-words="selectedWords" select-limit="7" limit-reached-msg="Solo puede seleccionar hasta siete palabras a la vez" class=""> </multiword-select></div> </div> ')}]);