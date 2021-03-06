angular.module("savedArticles", []).component("savedArticles", {
	templateUrl: "saved/saved.template.html",
	controller: function SavedArticlesController($http){
		console.log("saved component");
		this.saved = [];

		$http.get("/api/saved").then( data => {
			this.saved = data.data;
			console.log(data.data);
		});

		this.saveComment = function(articleId, commentText){
			if(!commentText){ return }
			$http({
				url: `/api/comment/${articleId}`,
				method: 'POST',
				data: {
					text: commentText
				}
			}).then( data => {
				// push results to array of comments
				// and clear out form
				const articleUpdate = this.saved.filter(article => article._id === data.data._id)[0];
				const comment = {
					text: commentText,
					_id: data.data.comments[data.data.comments.length-1]
				};
				articleUpdate.comments.push(comment);
				articleUpdate.newComment = "";
			});
		}

		this.updateComment = function(commentId, commentText){
			if(!commentText){ return }
			$http({
				url: `/api/comment/${commentId}`,
				method: 'PUT',
				data: {
					text: commentText
				}
			});
		}

		this.deleteComment = function(commentId, articleId){
			// delete comment
			// then find the article it is attached to
			// and delete from its comments 
			$http({
				url: `/api/comment/${commentId}`,
				method: 'DELETE'
			}).then(data => {
				const articleUpdate = this.saved.filter(article => article._id === articleId)[0];
				articleUpdate.comments.forEach((comment, index, arr) => {
					if(comment._id === commentId){ arr.splice(index, 1) }
				});
			});
		}

		this.unsaveArticle = function(articleId){
			$http({
				url: `/api/article/${articleId}`,
				method: 'DELETE'
			}).then(data => {
				this.saved.forEach((article, index, arr) => {
					if(article._id === articleId){ arr.splice(index, 1) }
				});
			});
		}

	}
});