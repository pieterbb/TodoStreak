<p align="center">
  <picture>
  <img src="https://github.com/pieterbb/TodoStreak/assets/11728875/cf69a1ad-9bfe-42c2-8d9a-b829937f618c" width="130" alt="Logo for TodoStreak">
</picture>
</p>

<h1 align="center">
  TodoStreak
</h1>

<p>
TodoStreak provides a complete Next.js application boilerplate for a social todo app, fully equipped with everything you need, including todo feeds, user profiles, and replies.

You can track your projects, tasks and earn streaks for daily achievements and interact with others through comments and advice in a shared forum.

</p>

<a href="https://www.todostreak.com/" target="_blank">
  <p align="center">
    <img src="https://github.com/pieterbb/TodoStreak/assets/11728875/f11276df-b827-47de-a64d-330b09ca3a64" alt="TodoStreak Demo" width="420" />
  </p>
</a>

<a href="https://www.pieterboerboom.nl/todostreak/" target="_blank">
  <p align="center">Read the behind the scenes blog</p>
</a>

<a href="https://todostreak.com/" target="_blank">
  <p align="center">Live Version: TodoStreak.com</p>
</a>

## Why TodoStreak?

🚀 Quick Start: Get your project off the ground without the hassle of setting up boilerplate code.

🔒 Secure Authentication: Offers secure email magic link and social OAuth login options.

🎮 Gamification: Unique streaks and stats to keep users motivated and engaged.

🔄 Social Interaction: Built-in social todo feed for comments, replies, and likes, enhancing community engagement.

📊 User Profiles & Projects: Personal overview pages and project tracking to showcase achievements and progress.

💬 Community Forum: A dedicated space for users to discuss, engage, and connect.

🛠️ Modern Tech Stack: Built with the latest technologies including React, Next.js, Tailwind CSS, and more for a sleek, fast experience.

![image](https://github.com/pieterbb/TodoStreak/assets/11728875/a30c442d-e229-4cca-a2a7-d5f305f306f1)

## Key Features

- **Authentication**: E-mail magic link and social OAuth Login
- **Gamification:** Streaks for gamifying stats
- **User profiles:** Overview page
- **Social Todo Feed:** Social comments, replies, likes
- **Projects:** Track projects with profile page and todos
- **Forum:** Community section for people to engage in discussions

## Tech Stack 🛠️

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Prisma](https://www.prisma.io/)
- [Cloudinary](https://cloudinary.com/)

![image](https://github.com/pieterbb/TodoStreak/assets/11728875/51548ce4-2bff-4aca-ad19-f08f329bad1a)

## Quick Start

1. Clone the repo
2. Copy the .env.example file to a .env file in the root directory of the repo

```bash
 cp .env.example .env
```

- Replace the placeholder variables in the .env file with your credentials
  - You need a [Cloudinary](https://cloudinary.com/) API key for image uploads and [TinyMCE API](https://www.tiny.cloud/) key for the WYSIWYG editor
  - You need a Postgres database
    - you can use a free serverless Postgres database from [Neon](https://neon.tech/) for example
  - You need a SMTP mail server so Next-Auth can send login emails
    - You can use Gmail, your own SMTP email server or a service like [Postmark](https://postmarkapp.com/smtp-service)
  - You need [Discord](https://discord.com/developers/applications) & [Google OAuth API](https://support.google.com/cloud/answer/6158849?hl=en) keys for logging in with these platforms
    - You can also disable them by deleting them from the provider array and deleting the environment variables so you can just use email magic link login
      ```
      /src/app/api/auth/[...nextauth]/route.ts
      ```

3. **OPTIONAL:** Set the root domain name you are using for your production deployment by setting `NEXT_PUBLIC_BASE_URL:`

   ```
   /src/app/api/auth/[...nextauth]/route.ts
   ```

   ```Javascript
   NEXT_PUBLIC_BASE_URL: process.env.VERCEL
     ? process.env.VERCEL_ENV === 'production'
   	? 'https://www.YOURDOMAIN.com'
   	: `https://${process.env.VERCEL_URL}`
     : 'http://localhost:3000',
   ```

   Replace 'yourdomain.com' with the domain you want to use.

4. Run the following commands to install the dependencies, initialise the database and start the development server

```shell
npm install
npm run prisma:migrate
npm run prisma:generate
npm run dev
```

5. **OPTIONAL**: Run this to seed the database with dummy data

```shell
npx prisma db seed
```

6. **OPTIONAL**: Deploy the application on [Vercel](https://vercel.com/)

   - If not deploying on Vercel, strip out the Vercel analytics in `package.json` and the root layout
     ```json
     "@vercel/analytics": "^1.0.2",
     "@vercel/speed-insights": "^1.0.1",
     ```

7. That's it, you can now run the application, create an account and do whatever you want. Have fun!

## Feature ideas to implement

- Create a marketing / landing page to explain the platform to new users
- Use a component library like Mantine or Shadcn UI
- Add CSP headers and other basic security features to stop XSS and other attacks
- Narrow return data from Prisma queries or use DTO Pattern to prevent over-fetching and exposing sensitive data
- Build a custom Login / Logout page
- Create pagination for the todofeed in the URL, so the position is shareable
- Replace TinyMCE with an open source WYSIWYG editor like TipTap
- Add a stats tab to the user profile displaying charts and GitHub style streaks info about the todo's and productivity of the user or project
- Create an onboarding flow to set a custom username, avatar etc...
- Modify the todo upload so it supports video's
- Create a cron job and modify the seed script (with an LLM for example) to generate periodic seed data and make the platform look active
- Add a feedback box to the right bottom corner so users can quickly report bugs or suggestions
- Have the todo media open in a lightbox
- Add (hover) animations in the UI to make it feel more interactive (Framer / Auto animation library)
- Create a multi-tenant version so you can sell the platform as a whitelabel platform to businesses (Create your own community basically)
- Add dynamic SEO, metadata and OpenGraph Images to the pages
- Implement optimistic updates to the mutations for a more snappy feel of the app
- Add a membership and billing feature with Stripe
- Create a weekly e-mail report with a cron job or transactional email provider
- Weekly E-mail reports / Transactional email
- Add a search bar to search through projects, todo's and forum items
- Add timezones (Mainly for streaks)
- Add notifications (for example using Postgres with the activity streams pattern)
- Create different feeds, for example following / all for timelines
- Create an Admin Dashboard for managing users
- Implement Logging / Observability / Event Analytics (Pino, Sentry, Segment, Jitsu, PostHog)
- Implement online status blink for users
- Create automatic database back-ups
- Dark theme

## Contributing

Contributions, feedback and bug reports are always welcome. Feel free to open an issue or submit a pull request.

## Credits

This project is inspired by [Wip.co](https://wip.co/). It's intended as a learning project and not a competitor.
