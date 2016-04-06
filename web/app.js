var app = angular.module('examApp', []);
app.service("dataModel", function ()
{
    this.getStudents = function ()
    {
        this.studentsInfo = {};
        this.studentsInfo.allCourses = [
            {courseId: 1000, courseName: "Basic Programming"},
            {courseId: 1001, courseName: "Advanced Programming"},
            {courseId: 1003, courseName: "DataBase Intro"}];
        this.studentsInfo.students = [];
        this.studentsInfo.students.push({studentId: 100, name: "Peter Hansen", grades: [{grade: "10"}, {grade: "12"}, {}]});
        this.studentsInfo.students.push({studentId: 101, name: "Jan Olsen", grades: [{grade: "7"}, {grade: "10"}, {}]});
        this.studentsInfo.students.push({studentId: 102, name: "Gitte Poulsen", grades: [{grade: "7"}, {grade: "7"}, {}]});
        this.studentsInfo.students.push({studentId: 103, name: "John McDonald", grades: [{grade: "10"}, {}, {grade: "7"}]});
        console.log("asdf " + this.studentsInfo);
        return this.studentsInfo;
    };
});

app.controller('ExamController', ['$scope', "dataModel", function ($scope, dataModel, $http)
    {

//REST eksempel///
        $http.get("/api/llama/john").then(function(response)
        {
            $scope.data = response.data;
            //Nedenstående variabel burden indeholde data!
            $scope.doneData = JSON.parse($scope.data);
        });
        
///////////////////////////
        
        $scope.studentsInfo = {};
        $scope.studentsInfo = dataModel.getStudents();
        
//        $scope.studentsInfo.allCourses = [
//            {courseId: 1000, courseName: "Basic Programming"},
//            {courseId: 1001, courseName: "Advanced Programming"},
//            {courseId: 1003, courseName: "DataBase Intro"}];
//        $scope.studentsInfo.students = [];
//        $scope.studentsInfo.students.push({studentId: 100, name: "Peter Hansen", grades: [{grade: "10"}, {grade: "12"}, {}]});
//        $scope.studentsInfo.students.push({studentId: 101, name: "Jan Olsen", grades: [{grade: "7"}, {grade: "10"}, {}]});
//        $scope.studentsInfo.students.push({studentId: 102, name: "Gitte Poulsen", grades: [{grade: "7"}, {grade: "7"}, {}]});
//        $scope.studentsInfo.students.push({studentId: 103, name: "John McDonald", grades: [{grade: "10"}, {}, {grade: "7"}]});

    }]);



app.filter("averageFilter", function ()
{
    return function (x)
    {
        var llama = 0;
        for (var i = 0; i < x.grades.length; i++)
        {
            if (parseInt(x.grades[i].grade) > 0)
            {
                console.log("asdf " + parseInt(x.grades[i].grade));
                llama += parseInt(x.grades[i].grade);
            } else
            {
                console.log("abe");
            }
        }
        return llama / 2;
    };

});
app.directive("studentGrades", function ()
{
    var john = {
        replace: "true",
        templateUrl: "tableEx.html"
    };
    return john;

});

//  "<div id="'tabel'" ng-controller="'ExamController as ctrl'"><table class="'table table-striped'" style="'width: 80%'"><tr><th>Name</th><th>Basic Programming</th><th>Advanced Programming</th><th>DataBase Intro</th><th>Average</th></tr><tr ng-repeat="'x in studentsInfo.students'"> <td>{{x.name}}</td><td>{{x.grades[0].grade}}</td><td>{{x.grades[1].grade}}</td><td>{{x.grades[2].grade}}</td><td>{{x | averageFilter}}</td></tr></table></div>"