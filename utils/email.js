const fs = require("fs");
const path = require("path");
const dnsService = require("../services/dns");
const emailVerificationService = require("../services/quickEmailVerification");

const trustedDomains = JSON.parse(fs.readFileSync(path.join(__dirname, "../domains/trusted.json")));
const disposableDomains = JSON.parse(fs.readFileSync(path.join(__dirname, "../domains/disposable.json")));

async function isTrustedEmail(email) {
    email = email.toLowerCase().trim();
    const domain = email.split("@")[1];

    // Check against trusted domains
    if (trustedDomains.includes(domain)) {
        return true;
    }

    // Check against disposable domains
    if (disposableDomains.includes(domain)) {
        return false;
    }

    // Verify via DNS MX Records
    const hasValidDNS = await dnsService.checkMXRecords(domain);
    if (!hasValidDNS) {
        return false;
    }

    // Verify via QuickEmailVerification API
    const isDisposable = await emailVerificationService.checkDisposableStatus(email);
    return !isDisposable;
}

module.exports = { isTrustedEmail };
