import { Resend } from "resend";

interface EmailPros {
  to: string | string[];
  replyTo?: string | string[];
  subject: string;
  html: string;
  bcc?: string | string[];
  env: Env;
}
export async function sendEmail({
  html,
  subject,
  to,
  bcc,
  replyTo,
  env,
}: EmailPros) {
  const resend = new Resend(env.RESEND_API_KEY);

  const from = "test@olet.no";

  const { data, error } = await resend.emails.send({
    from: from ?? "post@example.com",
    to,
    bcc,
    replyTo,
    subject,
    html,
  });

  if (error) {
    console.log("send email", error);
  }

  return data;
}
