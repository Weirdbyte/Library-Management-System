export function generateVerificationOtpEmailTemplate(otpCode) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #1a1a1a;">
        <h2 style="color: #fff; text-align: center;">Verify Your Email Address</h2>
        <p style="font-size: 16px; color: #ccc;">Dear User,</p>
        <p style="font-size: 16px; color: #ccc;">To complete your registration or login, please use the following code:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #000; background-color: #fff; padding: 10px 20px; border-radius: 5px;">
            ${otpCode}
          </span>
        </div>
        <p style="font-size: 16px; color: #ccc;">This code is valid for 15 minutes. Please do not share this code.</p>
        <p style="font-size: 16px; color: #ccc;">If you did not request this email, please ignore it.</p>

      <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
        <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
          <p>Thank you,<br>BookNest Team</p>
          <p style="font-size: 12px; color: #444;">This is an automated message. Please do not reply to this email.</p>
        </footer>
      </div>
    `;
  }
  

export function forgotPasswordEmailTemplate(resetPasswordUrl) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #1a1a1a;">
        <h2 style="color: #fff; text-align: center;">Reset Your Password</h2>
        <p style="font-size: 16px; color: #ccc;">Dear User,</p>
        <p style="font-size: 16px; color: #ccc;">To reset your password, please click the link below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetPasswordUrl}" style="display: inline-block; font-size: 18px; font-weight: bold; color: #fff; background-color: #007bff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Reset Password</a>
        </div>
        <p style="font-size: 16px; color: #ccc;">If you did not request this email, please ignore it.</p>

      <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
        <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
          <p>Thank you,<br>BookNest Team</p>
          <p style="font-size: 12px; color: #444;">This is an automated message. Please do not reply to this email.</p>
        </footer>
      </div>
    `;
}


export function dueTodayReminderEmailTemplate(userName, bookTitle) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #1a1a1a;">
      <h2 style="color: #fff; text-align: center;">Book Return Reminder</h2>
      <p style="font-size: 16px; color: #ccc;">Dear ${userName},</p>
      <p style="font-size: 16px; color: #ccc;">Just a friendly reminder that the book you borrowed, <strong style="color: #fff;">${bookTitle}</strong>, is due for return <strong style="color: #fff;">today</strong>.</p>
      <p style="font-size: 16px; color: #ccc;">Please make sure to return it on time to avoid any late fees and to help other readers access it too.</p>
      <p style="font-size: 16px; color: #ccc;">Thank you for using <strong style="color: #fff;">BookNest</strong>.</p>

      <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
      <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
        <p>Best regards,<br>BookNest Team</p>
        <p style="font-size: 12px; color: #444;">This is an automated message. Please do not reply to this email.</p>
      </footer>
    </div>
  `;
}
