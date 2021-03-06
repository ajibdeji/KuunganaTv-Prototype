! function() {
    function n(n, e) {
        n.when("/", {
            templateUrl: "home/home.view.html",
            controller: "homeCtrl",
            controllerAs: "vm"
        }).when("/register", {
            templateUrl: "/auth/register/register.view.html",
            controller: "registerCtrl",
            controllerAs: "vm"
        }).when("/login", {
            templateUrl: "/auth/login/login.view.html",
            controller: "loginCtrl",
            controllerAs: "vm"
        }).when("/profile", {
            templateUrl: "/profile/profile.view.html",
            controller: "profileCtrl",
            controllerAs: "vm"
        }).otherwise({
            redirectTo: "/"
        }), e.html5Mode(!0)
    }

    function e(n, e, t) {
        n.$on("$routeChangeStart", function(n, o, r) {
            "/profile" !== e.path() || t.isLoggedIn() || e.path("/")
        })
    }
    angular.module("meanApp", ["ngRoute"]), angular.module("meanApp").config(["$routeProvider", "$locationProvider", n]).run(["$rootScope", "$location", "authentication", e])
}(),
function() {
    function n() {
        console.log("Home controller is running")
    }
    angular.module("meanApp").controller("homeCtrl", n)
}(),
function() {
    function n(n, e) {
        var t = this;
        t.user = {}, e.getProfile().success(function(n) {
            t.user = n
        }).error(function(n) {
            console.log(n)
        })
    }
    angular.module("meanApp").controller("profileCtrl", n), n.$inject = ["$location", "meanData"]
}(),
function() {
    function n(n, e) {
        var t = this;
        t.credentials = {
            email: "",
            password: ""
        }, t.onSubmit = function() {
            e.login(t.credentials).error(function(n) {
                alert(n)
            }).then(function() {
                n.path("profile")
            })
        }
    }
    angular.module("meanApp").controller("loginCtrl", n), n.$inject = ["$location", "authentication"]
}(),
function() {
    function n(n, e) {
        var t = this;
        t.credentials = {
            name: "",
            email: "",
            password: ""
        }, t.onSubmit = function() {
            console.log("Submitting registration"), e.register(t.credentials).error(function(n) {
                alert(n)
            }).then(function() {
                n.path("profile")
            })
        }
    }
    angular.module("meanApp").controller("registerCtrl", n), n.$inject = ["$location", "authentication"]
}(),
function() {
    function n(n, e) {
        var t = function(n) {
                e.localStorage["mean-token"] = n
            },
            o = function() {
                return e.localStorage["mean-token"]
            },
            r = function() {
                var n, t = o();
                return t ? (n = t.split(".")[1], n = e.atob(n), n = JSON.parse(n), n.exp > Date.now() / 1e3) : !1
            },
            i = function() {
                if (r()) {
                    var n = o(),
                        t = n.split(".")[1];
                    return t = e.atob(t), t = JSON.parse(t), {
                        email: t.email,
                        name: t.name
                    }
                }
            };
        return register = function(e) {
            return n.post("/api/register", e).success(function(n) {
                t(n.token)
            })
        }, login = function(e) {
            return n.post("/api/login", e).success(function(n) {
                t(n.token)
            })
        }, logout = function() {
            e.localStorage.removeItem("mean-token")
        }, {
            currentUser: i,
            saveToken: t,
            getToken: o,
            isLoggedIn: r,
            register: register,
            login: login,
            logout: logout
        }
    }
    angular.module("meanApp").service("authentication", n), n.$inject = ["$http", "$window"]
}(),
function() {
    function n(n, e) {
        var t = function() {
            return n.get("/api/profile", {
                headers: {
                    Authorization: "Bearer " + e.getToken()
                }
            })
        };
        return {
            getProfile: t
        }
    }
    angular.module("meanApp").service("meanData", n), n.$inject = ["$http", "authentication"]
}(),
function() {
    function n(n, e) {
        var t = this;
        t.isLoggedIn = e.isLoggedIn(), t.currentUser = e.currentUser()
    }
    angular.module("meanApp").controller("navigationCtrl", n), n.$inject = ["$location", "authentication"]
}(),
function() {
    function n() {
        return {
            restrict: "EA",
            templateUrl: "/common/directives/navigation/navigation.template.html",
            controller: "navigationCtrl as navvm"
        }
    }
    angular.module("meanApp").directive("navigation", n)
}();
//# sourceMappingURL=app.min.js.map