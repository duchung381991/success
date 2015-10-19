myApp.controller('providerController', function ($scope, $http, $state) {
    $scope.divProvider = false;
    $http.get('/Provider/GetAllProviders')
    .success(function (result) {
        $scope.providers = result;
    })
    .error(function (data) {
        console.log(data);
    });
    //get product by id 
    $scope.editProvider = function (provider) {
        $http.post('/Provider/GetProviderById', {
            EdtProvider: provider
        })
        .success(function (data) {
            $scope.model = [];
            $scope.model.id = data.id;
            $scope.model.name = data.name;
            $scope.model.address = data.address;
            $scope.model.phone = data.phone;
            $scope.divProvider = true;
            $scope.Action = "Update";
        })
    }
    //button add event 
    $scope.AddProviderDiv = function () {
        $scope.divProvider = true;
        $scope.Action = "Add";
        $scope.model = [""];
    }
    //add and update button
    $scope.AddUpdate = function () {
        $scope.Action = $scope.Action.toString();
        if ($scope.Action == "Add") {
            $http.post('/Provider/AddProviders', {
                name: $scope.model.name,
                address: $scope.model.address,
                phone: $scope.model.phone
            })
            .success(function (data) {
                $state.reload();
                Clear();
            })
            .error(function (err) {
                console.log(err);
            })
        }
        else {
            $scope.newPro = [];
            $scope.newPro.id = $scope.model.id;
            $scope.newPro.name = $scope.model.name;
            $scope.newPro.address = $scope.model.address;
            $scope.newPro.phone = $scope.model.phone;
            $http.post('/Provider/EditProvider', {
                _newproId: $scope.newPro.id,
                _newproName: $scope.newPro.name,
                _newproAddress: $scope.newPro.address,
                _newproPhone:$scope.newPro.phone
            })
            .success(function (myobj) {
                $state.reload();
            })
            .error(function (err) {
                console.log(err);
            })
        }
    }
    //button Cancel
    $scope.Cancel = function () {
        $scope.divProvider = false;
        Clear();
    }
    //del Provider
    $scope.deleteProvider = function (provider) {
        $http.post('/Provider/DelProviders', {
            _delpro: provider
        })
        .success(function (result) {
            $scope.providers = result;
        })
        .error(function (error) {
            console.log(error)
        })
    }
    function Clear() {
        $scope.model.name = [""];
        $scope.model.address = [''];
        $scope.model.phone = [''];
    }
});