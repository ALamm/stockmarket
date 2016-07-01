/**
 * tc-angular-chartjs - v2.0.0 - 2016-05-28
 * Copyright (c) 2016 Carl Craig <carlcraig.threeceestudios@gmail.com>
 * Dual licensed with the Apache-2.0 or MIT license.
 */
!function(){"use strict";function a(a){return new a}function b(a){return new a("line")}function c(a){return new a("bar")}function d(a){return new a("radar")}function e(a){return new a("polararea")}function f(a){return new a("pie")}function g(a){return new a("doughnut")}function h(){return function(a){function b(b,d,e){var f,g=d[0].getContext("2d"),h=!1,i=!1,j=!1,k=null;for(var l in e)"chartLegend"===l?h=!0:"chart"===l?j=!0:"autoLegend"===l&&(i=!0);b.$on("$destroy",function(){f&&"function"==typeof f.destroy&&f.destroy()}),b.click&&(d[0].onclick=function(a){var c={chartEvent:event,element:f.getElementAtEvent(a),elements:f.getElementsAtEvent(a),dataset:f.getDatasetAtEvent(a)};b.click({event:c})}),b.$watch("data",function(e){if(e){f&&"function"==typeof f.destroy&&f.destroy();var l=a||b.type;if(!l)throw"Error creating chart: Chart type required.";l=c(l),f=new Chart(g,{type:l,data:angular.copy(b.data),options:b.options}),h&&(b.legend=f.generateLegend()),i&&(k&&k.remove(),angular.element(d[0]).after(f.generateLegend()),k=angular.element(d[0]).next()),j&&(b.chart=f),f.resize()}},!0)}function c(a){var b=a.toLowerCase();switch(b){case"polararea":return"polarArea";default:return a}}return{restrict:"A",scope:{data:"=chartData",options:"=chartOptions",type:"@chartType",legend:"=?chartLegend",chart:"=?chart",click:"&chartClick"},link:b}}}function i(){function a(a,b){a.$watch("legend",function(a){a&&b.html(a)},!0)}return{restrict:"A",scope:{legend:"=?chartLegend"},link:a}}angular.module("tc.chartjs",[]).directive("tcChartjs",a).directive("tcChartjsLine",b).directive("tcChartjsBar",c).directive("tcChartjsRadar",d).directive("tcChartjsPolararea",e).directive("tcChartjsPie",f).directive("tcChartjsDoughnut",g).directive("tcChartjsLegend",i).factory("TcChartjsFactory",h),a.$inject=["TcChartjsFactory"],b.$inject=["TcChartjsFactory"],c.$inject=["TcChartjsFactory"],d.$inject=["TcChartjsFactory"],e.$inject=["TcChartjsFactory"],f.$inject=["TcChartjsFactory"],g.$inject=["TcChartjsFactory"]}();