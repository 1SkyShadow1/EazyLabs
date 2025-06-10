-- Create AI Predictor submissions table
create table if not exists public.ai_predictor_submissions (
  id uuid default gen_random_uuid() primary key,
  summary text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create contact messages table
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.ai_predictor_submissions enable row level security;
alter table public.contact_messages enable row level security;

-- Create policies
create policy "Enable insert for all users" on public.ai_predictor_submissions
  for insert with check (true);

create policy "Enable insert for all users" on public.contact_messages
  for insert with check (true);

-- Create function to send email notifications
create or replace function public.send_email_notification()
returns trigger as $$
begin
  perform
    net.http_post(
      url := 'https://zvguasqgtlzmnzsefeks.supabase.co/functions/v1/send-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object(
        'type', case
          when tg_table_name = 'ai_predictor_submissions' then 'ai_predictor'
          when tg_table_name = 'contact_messages' then 'contact'
        end,
        'data', case
          when tg_table_name = 'ai_predictor_submissions' then
            jsonb_build_object('summary', new.summary)
          when tg_table_name = 'contact_messages' then
            jsonb_build_object(
              'name', new.name,
              'email', new.email,
              'message', new.message
            )
        end
      )
    );
  return new;
end;
$$ language plpgsql security definer;

-- Create triggers
create trigger send_ai_predictor_notification
  after insert on public.ai_predictor_submissions
  for each row execute function public.send_email_notification();

create trigger send_contact_notification
  after insert on public.contact_messages
  for each row execute function public.send_email_notification(); 