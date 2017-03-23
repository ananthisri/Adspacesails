module.exports = function(req,res,ok) {
	var sessionUserMatchId = req.session.User.id ===req.param('id');
	var isAdmin = req.session.User.admin;

	if(!(sessionUserMatchId || isAdmin)) {
		var noRightsError = [{name:'noRights', message: 'Ypou must be admin.'}]
		req.session.flash = {
			err: noRightsError
		}
		res.redirect('/sesssion/new');
		return;
	}
	ok();
};