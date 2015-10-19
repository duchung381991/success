var myApp = angular.module('myApp', ['ui.router', 'ngMessages', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('index', {

        url: "/",
        template: ''

    })
    .state('employee', {

        url: '/employee',
        templateUrl: '/AngularJs/view/employee/employee.html'

    })
    .state('customer', {
        url: "/customer",
        templateUrl: "/AngularJs/view/customer/customer.html"

    })
    .state('provider', {
        url: '/provider',
        templateUrl: '/AngularJs/view/provider/provider.html'

    })
    .state('thu', {
        url: '/list-thu',
        templateUrl: '/AngularJs/view/thu/thu.html'


    })
    .state('chi', {
        url: '/list-chi',
        templateUrl: '/AngularJs/view/chi/chi.html'

    })
    .state('about', {

        url: '/about',
        templateUrl: '/AngularJs/view/about.html'


    })
});
