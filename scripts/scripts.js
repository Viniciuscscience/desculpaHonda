"use strict";
angular.module("yapp", ["ui.router", "ngAnimate"]).config(["$stateProvider", "$urlRouterProvider", function(r, t) {
    t.when("/dashboard", "/dashboard/overview"), t.otherwise("/login"), r.state("base", {
        "abstract": !0,
        url: "",
        templateUrl: "views/base.html"
    }).state("login", {
        url: "/login",
        parent: "base",
        templateUrl: "views/login.html",
        controller: "LoginCtrl"
    }).state("dashboard", {
        url: "/dashboard",
        parent: "base",
        templateUrl: "views/dashboard.html",
        controller: "DashboardCtrl"
    }).state("overview", {
        url: "/overview",
        parent: "dashboard",
        templateUrl: "views/dashboard/overview.html"
    }).state("reports", {
        url: "/reports",
        parent: "dashboard",
        templateUrl: "views/dashboard/reports.html"
    })
}]), angular.module("yapp").controller("LoginCtrl", ["$scope", "$location","$http", function(r, t, h) {
    r.log = {
        email:"",
        password:"",
        reg:"",
        type:"1"
    }
    r.registered = false;
    r.register = false;
    r.showRegister = function(){
        r.register = !r.register;
    }
    r.doRegister = function(){
        h.post("http://104.236.69.230/api_server.php/users",r.log).then(function(res){
            r.registered = true;
            return t.path("/dashboard"), !1
            console.log(res);
        },function(){
            console.log("muita treta");
            r.registered = false;
        });
    }



    r.submit = function() {
        return t.path("/dashboard"), !1
    }
}]), angular.module("yapp").controller("DashboardCtrl", ["$scope", "$state", function(r, t) {
    r.$state = t
}]);