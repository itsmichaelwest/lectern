import React from 'react'
import { Helmet } from 'react-helmet'
import { ReactComponent as Hiking } from '../vectors/undraw-hiking.svg'
import SelfHelpTable from '../components/community-standards/SelfHelpTable'
import { URL } from '../Design'

export default function CommunityStandards() { 
    const ReportThis = (
        <p>
            If you find content that violates this policy, report it.
        </p>
    )

    const WhatDoesThisMean = (
        <>
        <h4 className="font-bold text-primary-900 dark:text-primary-400">
            What does this mean for you?
        </h4>
        <p>
            Don't post content on Lectern that fits any of the following descriptions:
        </p>
        </>
    )

    const PolicyNotExhaustive = (
        <p>
            This policy applies to videos, video descriptions, comments, and any other Lectern product or feature. 
            This list is not exhaustive.
        </p>
    )

    return (
        <>
        <Helmet>
            <title>Community Standards | Lectern</title>
        </Helmet>
        <div className="px-4 sm:px-0">
            <Hiking className="h-48 md:h-96 mx-auto" alt='An illustration of someone hiking' />
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl dark:text-white font-bold font-header mt-8 mb-8">
                    Community Standards
                </h1>
                <div className="prose dark:prose-dark mx-auto">
                    <p>
                        <span className="font-bold">Welcome to Lectern!</span> We're a place for people to discover, 
                        watch, and share videos, and provides a forum for people to connect, inform, and inspire others.
                    </p>
                    <p>
                        There's a set of standards we expect all our users to follow, whether they're content
                        creators or viewers. This page aims to provide a summary of our expectations.
                    </p>
                </div>
            </div>
        </div>
        <hr className="my-16 mx-auto w-full md:w-4/5" />
        <div className="prose-sm dark:prose-dark mx-auto px-4 sm:px-0 w-full md:w-4/5">
            <div>
                <h2>
                    Fake Engagement
                </h2>
                <p>
                    Lectern does not allow anything that artificially increases the number of views, favorites, or 
                    comments on a video. Content that solely exists to incentivize viewers for engagement is prohibited. 
                    Lectern reserves the right to terminate accounts that do not follow this policy.
                </p>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Links to or promises third-party services that artificially inflate metrics.
                    </li>
                    <li>
                        Content linking to or promoting third-party view count or subscriber gaming websites or services.
                    </li>
                    <li>
                        Content featuring a creator purchasing their views from a third party with the intent of 
                        promoting the service.
                    </li>
                </ul>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Impersonation
                </h2>
                <p>
                    Lectern does not allow content intended to impersonate another person. Lectern also enforces 
                    trademark holder rights.
                </p>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        An account that copies another account's profile, background, or overall look and feel in such 
                        a way that makes it look like someone else's account.
                    </li>
                    <li>
                        Content intended to look like someone else is posting it.
                    </li>
                </ul>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    External Links
                </h2>
                <p>
                    Lectern does not allow content that contains links that send users to websites featuring content 
                    that violates our Community Standards.
                </p>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Links to pornography.
                    </li>
                    <li>
                        Links to websites or apps that install malware.
                    </li>
                    <li>
                        Links to websites or apps phishing for a user's login credentials, financial information, etc.
                    </li>
                    <li>
                        Links to websites, apps, or other information technology that give unauthorized free access to 
                        audio content, audiovisual content, full video games, software, or streaming services that 
                        normally require payment.
                    </li>
                    <li>
                        Links to websites that seek to raise funds or recruit for terrorist organizations.
                    </li>
                    <li>
                        Links to sites containing child sexual abuse content.
                    </li>
                </ul>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Spam and Deceptive Practices
                </h2>
                <p>
                    Lectern doesn't allow span, scams, or other deceptive practices that take advantage of the Lectern 
                    community.
                </p>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Content that makes false claims that widespread fraud, errors, or glitches changed the outcome
                        of any past, current, or future fair and democratic election in any country.
                    </li>
                    <li>
                        Content that is excessively posted, repetitive, or untargeted.
                    </li>
                    <li>
                        Content that uses the title, thumbnail, or description to trick users into believing the content 
                        is something that it is not.
                    </li>
                    <li>
                        Content that has been technically manipulated or doctored in a way that misleads users (going 
                        beyond clips "taken out of context") and may pose a serious risk of harm.
                    </li>
                    <li>
                        Content offering cash gifts, "get rich quick" schemes, or pyramid schemes (sending money without 
                        a tangible product in a pyramid structure).
                    </li>
                    <li>
                        Content aiming to mislead voters about the time, place, means, or eligibility requirements for 
                        voting, or false claims that could discourage voting.
                    </li>
                    <li>
                        Content that makes false claims related to the technical eligibility requirements for current 
                        political candidates and sitting elected government officials to serve in office.
                    </li>
                    <li>
                        Content encouraging others to interfere with democratic processes, such as obstructing or 
                        otherwise interfering with voting practices.
                    </li>
                    <li>
                        Content that contains hacked information, the distribution of which may interfere with 
                        democratic processes.
                    </li>
                    <li>
                        Content that sells engagement metrics such as views, favorites, or comments.
                    </li>
                    <li>
                        Comments where the sole purpose is to gather personal information from viewers.
                    </li>
                    <li>
                        Large numbers of identical or repetitive comments.
                    </li>
                </ul>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Child Safety
                </h2>
                <p>
                    Lectern does not allow content that endangers the emotional and/or physical wellbeing of minors. A 
                    minor is defined as someone who is under the legal age of majority  - usually anyone younger than 
                    18 years old in most countries/regions.
                </p>
                <p>
                    If you find content that violates this policy, report it. <span className="font-bold">If you believe 
                    a child is in danger, you should get in touch with your local law enforcement agency to report the 
                    situation immediately.</span>
                </p>
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Sexually explicit content featuring minors and content that sexually exploits minors.
                    </li>
                    <li>
                        Content showing a minor participating in dangerous activities or encouraging minors to do 
                        dangerous activities. <span className="font-bold">Never put minors in harmful situations 
                        that may lead to injury, including dangerous stunts, dares, or pranks.</span>
                    </li>
                    <li>
                        Content that could cause minor participants or viewers emotional distress, including exposing 
                        minors to mature themes, simulating parental abuse, coercing minors, and violence.
                    </li>
                    <li>
                        Content that targets young minors and families, but contains sexual themes, violence, obscenity 
                        or other mature themes, or family friendly cartoons that target young minors and contain adult 
                        or age-inappropriate themes such as violence, sex, death, drugs, and more.
                    </li>
                    <li>
                        Content involving minors that targets individuals for abuse or humiliation, reveals personal 
                        information, records someone without their consent, sexually harasses, or encourages others to 
                        bully or harass.
                    </li>
                </ul>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Nudity and Sexual Content
                </h2>
                <p>
                    Lectern does not allow explicit content meant to be sexually gratifying. Posting pornography will 
                    result in content removal and may result in account termination. Videos containing fetish content 
                    will be removed. In the majority of cases, violent, graphic, or humiliating fetishes are not allowed 
                    on Lectern.
                </p>
                {ReportThis}
                <p className="font-bold">
                    Sexually explicit content featuring minors and content that sexually exploits minors is not allowed 
                    on Lectern.
                </p>
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Depiction of genitals, nipples (female or male), or buttocks (clothed or unclothed) for the 
                        purposes of sexual gratification.
                    </li>
                    <li>
                        Pornography or depicting sexual acts, genitals, or fetishes for the purpose of sexual 
                        gratification on any surface (such as video, text, audio, or images).
                    </li>
                    <li>
                        Explicit or implied depictions of sex acts for the purpose of sexual gratification. This applies 
                        to real world or dramatized content.
                    </li>
                    <li>
                        Masturbation, fondling, or groping of any body part.
                    </li>
                    <li>
                        Animated or illustrated pornography, sex acts, or fetish content.
                    </li>
                    <li>
                        Bestiality or the promotion of bestiality.
                    </li>
                    <li>
                        Incest or the promotion of incest.
                    </li>
                    <li>
                        Non-consensual sex acts or unwanted sexualization.
                    </li>
                    <li>
                        Celebrity wardrobe accidents or nude photo leaks.
                    </li>
                    <li>
                        Violent, graphic, or humiliating fetish content where the purpose is sexual gratification.
                    </li>
                    <li>
                        Aggregating content for the purpose of sexual gratification.
                    </li>
                    <li>
                        Any sexual content involving minors: see the Child Safety section above.
                    </li>
                </ul>
                {PolicyNotExhaustive}
                <p>
                    Nudity may be allowed when the primary purpose is educational, documentary, scientific, or artistic, 
                    and it isn't gratuitous. For example, a documentary on breast cancer would be appropriate, but 
                    posting clips out of context to sexually gratify from that same documentary is not.
                </p>
            </div>
            <div className="mt-24">
                <h2>
                    Suicide and Self-Injury
                </h2>
                <p>
                    Lectern takes the health and wellbeing of our creators and viewers seriously. Awareness and 
                    understanding of mental health is important and we support creators sharing their stories, such as 
                    posting content discussing their experiences with depression, self-harm, or other mental health 
                    issues.
                </p>
                <p>
                    However, we do not allow content on Lectern that promotes suicide, self-herm, or is intended to 
                    shock or disgust viewers.
                </p>
                <p className="font-bold">
                    If you come across content in which someone expresses suicidal thoughts or is engaging in self-harm, 
                    please content local emergency services immediately for help and report the video to bring it to our 
                    immediate attention.
                </p>
                <h4 className="font-bold text-primary-900">
                    What to do if you need help or support
                </h4>
                <p>
                    If you are depressed, contemplating suicide, or self-harming, please how there is help and you are 
                    not alone. Many people turn to suicidal thoughts and/or self-harm as ways to cope with painful 
                    emotions. Talking to a specialist can help you identify healthy and effective coping strategies and 
                    develop skills to manage difficult feelings.
                </p>
                <p>
                    Below is a list of suicide prevention organizations dedicated to helping those in need in various 
                    countries and regions:
                </p>
                <SelfHelpTable/>
                <p>
                    If you are looking for educational resources about self-harm, visit the following websites:
                </p>
                <ul className="list-disc ml-8">
                    <li>
                        <a className={URL} href="https://www.selfinjury.com/">
                            www.selfinjury.com
                        </a>
                        &nbsp; - S.A.F.E Alternatives is a network and educational resource base committed to helping 
                        end self-harming behavior.
                    </li>
                    <li>
                        <a className={URL} href="https://www.sioutreach.org/">
                            www.sioutreach.org
                        </a>
                        &nbsp; - SiOS is an outreach initiative providing information and resources about self-harm to 
                        those who self-harm, those who have recovered, and those who want to help.
                    </li>
                </ul>
                <h4 className="font-bold text-primary-900">
                    Guidelines for posting mental health-related content
                </h4>
                <p>
                    Lectern users shouldn't be afraid to speak openly about the topics of mental health or self-harm. 
                    With that in mind, however, please don't post content on Lectern that fits any of the following 
                    descriptions:
                </p>
                <ul className="list-disc ml-8">
                    <li>
                        Promoting or glorifying suicide.
                    </li>
                    <li>
                        Providing instructions on how to self-harm or die by suicide.
                    </li>
                    <li>
                        Graphic images of self-harm posted to shock or disgust viewers.
                    </li>
                </ul>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Harassment and Cyberbullying
                </h2>
                <p>
                    Lectern does not allow content that threatens individuals. We also don't allow content that 
                    targets an individual with prolonged or malicious insults based on intrinsic attributes. These 
                    attributes include their protected group status or physical traits.
                </p>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Content that features prolonged name calling or malicious insults (such as racial slurs) based 
                        on their intrinsic attributes. These include their protected group status, physical attributes, 
                        or their status as a survivor of sexual assault, domestic abuse, child abuse, and more.
                    </li>
                    <li>
                        Content uploaded with the intent to shame, deceive, or insult a minor. A minor is defined as 
                        someone who is under the legal age of majority  - usually anyone younger than 18 years old in 
                        most countries/regions.
                    </li>
                    <li>
                        Content that reveals someone's private information, such as their home address, email addresses, 
                        sign in credentials, phone numbers, passport number, or bank account information.
                    </li>
                    <li>
                        Content that incites others to harass or threaten individuals on or off Lectern.
                    </li>
                    <li>
                        Content that encourages abusive fan behavior such as doxxing, dogpiling, brigading, or 
                        off-platform targeting.
                    </li>
                    <li>
                        Content that targets an identifiable individual as part of a harmful conspiracy theory where 
                        the conspiracy theory has been linked to direct threats or violent acts.
                    </li>
                    <li>
                        Content making implicit or explicit threats of physical harm or destruction of property against 
                        identifiable individuals. "Implicit threats" includes threats that don't express a specific 
                        time, place, or means, but may feature weapon brandishing, simulated violence, and more.
                    </li>
                    <li>
                        Content posted by vigilantes restraining or assaulting an identifiable individual.
                    </li>
                    <li>
                        Content that depicts creators simulating acts of serious violence against others (executions, 
                        torture, maimings, beatings, and more).
                    </li>
                    <li>
                        Content featuring non-consensual sex acts, unwanted sexualization or anything that graphically 
                        sexualizes or degrades an individual.
                    </li>
                    <li>
                        Content that displays or shows how to distribute non-consensual sexual imagery.
                    </li>
                </ul>
                {PolicyNotExhaustive}
                <h4 className="font-bold text-primary-900">
                    Exceptions to this policy
                </h4>
                <p>
                    If the primary purpose is educational, documentary, scientific, or artistic in nature, Lectern may 
                    allow content that includes harassment. <span className="font-bold">These exceptions are not a free 
                    pass to harass someone.</span>
                </p>
                <p>
                    Examples include:
                </p>
                <ul className="list-disc ml-8">
                    <li>
                        Debates relating to high-profile officials or leaders.
                    </li>
                    <li>
                        Scripted performances (insults made in the context of an artistic medium such as scripted 
                        satire, stand-up comedy, or music). <span className="italic">This exception is not a free pass 
                        to harass someone and then claim you were joking.</span>
                    </li>
                    <li>
                        Harassment education or awareness.
                    </li>
                </ul>
            </div>
            <div className="mt-24">
                <h2>
                    Harmful or Dangerous Content
                </h2>
                <p>
                    Lectern doesn't allow content that encourages dangerous or illegal activities that risk serious 
                    harm or death.
                </p>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Extremely dangerous challenges.
                    </li>
                    <li>
                        Dangerous or threatening pranks.
                    </li>
                    <li>
                        Content that shows viewers how to perform activities meant to kill or main others.
                    </li>
                    <li>
                        Content that depicts abuse of or giving instructions on how to create hard drugs such as 
                        cocaine or opioids.
                    </li>
                    <li>
                        Content that praises, glorifies, or encourages viewers to imitate anorexia or other eating 
                        disorders.
                    </li>
                    <li>
                        Content that promotes or glorifies violent tragedies, such as school shootings.
                    </li>
                    <li>
                        Instructional theft or cheating.
                    </li>
                    <li>
                        Content that demonstrates how to use computers with the intent to steal credentials, compromise 
                        personal data, or cause serious harm to other such as (but not limited to) hacking into social 
                        media accounts.
                    </li>
                    <li>
                        Content that demonstrates how to use apps, websites, or other services to gain unauthorized free
                        access to audio content, audiovisual content, full video games, software, or streaming services 
                        that normally require payment.
                    </li>
                    <li>
                        Content which claims harmful substances or treatments can have health benefits.
                    </li>
                </ul>
                <p className="font-bold">
                    Don't post content showing a minor participating in dangerous activities, or encouraging minors to 
                    participle in dangerous activities. Never put minors in harmful situations that may lead to injury, 
                    including dangerous stunts, dares, or pranks: see the Child Safety section above.
                </p>
                <p>
                    Lectern may allow videos that depict dangerous acts if they're meant to be educational.
                </p>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Hate Speech
                </h2>
                <p>
                    Lectern does not allow content that contains hate speech. We classify hate speech as promoting 
                    violence or hatred against individuals or groups based on any of the following attributes:
                </p>
                <ul className="list-disc ml-8">
                    <li>
                        Age
                    </li>
                    <li>
                        Caste
                    </li>
                    <li>
                        Disability
                    </li>
                    <li>
                        Ethnicity
                    </li>
                    <li>
                        Gender identity and expression
                    </li>
                    <li>
                        Nationality
                    </li>
                    <li>
                        Race
                    </li>
                    <li>
                        Immigration status
                    </li>
                    <li>
                        Religion
                    </li>
                    <li>
                        Sex/gender
                    </li>
                    <li>
                        Sexual orientation
                    </li>
                    <li>
                        Victims of a major violent event and their kin
                    </li>
                    <li>
                        Veteran status
                    </li>
                </ul>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Content that encourages violence against individuals based on any of the attributes listed 
                        above. Threats are not allowed on Lectern, and we will treat implied calls for violence as real 
                        threats. See Harassment and Cyberbullying above.
                    </li>
                    <li>
                        Content that incites hatred against individuals and groups based on any of the attributes 
                        listed above.
                    </li>
                    <li>
                        Content that dehumanizes individuals or groups by calling them subhuman, comparing them to 
                        animals, insects, pests, disease, or any other non-human entity.
                    </li>
                    <li>
                        Content that praises or glorifies violence against individuals based on the attributes noted 
                        above.
                    </li>
                    <li>
                        Content that uses racial, religious, or other slurs and stereotypes that incite or promote 
                        hatred based on any of the attributes listed above.
                    </li>
                    <li>
                        Content that claims individuals or groups that physically or mentally inferior, deficient, or 
                        diseased based on any of the attributed listed above.
                    </li>
                    <li>
                        Content that alleges the superiority of a group over those with any of the attributes listed 
                        above to justify violence, discrimination, segregation, or exclusion.
                    </li>
                    <li>
                        Content containing conspiracy theories claiming individuals or groups are evil, corrupt, or 
                        malicious based on any of the attributes above.
                    </li>
                    <li>
                        Content that calls for the subjugation or domination over individuals or groups based on any 
                        of the attributes above.
                    </li>
                    <li>
                        Content that denies a well-documented violent event took place (for example, denying school 
                        shootings). 
                    </li>
                    <li>
                        Content that attacks on a person's emotional, romantic and/or sexual attraction to another 
                        person.
                    </li>
                    <li>
                        Content containing hateful supremacist propaganda including the recruitment of new members or 
                        requests for support of any kind for their ideology.
                    </li>
                </ul>
                <p>
                    Lectern may allow content that includes hate speech if the primary purpose is educational, 
                    documentary, scientific, or artistic in nature. <span className="font-bold">This is not a free pass 
                    to promote hate speech.</span>
                </p>
                <p>
                    Examples include:
                </p>
                <ul className="list-disc ml-8">
                    <li>
                        Content that is a documentary about a hate group. Educational content that isn't supporting the 
                        group or promoting their ideas would be allowed.
                    </li>
                    <li>
                        Content that is a documentary about the scientific study of humans. Educational content about 
                        how theories have changed over time, even if it includes theories about the inferiority of 
                        superiority of specific groups, would be allowed because of its educational nature.
                    </li>
                </ul>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Violent Criminal Organizations
                </h2>
                <p>
                    Lectern does not allow content intended to praise, promote, or aid violent criminal organizations.
                </p>
                {ReportThis}
                <p className="font-bold">
                    If you believe anyone is in immediate danger, you should get in touch with your local law 
                    enforcement agency and report the situation immediately.
                </p>
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Content produced by violent criminal or terrorist organizations.
                    </li>
                    <li>
                        Content that praises or memorializes prominent terrorist or criminal figures in order to 
                        encourage others to carry out acts of violence.
                    </li>
                    <li>
                        Content that praises or justifies violent acts carried out by violent criminal or terrorist 
                        organizations.
                    </li>
                    <li>
                        Content that is aimed at recruiting new members to violent criminal or terrorist organizations.
                    </li>
                    <li>
                        Content that depicts hostages or posted with the intent to solicit, threaten, or intimate 
                        on behalf of a violent criminal or terrorist organization.
                    </li>
                    <li>
                        Content that depicts the insignia, logos, or symbols of violent criminal or terrorist 
                        organizations on order to praise them.
                    </li>
                </ul>
                <p>
                    If posting content related to terrorism or crime for an educational, documentary, scientific, or 
                    artistic purpose, be mindful to provide enough information in the video or audio itself so viewers 
                    understand the context.
                </p>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Violent or Graphic Content
                </h2>
                <p>
                    Lectern does not allow violent or gory content intended to shock or disgust viewers, or content 
                    that encourages other to commit violent acts.
                </p>
                {ReportThis}
                <p className="font-bold">
                    If you believe anyone is in immediate danger, you should get in touch with your local law 
                    enforcement agency and report the situation immediately.
                </p>
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Content that incites others to commit violent acts against individuals or a defined group 
                        of people.
                    </li>
                    <li>
                        Content that includes fights involving minors.
                    </li>
                    <li>
                        Video, audio, or images involving road accidents, natural disasters, war aftermath, terrorist 
                        attack aftermath, street fights, physical attacks, sexual assaults, immolation, torture, 
                        corpses, protests or riots, robberies, medial procedures, or other such scenarios with the 
                        intent to shock or disgust viewers.
                    </li>
                    <li>
                        Video or images showing bodily fluids, such as blood or vomit, with the intent to shock or 
                        disgust viewers.
                    </li>
                    <li>
                        Content where there is infliction of unnecessary suffering or harm, deliberately causing an 
                        animal distress.
                    </li>
                    <li>
                        Content where animals are encouraged or coerced to fight by humans.
                    </li>
                    <li>
                        Content containing dramatized or fictional footage of anything listed above, where the viewer 
                        is not given enough context to understand the footage is dramatized or fictional.
                    </li>
                    <li>
                        Video of corpses with massive injuries, such as severed limbs.
                    </li>
                </ul>
                <p>
                    If posting content containing violence or graphic content educational or documentary purpose, be 
                    mindful to provide enough information in the video or audio itself so viewers understand the 
                    context.
                </p>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    COVID-19 Misinformation
                </h2>
                <p>
                    Lectern does not allow content about COVID-19 that poses a serious risk of harm. We also do not 
                    allow content that spreads medical misinformation that contradicts local health authorities' or the 
                    World Health Organization's (WHO) medical information about COVID-19.
                </p>
                <p>
                    Lectern's policies on COVID-19 are subject to change, responding to the changes that global or 
                    local health authorities' made their their guidance on the virus.
                </p>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Content that encourages the use of home remedies, prayer, or rituals in place of medial 
                        treatment such as consulting a medical professional or going to the hospital.
                    </li>
                    <li>
                        Contain that claims there is a guaranteed cure for COVID-19.
                    </li>
                    <li>
                        Content that discourages people from consulting a medical professional or seeking medical 
                        advice.
                    </li>
                    <li>
                        Content that claims there is a guaranteed prevention method for COVID-19 or that claims that 
                        any medication or vaccination is a guaranteed prevention method for COVID-19.
                    </li>
                    <li>
                        Content containing claims about COVID-19 vaccinations that contradict expert consensus from 
                        local health authorities or WHO. 
                    </li>
                    <li>
                        Content that promotes diagnostic methods that contradict local health authorities or WHO.
                    </li>
                    <li>
                        Content that promotes transmission information that contradicts local health authorities or WHO.
                    </li>
                    <li>
                        Content that disputes the efficacy of local health authorities or WHO's guidance on physical 
                        distancing or self-isolation measures to reduce transmission of COVID-19.
                    </li>
                    <li>
                        Content that denies the existence of COVID-19.
                    </li>
                </ul>
                <p>
                    Educational, documentary, and scientific exclusions apply to this policy. If you are making a video
                    providing legitimate, science-backed information about COVID-19 that does not violate the above
                    guidelines, it will be allowed. If you post content design to condemn or dispute misinformation, 
                    please ensure that it is clear which parts are critique and which parts are legitimate facts.
                </p>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Firearms
                </h2>
                <p>
                    Lectern does not allow content intended to promote or sell firearms, instruct viewers on how to 
                    make firearms, munitions, and certain accessories, or instruct viewers on how to install those 
                    accessories.
                </p>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Content who's purpose is to promote or sell firearms or certain firearms accessories.
                    </li>
                    <li>
                        Content that provides instructions on manufacturing firearms, munitions, high capacities 
                        magazines, homemade silencers/suppressors, or firearm accessories.
                    </li>
                    <li>
                        Content that provides instructions on how to convert a firearm to feature automatic or 
                        simulated automatic firing capabilities.
                    </li>
                </ul>
                <p>
                    <span className="font-bold">There is no educational, documentary, scientific, or artistic content 
                    exception for this policy.</span> Any content that displays the manufacture or firearms, munitions, 
                    and similar, or promotes or intends to sell firearms is not allowed on Lectern.
                </p>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Sale of Illegal or Regulated Goods
                </h2>
                <p>
                    Lectern does not allow content intended to sell certain regulated goods and services.
                </p>
                {ReportThis}
                {WhatDoesThisMean}
                <ul className="list-disc ml-8">
                    <li>
                        Alcohol
                    </li>
                    <li>
                        Bank account passwords, stolen credit cards, or other financial information
                    </li>
                    <li>
                        Counterfeit documents or currency
                    </li>
                    <li>
                        Controlled narcotics and other drugs
                    </li>
                    <li>
                        Explosives
                    </li>
                    <li>
                        Organs
                    </li>
                    <li>
                        Endangered species or parts of endangered species
                    </li>
                    <li>
                        Firearms and firearms accessories
                    </li>
                    <li>
                        Nicotine, including vaping products
                    </li>
                    <li>
                        Online gambling sites
                    </li>
                    <li>
                        Pharmaceuticals
                    </li>
                    <li>
                        Sex or escort services
                    </li>
                    <li>
                        Unlicenced medical services
                    </li>
                    <li>
                        Human smuggling
                    </li>
                </ul>
                {PolicyNotExhaustive}
            </div>
            <div className="mt-24">
                <h2>
                    Additional Policies
                </h2>
                <h4 className="font-bold text-primary-900">
                    Inactive Accounts
                </h4>
                <p>
                    Lectern users are expected to be active members within the Lectern community. If an account if 
                    found to be overly inactive, it may be reclaimed by Lectern without notice. Inactivity is considered 
                    as:
                </p>
                <ul className="list-disc ml-8">
                    <li>
                        Not signing in for at least six months
                    </li>
                    <li>
                        Never uploading video content
                    </li>
                    <li>
                        Not actively partaking in watching or commenting on videos
                    </li>
                </ul>
                <h4 className="font-bold text-primary-900">
                    Encouraging Community Standards Violations
                </h4>
                <p>
                    If you post content that encourages users to violate our Community Standards, the content may be 
                    removed and your account may be terminated.
                </p>
                <h4 className="font-bold text-primary-900">
                    Posting Previously Removed Content
                </h4>
                <p>
                    If you post content previously removed for violating our Community Standards, or content from 
                    creators who have had their accounts terminated under these Standards, the content may be removed 
                    and your account may be terminated.
                </p>
            </div>
        </div>
        </>
    )
}
