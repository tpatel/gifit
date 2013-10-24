/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    OAuth = require('oauth'),
    Article = mongoose.model('Article'),
    _ = require('underscore'),
    config = require('../../config/config');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
	console.log('create', req.body);
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.jsonp({err: err});
        } else {
            res.jsonp(article);
            var oauth = new OAuth.OAuth(
			  'https://api.twitter.com/oauth/request_token',
			  'https://api.twitter.com/oauth/access_token',
			  config.twitter.clientID,
			  config.twitter.clientSecret,
			  '1.0A',
			  null,
			  'HMAC-SHA1'
			);
			oauth.post(
			  'https://api.twitter.com/1.1/statuses/update.json',
			  req.user.oauth.token, //test user token
			  req.user.oauth.tokenSecret, //test user secret
			  {status:article.text + ' http://127.0.0.1:3000/#!/gifit/'+article._id},
			  function (e, data, res){
				if (e) console.error(e);        
				console.log(data);
			  });
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        res.jsonp(article);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.article);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Article.find().sort('-created').limit(20).populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};
