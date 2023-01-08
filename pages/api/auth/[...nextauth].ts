import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../lib/prisma'
import GitHubProvider from 'next-auth/providers/github'
// import Providers from "next-auth/providers";
// import FacebookProvider from 'next-auth/providers/facebook'
// import TwitterProvider from 'next-auth/providers/twitter'
// import DiscordProvider from 'next-auth/providers/discord'
// import InstagramProvider from 'next-auth/providers/instagram'
// import RedditProvider from 'next-auth/providers/reddit'
// import AppleProvider from 'next-auth/providers/apple'
// import Auth0Provider from 'next-auth/providers/auth0'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import EmailProvider from 'next-auth/providers/email'


const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // DiscordProvider({
    //   clientId: process.env.DISCORD_ID,
    //   clientSecret: process.env.DISCORD_SECRET,
    // }),
    // InstagramProvider({
    //   clientId: process.env.INSTAGRAM_ID,
    //   clientSecret: process.env.INSTAGRAM_SECRET,
    // }),
    // RedditProvider({
    //   clientId: process.env.REDDIT_ID,
    //   clientSecret: process.env.REDDIT_SECRET,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    // }),
    

    // EmailProvider({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.SMTP_FROM,
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
