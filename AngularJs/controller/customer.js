myApp.controller('customerController', function ($scope, $http, $state) {
    var getAction = $scope.Action;
    $http.get('/Customer/GetAllCustomer')
    .success(function (result) {
        $scope.customers = result;
    })
    .error(function (data) {
        console.log(data)
    });

    //del customer
    $scope.deleteCustomer = function (customer) {

        $http.post('/Customer/DelCustomer', {

            _delCustomer: customer
        })

        .success(function (result) {

           
            $scope.customers = result;
        })
        .error(function (data) {

            console.log(data);
        });
    }

    //edit customer
    $scope.editCustomer = function (customer) {
        $http.post('/Customer/GetCustomerById', {
            ctmId: customer
        })
        .success(function (data) {
            $scope.model = [];
            $scope.model.id = data.id;
            $scope.model.name = data.name;
            $scope.model.address = data.address;
            $scope.model.phone = data.phone;
            $scope.Action = "Update";
            $scope.divCustomer = true;
            //tim va truyen doi tuong duoc chon xuong div ben duoi
        })
        .error(function (eror) {
            console.log(eror);
        });

    };
    $scope.AddCustomerDiv = function () {
        $scope.model = [];
        $scope.Action = "Add";
        $scope.divCustomer = true;
    }
    $scope.Cancel = function () {

        $scope.divCustomer = false;
        $scope.model = [""];
    };
    //add and update
    $scope.AddUpdate = function () {
        $scope.Action = $scope.Action.toString();
        if ($scope.Action == "Update")
        {
            $scope.edit = [];
            $scope.edit.id = $scope.model.id,
            $scope.edit.name = $scope.model.name,
            $scope.edit.address = $scope.model.address,
            $scope.edit.phone = $scope.model.phone
            $http.post('/Customer/EditCustomer', {
                _editID : $scope.edit.id,
                _editName : $scope.edit.name,
                _editAddress : $scope.edit.address,
                _editPhone : $scope.edit.phone
            })
            .success(function (myCustomer) {
                $state.reload()
                            })
            .error(function (reror) {
                console.log(reror);
            })
        }
        else 
        {
            $http.post('/Customer/AddCustomer', {
                _addname: $scope.model.name,
                _addaddress: $scope.model.address,
                _addphone: $scope.model.phone
            })
            .success(function (result) {
                $scope.model = [];
                $scope.customers = result;
            })
            .error(function (err) {

                console.log(err);
            });
        }
    };
});