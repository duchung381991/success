myApp.controller('employeeController', function ($scope, $http,$state) {
    $scope.divEmployee = false;
    var getAction = $scope.Action;
    $http.get('/Employee/GetAllEmp')
    .success(function (result) {
        $scope.employees = result;
    })
    .error(function (data) {
        console.log(data);
    });
    /// get edit Employee id 
    $scope.editEmployee = function (employee)
    {
        $http.post('/Employee/GetEmployeeById', {
            EmpId: employee
        })
        .success(function (data) {
            $scope.model = [];
            $scope.model.id = data.id;
            $scope.model.name = data.name;
            $scope.model.address = data.address;
            $scope.model.phone = data.phone;
            $scope.divEmployee = true;
            $scope.Action = "Update";
        })
        .error(function (err) {
            console.log(err);
        })
    }
    //get button add event
    $scope.AddEmployeeDiv = function () {
        $scope.Action = "Add";
        $scope.divEmployee = true;
        $scope.model = [""];
    }
    //process event add/update
    $scope.AddUpdate = function () {
        $scope.getAction = $scope.Action.toString();
        if ($scope.getAction == "Update")
        {
            $scope.edit = [];
            $scope.edit.id = $scope.model.id;
            $scope.edit.name = $scope.model.name;
            $scope.edit.address = $scope.model.address;
            $scope.edit.phone = $scope.model.phone;
            $http.post('/Employee/EditEmployee', {
                id: $scope.edit.id,
                name: $scope.edit.name,
                phone: $scope.edit.phone,
                address: $scope.edit.address
            }).success(function (data) {
                $state.reload();              
            }).error(function (err) {
                console.log(err);
            })
        }
        else 
        {
            $http.post('/Employee/AddEmployee', {
                _addName: $scope.model.name,
                _addAddress: $scope.model.address,
                _addPhone:$scope.model.phone
            })
            .success(function (data) {
                $state.reload();
                Clear();
            })
        }
    }
    //del employee
    $scope.deleteEmployee = function (employee)
    {
        $http.post('/Employee/delEmployee', {

            delEmploy: employee
        })
        .success(function (result) {
            $scope.employees = result;
        })
        .error(function (data) {
            console.log(data);
        });
    }
    $scope.Cancel = function () {
        $scope.divEmployee = false;
        $scope.model = [""];
    }
    function Clear() {
        $scope.model = [""];
    }
});