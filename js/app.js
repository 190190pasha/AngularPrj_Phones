
	(function() {
			
			var app = angular.module('PhoneStorage', []);
			
			app.controller('PhoneList', [ '$http', function($http) {
					
					var store = this;
					
					store.phones = [];
					
					$http.get('data/phones.json').success(function(data){
							
							store.phones = data;
							
							countStars();
							
						}).error(function(e){
								
								alert(e);
								
							});
					
					this.countStars = function() {
					
							for(var i = 0; i < store.phones.length; i++)
							{
								var j,
									_stars = 0;
								
								for(j = 0; j < store.phones.reviews.list.length; j++)
								{
									_stars += store.phones.reviews.list[j].stars;
								}
								
								store.phones[i].stars = _stars / j;
							}
						};
					
					this.addReviewForPhone = function(idPhone, review) {
							
							for(var i = 0; i < store.phones.length; i++)
							{
								if (store.phones[i].id == idPhone)
								{
									var _phone = store.phones[i];
									
									$http({
											method: "post",
											url: "addReview.php",
											headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
											data: {
												id: idPhone,
												rev: review
											}
										}).success(function(data){
												
												_phone.reviews.list.push(angular.copy(review));
												
												review.author = '';
												review.message = '';
												
											}).error(function(err){
											
													alert(err);
													
												});
									
									return true;
								}
							}
							
						};
					
				} ]);
			
			app.controller('ReviewController', [ '$scope', function($scope) {
					this.author = '';
					this.stars = 3;
					this.message = '';
					
					$scope.getNumber = function(num) {
							return new Array(num);
						};
				} ]);
			
		})();