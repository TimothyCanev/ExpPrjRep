const twilio = require('twilio');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { phone, deviceId, location, usagePercent, uses, maxUses } = JSON.parse(event.body);

  // Twilio credentials from environment variables
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  const client = twilio(accountSid, authToken);

  try {
    await client.messages.create({
      body: `⚠️ MAINTENANCE ALERT: Device ${deviceId} at ${location} has reached ${usagePercent}% usage (${uses}/${maxUses} uses). Maintenance required soon.`,
      from: twilioPhone,
      to: phone
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ success: true, message: 'SMS sent successfully' })
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};