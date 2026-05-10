const PRIMARY = "#22e0d4";
const FG = "#ededed";
const MUTED = "#888888";
const BORDER = "#262626";
const BG = "#0f0f0f";
const BG_SOFT = "#161616";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const labelStyle = `font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: ${MUTED}; padding-bottom: 6px;`;
const valueStyle = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 15px; color: ${FG}; padding-bottom: 20px; border-bottom: 1px solid ${BORDER};`;

function fieldBlock(label: string, value: string): string {
  return `
    <div style="${labelStyle}">${label}</div>
    <div style="${valueStyle} margin-bottom: 24px;">${value}</div>
  `;
}

export function renderPortfolioContactEmail(data: {
  name: string;
  email: string;
  company?: string;
  reason?: string;
  message: string;
}): { subject: string; html: string } {
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    company: data.company ? escapeHtml(data.company) : "",
    reason: data.reason ? escapeHtml(data.reason) : "",
    message: escapeHtml(data.message),
    submittedAt: escapeHtml(submittedAt),
  };

  const subject = `New inquiry — ${safe.name}${safe.reason ? ` (${safe.reason})` : ""}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0; padding:0; background-color:${BG}; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG}; padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:${BG_SOFT}; border:1px solid ${BORDER};">

          <tr>
            <td style="padding:40px 40px 32px 40px; border-bottom:1px solid ${BORDER};">
              <div style="font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; color:${PRIMARY}; margin-bottom:16px;">
                New inquiry · Portfolio
              </div>
              <h1 style="margin:0; font-size:28px; font-weight:900; line-height:1.1; letter-spacing:-0.02em; color:${FG};">
                ${safe.name} sent you a message.
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px 8px 40px;">
              <div style="${labelStyle}">From</div>
              <div style="${valueStyle} margin-bottom:24px;">
                ${safe.name}<br>
                <a href="mailto:${safe.email}" style="color:${PRIMARY}; text-decoration:none;">${safe.email}</a>
              </div>

              ${safe.company ? fieldBlock("Company", safe.company) : ""}
              ${safe.reason ? fieldBlock("Reason", safe.reason) : ""}
            </td>
          </tr>

          <tr>
            <td style="padding:8px 40px 40px 40px;">
              <div style="${labelStyle} margin-bottom:12px;">Message</div>
              <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size:15px; line-height:1.6; color:${FG}; white-space:pre-wrap; padding:20px; background-color:${BG}; border-left:3px solid ${PRIMARY};">${safe.message}</div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 40px 40px;">
              <a href="mailto:${safe.email}?subject=Re:%20Your%20inquiry" style="display:inline-block; background-color:${PRIMARY}; color:${BG}; padding:14px 28px; text-decoration:none; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size:14px; font-weight:700;">
                Reply to ${safe.name} →
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px; border-top:1px solid ${BORDER}; background-color:${BG};">
              <div style="font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.15em; color:${MUTED};">
                Submitted ${safe.submittedAt}
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
