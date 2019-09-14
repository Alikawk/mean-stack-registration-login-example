(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.newQuestion = "";
        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;
        vm.addQuestion = addQuestion;
        vm.updateVector = updateVector;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveQuestion() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('Saved');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
        
        function deleteQuestion(index) {
            vm.user.questions.splice(index, 1);
        }
        
        function addQuestion() {
            vm.user.questions.push(vm.newQuestion);
            vm.newQuestion = "";
        }
        
        function updateVector(index, value) {
            vm.user.questions[index] = value;
        }
    }

})();
