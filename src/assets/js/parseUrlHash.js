function parseUrlHash () {
  var params = {}, queries, temp, i, l;
  var hash = window.location.hash.substring(1);
  if (hash.length === 0) return null;
  queries = hash.split("&");
  for (i = 0, l = queries.length; i < l; i++) {
      temp = queries[i].split('=');
      params[temp[0]] = temp[1];
  }
  return params;
};
