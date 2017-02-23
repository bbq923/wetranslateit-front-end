export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('auth', {
      url: '/auth',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .state('translation', {
      url: '/translation',
      templateUrl: 'app/translation/translation.html',
      controller: 'TranslationController',
      controllerAs: 'translation'
    })

  $urlRouterProvider.otherwise('/');
}
