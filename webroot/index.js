var app = angular.module('news', ['ui.router', 'ngAnimate']);
// 配置路由
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('news', {
        url: '/news',
        views: {
            'top@': {
                templateUrl: 'views/weuiTab.html',
            },
            'content@': {
                templateUrl: 'views/indexA.html'

            }
        }
    }).state('news.content', {
        url: '/:tabid',
        views: {
            'content@': {
                templateUrl: function(param) {
                    if (param.tabid) {
                        return 'views/' + param.tabid + '.html'
                    } else {
                        return 'views/indexA.html'
                    }
                }
            }
        }
    }).state('news.content.detail', {
        url: '/detail/:id',
        views: {
            'content@': {
                templateUrl: 'views/detail.html',
                controller: 'detailCtrl'

            }
        }
    });
    $urlRouterProvider.otherwise('/news');
})
app.controller('indexACtrl', function($scope, $http, $rootScope) {
    $scope.loading = true;
    $rootScope.tab = 1;
    //默认第一页
    $scope.offset = 1;
    //定义一个空数组存放的是列表显示的新闻
    $scope.arrs = [];
    // 监控rootscope的属性
 /*   $scope.$watch(function() {
        return $rootScope.searchInput;
    }, function() {
        $scope.searchInput = $rootScope.searchInput;
    }, true);*/
    var getNews = function() {
            $http.jsonp('https://wscats.github.io/angular-demo/spa/news/script/callback.js', {
                params: {
                    callback: 'JSON_CALLBACK',
                    page: $scope.offset
                }
            }).success(function(data) {
                $scope.loading = false;
                console.log(data);
                //每次我们加载下一页的数据的时候我们就往arrs合并
                $scope.arrs = $scope.arrs.concat(data.showapi_res_body.pagebean.contentlist);
                $scope.news = $scope.arrs;
            })
        }
        //进来的时候先加载数据一次
    getNews();
    $scope.loadMore = function() {
        //每点击加载更多前，出现loading
        $scope.loading = true;
        //每点击一次的时候，请求下一页
        $scope.offset++;
        console.log("加载更多");
        getNews();
    }
})
app.controller('indexBCtrl', function($scope, $rootScope) {
    $rootScope.tab = 2;
})


//$state获取路由上面的哈希值
app.controller('detailCtrl', function($scope, $state, $http) {
    //$state获取url上的哈希值 $routeParams
    console.log($state.params.id)
        // http://localhost:12345/newsApi
    $http.jsonp('https://wscats.github.io/angular-demo/spa/news/script/callback.js', {
        params: {
            callback: 'JSON_CALLBACK',
            page: 1
        }
    }).success(function(data) {
        console.log(data.showapi_res_body.pagebean.contentlist[$state.params.id])
        $scope.new = data.showapi_res_body.pagebean.contentlist[$state.params.id];
    })
})
