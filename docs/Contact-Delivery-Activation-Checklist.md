# VELTARO live contact handoff checklist

Website: https://panagiotagrosdouli.github.io/VELTARO/

The forms submit directly to FormSubmit for `panagiotagrosdouli@gmail.com`. GitHub Pages can only host static files; passing website tests does **not** prove email delivery.

## Activation (mailbox owner action required)
1. Open the contact form on the live site and submit a test with non-sensitive, clearly dummy content (for example, name `VELTARO TEST`, message `TEST ONLY — ignore`). Use an email address you control.
2. Open the receiving Gmail inbox **and Spam**. If FormSubmit sends a one-time activation/confirmation email, use its verification link. Do not forward verification links to anyone.
3. Submit a **second** test after activation and confirm it arrives with subject `VELTARO | New Website Contact Message`.
4. Repeat through `early-interest.html`, looking for `VELTARO | New Potential Customer Inquiry`.
5. Record the date of testing and whether both forms actually delivered. Remove test messages from any customer-lead records.

## Before marketing
- Finalize the identity and contact details of the data controller, GDPR lawful basis and retention periods in the privacy notice; confirm how FormSubmit handles personal data, transfers and data processing.
- Ensure any third-party photographs used publicly have appropriate display rights and load reliably. Locally hosted SVG fallbacks do not establish rights to third-party images.
- Treat interest as non-binding research only. Do not imply the V1 concept is manufactured, flight-certified, on sale or taking deposits.
- Handle inquiries using a limited-access mailbox and do not publish leads or their contact details in GitHub issues.

## Troubleshooting
- If the button opens FormSubmit activation, activation must be completed from the recipient inbox.
- If no message arrives, inspect Spam, verify the recipient and subjects in the live HTML, and retest. No form submission or mailbox check is performed by CI.
- GitHub Actions > `Live Pages smoke checks` can validate page responses and public form configuration, not submission or inbox delivery.
