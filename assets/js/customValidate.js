$(document).ready(function() {
	$('#signup-form').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			password: {
				minlength: 6,
				required: true
			},
			confirmation: {
				minlength: 6,
				equalTo: "#npassword"
			}
		},
		success: function(element) {
			element
			.text('Looks Good!').addClass('valid')
		}
	});
});