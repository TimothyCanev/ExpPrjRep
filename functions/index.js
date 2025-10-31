const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');

admin.initializeApp();

// Twilio credentials (store these in Firebase environment config)
const accountSid = functions.config().twilio.account_sid;
const authToken = functions.config().twilio.auth_token;
const twilioPhoneNumber = functions.config().twilio.phone_number;

const client = twilio(accountSid, authToken);

// Trigger when a device document is updated
exports.checkUsageAndNotify = functions.firestore
  .document('devices/{deviceId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const oldData = change.before.data();
    const deviceId = context.params.deviceId;
    
    const uses = newData.uses || 0;
    const maxUses = newData.maxUses || 10000;
    const maintPhone = newData.maintPhone;
    const location = newData.location || 'Unknown Location';
    const usagePercent = (uses / maxUses) * 100;
    
    // Check if we just crossed the 80% threshold
    const oldUsagePercent = ((oldData.uses || 0) / maxUses) * 100;
    
    if (usagePercent >= 80 && oldUsagePercent < 80 && maintPhone) {
      try {
        await client.messages.create({
          body: `⚠️ MAINTENANCE ALERT: Device ${deviceId} at ${location} has reached ${Math.round(usagePercent)}% usage (${uses}/${maxUses} uses). Maintenance required soon.`,
          from: twilioPhoneNumber,
          to: maintPhone
        });
        
        console.log(`SMS sent to ${maintPhone} for device ${deviceId}`);
        
        // Optional: Log the notification in Firestore
        await admin.firestore().collection('notifications').add({
          deviceId: deviceId,
          phone: maintPhone,
          message: 'Maintenance alert sent',
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          usagePercent: usagePercent
        });
        
      } catch (error) {
        console.error('Error sending SMS:', error);
      }
    }
  });