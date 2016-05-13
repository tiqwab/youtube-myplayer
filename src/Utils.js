const Utils = {
  parseParameters: (url) => {
    let params = {};
    try {
      const parsed = new URL(url);
      const query = parsed.search;
      query.split('&').forEach(x => {
        const param = x.replace(/^\?/, '').split('=');
        if (param.length === 2) {
          params[param[0]] = param[1];
        }
      });
    } catch (e) {
      console.log(e);
      params = {};
    }
    return params;
  },
};

export default Utils;
