const sm = require('sitemap');
const pathToRegexp = require('path-to-regexp');
const fs = require('fs');
const axios = require('axios');

var routes = require('../src/data/routes');

// npm run sitemap
// CONFIG
const sitemapDir = './live/sitemap';
const siteURL = 'https://api.minoto.com/v1/shared/sitemap';
const siteBase = 'https://minoto.com'
//const siteURL = 'http://localhost:8000/v1/shared/sitemap';

/* if (!fs.existsSync(sitemapDir)) {
	fs.mkdirSync(sitemapDir);
} */


/// PAGES
var pageUrls = [];
Object.keys(routes).forEach(function (groupKey) {
	var group = routes[groupKey];

	Object.keys(group).forEach(function (routeKey) {
		var add = false;
		var route = group[routeKey];

		if (route.path) {
			var keys = [];
			var reg = pathToRegexp(route.path, keys);

			if (route.excludeFromSitemap !== true) {
				add = keys.reduce(function (state, key) {
					return !state ? false : key.optional;
				}, true);
			}
		}

		if (add) {
			pageUrls.push({
				url: route.path.split(':')[0],
				changefreq: 'monthly',
				priority: route.priority ? route.priority : 0.6,
			});
		}
	});
});

var sitemap = sm.createSitemap({
	hostname: siteBase,
	cacheTime: 600000,
	urls: pageUrls,
	//[{ url: '/page-2/', changefreq: 'monthly', priority: 0.7 }]
});

sitemap.toXML(function (err, xml) {
	if (!err) {
		fs.writeFile(sitemapDir + "/pages.xml", xml.toString(), function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("Pages XML Saved!");
		});
	}
});
/// END PAGES

/// CAR POSTS
axios.get(siteURL + '/car-posts').then(function (response) {
	var carPostUrls = response.data.payload.results.map(function (result) {
		return {
			url: result,
			changeFreq: 'daily',
			priority: 0.8
		}
	});

	var carPostsSitemap = sm.createSitemap({
		hostname: siteURL,
		cacheTime: 600000,
		urls: carPostUrls,
	});

	carPostsSitemap.toXML(function (err, xml) {
		if (!err) {
			fs.writeFile(sitemapDir + "/carposts.xml", xml.toString(), function (err) {
				if (err) {
					return console.log(err);
				}
				console.log("Car Posts XML Saved!");
			});
		}
	});
}).catch(function (error) {
	console.log('Error fetching car posts data for sitemap!')
	console.log(error);
});
/// END CAR POSTS

/// BRANDS
axios.get(siteURL + '/brands').then(function (response) {
	var brandsUrls = response.data.payload.results.map(function (result) {
		return {
			url: result,
			changeFreq: 'daily',
			priority: 0.8
		}
	});

	var carPostsSitemap = sm.createSitemap({
		hostname: siteURL,
		cacheTime: 600000,
		urls: brandsUrls,
	});

	carPostsSitemap.toXML(function (err, xml) {
		if (!err) {
			fs.writeFile(sitemapDir + "/brands.xml", xml.toString(), function (err) {
				if (err) {
					return console.log(err);
				}
				console.log("Brands XML Saved!");
			});
		}
	});
}).catch(function (error) {
	console.log('Error fetching brands data for sitemap!')
	console.log(error);
});
/// END BRANDS

/// DEALERS
axios.get(siteURL + '/dealers').then(function (response) {
	var dealersUrls = response.data.payload.results.map(function (result) {
		return {
			url: result,
			changeFreq: 'daily',
			priority: 0.8
		}
	});

	var carPostsSitemap = sm.createSitemap({
		hostname: siteURL,
		cacheTime: 600000,
		urls: dealersUrls,
	});

	carPostsSitemap.toXML(function (err, xml) {
		if (!err) {
			fs.writeFile(sitemapDir + "/dealers.xml", xml.toString(), function (err) {
				if (err) {
					return console.log(err);
				}
				console.log("Dealers XML Saved!");
			});
		}
	});
}).catch(function (error) {
	console.log('Error fetching dealers data for sitemap!')
	console.log(error);
});
/// END DEALERS

/// BLOG CATEGORIES
axios.get(siteURL + '/blog-categories').then(function (response) {
	var blogCategoriesUrls = response.data.payload.results.map(function (result) {
		return {
			url: result,
			changeFreq: 'weekly',
			priority: 0.8
		}
	});

	var carPostsSitemap = sm.createSitemap({
		hostname: siteURL,
		cacheTime: 600000,
		urls: blogCategoriesUrls,
	});

	carPostsSitemap.toXML(function (err, xml) {
		if (!err) {
			fs.writeFile(sitemapDir + "/blog-categories.xml", xml.toString(), function (err) {
				if (err) {
					return console.log(err);
				}
				console.log("Blog categories XML Saved!");
			});
		}
	});
}).catch(function (error) {
	console.log('Error fetching blog category data for sitemap!')
	console.log(error);
});
/// END BLOG CATEGORIES

/// BLOG POSTS
axios.get(siteURL + '/blog-posts').then(function (response) {
	var blogPostsUrls = response.data.payload.results.map(function (result) {
		return {
			url: result,
			changeFreq: 'daily',
			priority: 0.8
		}
	});

	var carPostsSitemap = sm.createSitemap({
		hostname: siteURL,
		cacheTime: 600000,
		urls: blogPostsUrls,
	});

	carPostsSitemap.toXML(function (err, xml) {
		if (!err) {
			fs.writeFile(sitemapDir + "/blog-posts.xml", xml.toString(), function (err) {
				if (err) {
					return console.log(err);
				}
				console.log("Blog posts XML Saved!");
			});
		}
	});
}).catch(function (error) {
	console.log('Error fetching blog posts data for sitemap!')
	console.log(error);
});
/// END BLOG POSTS