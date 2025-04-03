const dns = require("dns").promises;

async function checkMXRecords(domain) {
    console.log("Checking email domain from DNS...");
    try {
        const records = await dns.resolveMx(domain);
        return records && records.length > 0;
    } catch (error) {
        console.error(`DNS lookup failed for ${domain}:`, error.message);
        return false;
    }
}

module.exports = { checkMXRecords };
