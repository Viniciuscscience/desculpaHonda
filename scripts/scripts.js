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
}]), angular.module("yapp").controller("LoginCtrl", ["$scope", "$location","$http", "$rootScope", function(r, t, h, $rootScope) {
    r.log = {
        email:"",
        password:"",
        name:"",
        type:1,
        action: "login"
    }
    r.registered = false;
    r.register = false;
    r.showRegister = function(){
        r.register = !r.register;
    }
    r.doRegister = function(){
        h.post("http://104.236.69.230/server.php/users",r.log).then(function(res){
            r.registered = true;
            return t.path("/dashboard"), !1
            console.log(res);
        },function(){
            console.log("muita treta");
            r.registered = false;
        });
    }



    r.submit = function() {
        h.post("http://104.236.69.230/server.php/users",r.log).then(function(res){
            if(res.data.length > 0){
                $rootScope.user = res.data[0];
                return t.path("/dashboard"), !1
            }
        },function(lala){
            alert("Login Incorreto");
        });

    }
}]), angular.module("yapp").controller("DashboardCtrl", ["$scope", "$state", function(r, t) {
    r.$state = t
}]);