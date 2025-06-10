import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const resend = new Resend(RESEND_API_KEY)

serve(async (req) => {
  try {
    const { type, data } = await req.json()
    
    let subject = ''
    let html = ''

    if (type === 'ai_predictor') {
      subject = 'New AI Predictor Submission'
      html = `
        <h2>New AI Predictor Submission</h2>
        <p><strong>App Summary:</strong> ${data.summary}</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
      `
    } else if (type === 'contact') {
      subject = 'New Contact Form Message'
      html = `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
      `
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'EazyLabs <notifications@eazylabs.com>',
      to: 'eazymoja5@gmail.com',
      subject: subject,
      html: html,
    })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, data: emailData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}) 