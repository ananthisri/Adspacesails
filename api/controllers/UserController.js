/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new: function (req,res) {
		
		res.view();
		
	},

	create: function (req, res, next) {
		User.create( req.params.all(), function userCreated (err, user) {
			console.log(user);
			//if(err) return next(err);
			if(err) {
//				console.log(err);
				req.session.flash = {
					err: err
				}

				return res.redirect('/user/new');
			}

			req.session.authenticated = true;
			req.session.User = user;

			
			
			res.redirect('/user/show/'+user.id);
			//});
		});
	},

	show: function (req,res,next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user: user
			});
		});
	},

	index: function (req, res, next) {

		//console.log(new Date());
		//console.log(req.session.authenticated);

		User.find(function foundUsers (err, users) {
			if(err) return next(err);
			res.view({
				users: users
			});
		});
	},

	edit: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if(err) return next(err);
			if(!user) return next('User dosen\'t exist.');

			res.view({
				user: user
			});
		});
	},

	update: function (req, res, next) {
		User.update(req.param('id'), req.params.all(), function userUpdated (err) {
			console.log(req.params.all());
			if(err) {

				return res.redirect('/user/edit/' + req.param('id'));
			}

			res.redirect('/user/show/' + req.param('id'));
		});
	},

	destroy: function (req, res, next) {

		User.findOne(req.param('id'), function foundUser (err, user) {
			if(err) return next(err);

			if(!user) return next('User dosen\'t exist.');
			
			User.destroy(req.param('id'), function userDestroyed(err) {
				if(err) return next(err);

			});

			res.redirect('/user');			
		});
	},

	adspace: function (req, res, next) {
	
		User.findOne(req.param('id'), function foundUser (err, user) {
	
			if(err) return next(err);
	
			if(!user) return next('User dosen\'t exist.');

			res.view({
				user: user
			});
		});
	},

	// space: function (req, res, next) {

		
	// 	User.findOne(req.param('id'), function foundUser (err, user) {
	
	// 		//if(adspaceval == totalspace) {

	// 			console.log("Sorry! No available space");
	// 			return res.redirect('/');

				
	// 		//}
	// 		res.redirect('/user/adspace/' + user.id);
	// 	});
	// },

	showadmin: function (req, res, next) {
 		
 		User.find( function foundUsers (err, users) {
 		
	 		var x = -999, y= -1, id = 0, payname, countname, avg=0, profit = 0;
			for (var i=0; i<users.length; i++) {
				if ( x < users[i].adspaceval) {
					x= users[i].adspaceval;
					payname = users[i].cmpyname;
				}

				if( y < users[i].adspacecount) {
					y= users[i].adspacecount;
					countname = users[i].cmpyname;
				}

				avg += parseInt(users[i].adspacecount);
				profit +=parseInt(users[i].adspaceval);
				
			}
			avg /=25;

			if(err) return next(err);
			if(!users) return next();
			res.view({

				payname: payname,
				countname: countname,
				avg: avg,
				profit: profit,
				users: users

			});
		});

	}

	
};
 
 