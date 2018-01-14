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
        reg:""
    }

    r.doRegister = function(){
        h.post("http://104.236.69.230/api.php/users",r.log).then(function(res){
            console.log(res);
        });
    }

    r.submit = function() {
        return t.path("/dashboard"), !1
    }
}]), angular.module("yapp").controller("DashboardCtrl", ["$scope", "$state", function(r, t) {
    r.$state = t
}]);