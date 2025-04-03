const {fetchAPI} = require("./network");

async function checkDisposableStatus(email) {
    console.log("Checking Email from QuickMail 3rd party server...");
    const baseDomain = process.env.QUICKEMAIL_BASE_DOMAIN,
    urlQueries = {
        "apikey": process.env.QUICKEMAIL_API_KEY,
        "email": email
    };
    const quickEmailResponse = await fetchAPI({
        "method": "GET",
        "url": `https://${baseDomain}/v1/verify`,
        "urlQueriesObj": urlQueries
    });
    return quickEmailResponse.disposable === "true";
}

module.exports = { checkDisposableStatus };