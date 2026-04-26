import nodemailer from "nodemailer";
import { decrypt } from "./crypto";

export type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  passEnc: string;
  from: string;
  secure: boolean;
};

export async function sendTemplatedEmail(opts: {
  smtp: SmtpConfig;
  to: string;
  subject: string;
  htmlTemplate: string;
  vars: Record<string, string>;
}) {
  const { smtp, to, subject, htmlTemplate, vars } = opts;
  if (!smtp.host || !smtp.user) throw new Error("SMTP is not configured. Open the admin settings first.");

  const html = render(htmlTemplate, vars);
  const renderedSubject = render(subject, vars);

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure || smtp.port === 465,
    auth: { user: smtp.user, pass: decrypt(smtp.passEnc) },
  });

  await transporter.sendMail({
    from: smtp.from,
    to,
    subject: renderedSubject,
    html,
  });
}

// Back-compat alias
export const sendOrderEmail = sendTemplatedEmail;

function render(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? "");
}
