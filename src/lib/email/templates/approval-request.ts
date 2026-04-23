export function approvalRequestHtml({
  agencyName,
  workspaceTitle,
  reviewUrl,
}: {
  agencyName: string
  workspaceTitle: string
  reviewUrl: string
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Content ready for your review</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:12px;border:1px solid #e4e4e7;overflow:hidden;">
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:13px;color:#71717a;font-weight:500;text-transform:uppercase;letter-spacing:.05em;">${escapeHtml(agencyName)}</p>
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#18181b;line-height:1.3;">
                Your content is ready for review
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#52525b;line-height:1.6;">
                <strong style="color:#18181b;">${escapeHtml(workspaceTitle)}</strong> is ready for your approval. Click below to review each post and either approve it or request changes.
              </p>
              <a href="${escapeHtml(reviewUrl)}"
                 style="display:inline-block;background:#18181b;color:#fff;font-size:15px;font-weight:600;padding:14px 28px;border-radius:8px;text-decoration:none;">
                Review content →
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #f4f4f5;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;">
                You received this because ${escapeHtml(agencyName)} sent you a content approval request.
                No account needed — just click the link above.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#a1a1aa;">Powered by Approva</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
