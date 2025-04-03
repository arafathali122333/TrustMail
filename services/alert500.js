const { fetchAPI } = require('./network'),
cliqBaseDomain = process.env.CLIQ_BASE_DOMAIN,
cliqTokenBaseDomain = process.env.CLIQ_TOKEN_BASE_DOMAIN,
cliqBotLogoUrl = process.env.CLIQ_BOT_LOGO_URL,
alert500ChatID = process.env.ALERT_500_CHAT_ID,
cliqEntryToken = process.env.CLIQ_ENTRY_TOKEN;

const getCliqToken = async () => {
    let tokenRes = await fetchAPI({
        "method": "GET",
        "url": `https://${cliqTokenBaseDomain}/token/api/${cliqEntryToken}`
    });
    return tokenRes.access_token;
}

const getCliqMsg500Card = (req, error) => {
    return {
        "text": `**🛑 Error Name:** ${error.name}  
**📜 Message:** ${error.message}  
**🕒 Time:** ${new Date().toISOString()}  
**🔍 Stack Trace:**  
\`\`\`${error.stack}\`\`\`
${error.cause ? `**💡 Cause:** ${error.cause}` : ""}

📌 **Request Details:**
**🛑 Method:** ${req.method}  
**📍 URL:** ${req.originalUrl}  
**🔢 IP:** ${req.ip}  
**🖥️ User-Agent:** ${req.get("user-agent")}  
**🔗 Referrer:** ${req.get("referer") || "N/A"}  

${Object.keys(req.query).length > 0 ? `❓ **Query Params:** \`\`\`${JSON.stringify(req.query, null, 2)}\`\`\`` : ""}
${Object.keys(req.params).length > 0 ? `📌 **Route Params:** \`\`\`${JSON.stringify(req.params, null, 2)}\`\`\`` : ""}
${req.body && Object.keys(req.body).length > 0 ? `📦 **Body:** \`\`\`${JSON.stringify(req.body, null, 2)}\`\`\`` : ""}`,
        "bot": { 
            "name": "Alert-500", 
            "image": cliqBotLogoUrl
        },
        "card": { 
            "title": "Service - `TrustMail`" 
        },
        "sync_message": true
    };
};

const post500Alert = async (req, error) => {
    let cliqToken = await getCliqToken(),
        url = `https://${cliqBaseDomain}/api/v2/chats/${alert500ChatID}/message`,
        headersObj = { "Authorization": "Zoho-oauthtoken " + cliqToken };

    const messageRes = await fetchAPI({
        method: "POST",
        url,
        payloadObj: getCliqMsg500Card(req, error),
        headersObj
    });
    console.log(messageRes.message_id);
}

module.exports = {post500Alert};