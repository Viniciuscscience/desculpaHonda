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
            }else{
                alert("Login Incorreto");
            }
        },function(lala){
            alert("Login Incorreto");
        });

    }
}]), angular.module("yapp").controller("DashboardCtrl", ["$scope", "$state", "$http", "$rootScope", function(r, t, $http,$rootScope) {

    r.doApo = false;
    r.apo = {
        title:"",
        text:"",
        student:$rootScope.user.id,
        professor:5,
        status:1
    }
    $http.get("http://104.236.69.230/server.php/desculpas/"+$rootScope.user.id).then(function(res){
        r.allMyReports = res.data;
        r.allMyReports.forEach(function(p,ind){
            if(p.status == 1){
                $http.get("http://104.236.69.230/server.php/users/"+p.student).then(function(resS){
                    p.student = resS.data.name;
                });
            }
        });
    });



    r.changeStatus = function(n,report){
        console.log("entrou");
       report.status = n;
        $http.put("http://104.236.69.230/server.php/desculpas/"+report.id,{status: n}).then(function(res){
            console.log(res);
        });
    }


    r.setDoApo = function(){
        r.doApo = !r.doApo;
    }
    r.submit = function(){
        $http.post("http://104.236.69.230/server.php/desculpas",r.apo).then(function(res){
            console.log(res);
            $http.get("http://104.236.69.230/server.php/desculpas/"+$rootScope.user.id).then(function(res){
                r.allMyReports = res.data;
                r.allMyReports.forEach(function(p,ind){
                    if(p.status == 1){
                        $http.get("http://104.236.69.230/server.php/users/"+p.student).then(function(resS){
                            p.student = resS.data.name;
                        });
                    }
                });
            });
        });
        r.doApo = false;
    }
    r.statusFilter = 1;
    r.setStatusFilter = function(n){
        r.statusFilter = n;
    }
    r.$state = t
}]);