import React from 'react'
import { Helmet } from 'react-helmet'
import Hiking from '../vectors/undraw-hiking.svg'

export default function CommunityStandards() { 
    return (
        <>
        <Helmet>
            <title>Community Standards | Lectern</title>
        </Helmet>
        <div>
            <img src={Hiking} className="h-96 mx-auto" alt='An illustration of someone hiking' />
            <div className="text-center">
                <h1 className="text-6xl font-bold mt-16 mb-8">
                    Community Standards
                </h1>
                <div className="prose mx-auto">
                    <p>
                        <span className="font-bold">Welcome to Lectern!</span> We're a place for people to discover, watch, and share videos, and
                        provides a forum for people to connect, inform, and inspire others.
                    </p>
                    <p>
                        There's a set of standards we expect all our users to follow, whether they're content
                        creators or viewers. This page aims to summarize these standards.
                    </p>
                    <p className="italic">
                        These standards were lasted updated in March 2021.
                    </p>
                </div>
            </div>
        </div>
        <hr className="my-24 mx-auto w-full md:w-4/5" />
        <div className="prose-sm mx-auto w-full md:w-4/5">
            <div>
                <h2>
                    Fake engagement
                </h2>
                <p>
                    Lectern doesn't allow anything that artificially increases the number of views, favorites, or comments
                    on a video. Content that solely exists to incentivize viewers for engagement is prohibited. Lectern
                    reserves the right to terminate accounts that do not follow this policy.
                </p>
                <p>
                    <span className="font-bold">Important!</span> If you hire someone to create content for your account
                    their decisions and actions may impact your account.
                </p>
                <h4 className="font-bold text-primary-900">
                    What does this mean for me?
                </h4>
                <p>
                    Don't post content on Lectern that fits any of the following descriptions:
                </p>
                <ul className="list-disc ml-8">
                    <li>
                        Links to or promises third-party services that artificially inflate metrics.
                    </li>
                    <li>
                        Content linking to or promoting third-party view count or subscriber gaming websites or services.
                    </li>
                    <li>
                        Content featuring a creator purchasing their views from a third party with the intent of promoting the service.
                    </li>
                </ul>
                <p>
                    This policy applies to videos, video descriptions, comment, and any other Lectern product or feature. This list is not exhaustive.
                </p>
            </div>
            <div className="mt-24">
                <h2>
                    Impersonation
                </h2>
                <p>
                    Content intended to impersonate a person is not allowed on Lectern. Lectern also enforces trademark holder rights.
                </p>
                <p>
                    If you see content that violates this policy, please report it.
                </p>
                <h4 className="font-bold text-primary-900">
                    What does this mean for me?
                </h4>
                <p>
                    Don't post content on Lectern that fits any of the following descriptions:
                </p>
                <ul className="list-disc ml-8">
                    <li>
                        An account that copies another account's profile, background, or overall look and feel in such a way that makes it look like someone else's account.
                    </li>
                    <li>
                        Content intended to look like someone else is posting it.
                    </li>
                </ul>
            </div>
            <div className="mt-24">
                <h2>
                    External links
                </h2>
                <p>
                    Links that send users to websites featuring content that violates our Community Standards are not allowed on Lectern.
                </p>
                <p>
                    If you find content that violates this policy, report it.
                </p>
                <h4 className="font-bold text-primary-900">
                    What does this mean for me?
                </h4>
                <p>
                    Don't post content on Lectern that fits any of the following descriptions:
                </p>
                <ul className="list-disc ml-8">
                    <li>
                        Links to pornography.
                    </li>
                    <li>
                        Links to websites or apps that install malware
                    </li>
                    <li>
                        Links to websites or apps phishing for a user's login credentials, financial information, etc.
                    </li>
                    <li>
                        Links to websites, apps, or other information technology that give unauthorized free access to audio content, audiovisual content, full video games, software, or streaming services that normally require payment.
                    </li>
                    <li>
                        Links to websites that seek to raise funds or recruit for terrorist organizations.
                    </li>
                    <li>
                        Links to sites containing Child Sexual Abuse Imagery (CSAI).
                    </li>
                </ul>
                <p>
                    This policy applies to videos, video descriptions, comment, and any other Lectern product or feature. This list is not exhaustive.
                </p>
            </div>
            <div className="mt-24">
                <h2>
                    Spam and deceptive practices
                </h2>
                <p>
                    Lectern doesn't allow span, scams, or other deceptive practices that take advantage of the Lectern community.
                </p>
            </div>
        </div>
        </>
    )
}
