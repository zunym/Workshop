const GIPHY_SEARCH = 'https://api.giphy.com/v1/gifs/search'
const CACHE_RETENTION = 60 * 1000 * 1;

const request = require('request');

const Giphy = function(key) {
    //Instance members
    this.key = key;
    //Local cache instance
    this.cache = {};
};

//Class member
//Giphy.prototype.cache = { };
Giphy.prototype.search = function(searchTerm, resultCount) {
    return (new Promise((resolve, reject) => {
        const result = this.queryCache(searchTerm, resultCount);
        if (result) {
            const cacheResult = { ...result }; //make a copy of the cache
            cacheResult.images.splice(0, resultCount);
            cacheResult.fromCache = true;
            return (resolve(cacheResult));
        }

        const params = {
            api_key: this.key,
            q: searchTerm,
            limit: resultCount
        };
        request.get(GIPHY_SEARCH, { qs: params }, (err, resp, body) => {
            if (err)
                return (reject(err));

            const fixedWidthUrls = [];
            const data = JSON.parse(body).data;
            for (let d of data)
                fixedWidthUrls.push(d.images.fixed_width.url);
            resolve(this.saveToCache(searchTerm, fixedWidthUrls))
        });
    }));
};

Giphy.prototype.saveToCache = function(searchTerm, result) {
    let term = searchTerm.toLowerCase();
    const rec = {
        searchTerm: term,
        images: result,
        timestamp: (new Date()).getTime()
    }
    this.cache[term] = rec;
    return (rec);
}

Giphy.prototype.queryCache = function(searchTerm, resultCount) {
    const rec = this.cache[searchTerm.toLowerCase()];
    if (!rec)
        return (false);

    //Check if it has expired
    const now = (new Date()).getTime();
    if ((now - rec.timestamp) > CACHE_RETENTION)
        return (false);

    //Check if we have enough data in the result
    if (resultCount > rec.images.length)
        return (false);

    return (rec);
}

module.exports = function(key) {
    return (new Giphy(key));
};