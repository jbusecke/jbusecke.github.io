---
layout: /src/layouts/MarkdownPostLayout.astro
title: "To be or not to be a software engineer in climate science?"
author: Julius Busecke
description: "If and when should climate scientists learn software engineering..."
pubDate: 2024-07-12
image:
  url: "https://images.unsplash.com/photo-1573496774379-b930dba17d8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNvZnR3YXJlJTIwZW5naW5lZXJ8ZW58MHx8MHx8fDA%3D"
  alt: "a"
languages: []
tags:
  [
   "Academia", "Software Engineering", "Career"
  ]
---

Nobody questions the statement: “You need to learn math to be a physicist”. So why do a lot of people push back when I say “You need to learn software engineering to be a physicist”?  

I have heard the phrase “I am not a software engineer” in more conversations than I am able to count after 10+ years of being a climate scientist and software engineer . This usually happens in the context of me trying to convince climate science colleagues of the value of proper software engineering practices for students, postdocs and faculty. 

I actually agree with the statement itself. It is as true as saying “I am not a mathematician” (for all scientists **except mathematicians of course**). But that is where the equivalence usually ends. If I tell somebody in climate science that “I'm not a mathematician and thus I do not want or need to learn calculus” I would - rightfully so - be told that I was dead wrong, because having proper basics in math will undoubtedly help you understand and probe the physical sciences. 

But in essence this is exactly what we are asking researchers to do with regard to software engineering! *We assume that they might know algebra, and then they can just pick up calculus along the way*. It is the norm, not the exception, that new climate science students will enter the research and have to learn multiple new code bases (for e.g. numerical simulations, and data analysis) while also getting a vague mission to make everything ‘reproducible’ at the same time as they are supposed to focus deeply to build their research expertise.

This is an unrealistic expectation that very directly leads to unrealized potential to accelerate and democratize (climate) science in the service of everyone. If we really want to accelerate science we should teach software engineering next to math in the core science curriculum and turn it from an additional burden on researchers to a skill that is ready to be deployed for science, just like math.

I am saying this because I have been learning Software Engineering since the latter years of my PhD. It is now part of my job and I have seen the potential realized as it enables more fruitful collaboration (resulting in [exciting science](https://eartharxiv.org/repository/view/7144/)) but it took me years of learning all of these skills, and I am sure my scientific output (if you only count papers) has suffered from it.

I have stuck to learning about tech because I am really into the technical aspects of software engineering and I had the privilege to be supported for technical work specifically as a Research Scientist in [Ryan Abernathey’s lab]([https://ocean-transport.github.io/cds_lab.html](https://ocean-transport.github.io/cds_lab.html)) and recently at [LEAP]([https://leap.columbia.edu/](https://leap.columbia.edu/)) and [m2lines]([https://m2lines.github.io/](https://m2lines.github.io/)). 

But other researchers should not and under most circumstances will not be able to invest this large amount of time into software engineering. As a comparison I think I am a decent scientist despite being in no way very good or enthusiastic about math. I however have the necessary understanding to know where I can find guidance, basic concepts, and an overview that I am confident I would be able to use my math to further my science if needed, and that should be how people should think about software engineering.

The important thing to realize here is neither math nor software engineering are “our” specialty in science, but they are indispensable **tools** to help us conduct science. And we need a minimum proficiency in both. 

While I have learned many different things along this winded path, and requirements might very much differ on your specialty, I think there are three general high level concepts that enabled a step change improvement in the way I am able to conduct science via code with confidence:

- Version control - Software always evolves. Version control (e.g. git) gives you the confidence to both advance your ideas and code fast, while keeping track of complex dependencies between libraries. 

- Unit Tests - The only way you can actually trust yourself and others to modify code over time, since you can check against expected results of parts of your code. 

- Continuous Integration - Running tests and releasing code in an automated and regular fashion guarantees that you detect issues early and even if they surface later, coupled with version control you will always be able to identify the regression in your code. Good luck doing that with `my_script_almost_final.py` and `my_script_actually_final_almost_last_change.py` 😁.

> Note that these principals are different from many classes that specifically teach [research specific tools]([https://earth-env-data-science.github.io/intro.html](https://earth-env-data-science.github.io/intro.html)) to graduate students - these are specifically relevant for a discipline and should be taught in each field separately.

And I believe this sort of base is what would help many scientists with regards to software engineering. If you learned the fundamentals early, you can easily join larger collaborative efforts, pick up on the techniques and specifics of the tools used in your field of research more independently, and be a more efficient scientist overall. I personally also feel that being able to write code that I will be able to reuse and improve along my science journey has been key to maintaining my mental health. I know that I will not just rewrite methods, and implement different bugs, but instead I can improve my code and pick up old projects much easier with less duplicated efforts. In science the perhaps most critical user of your software is always your future self - whether it’s in a month or years from now.

I believe both math and software engineering are essential skills to practice science, and the academic world would be better off treating and teaching them with the same priority well before students embark on their research journey, instead of during the research phase.

I often think about how much I would have profited if I had known about version control, unit tests, and continuous integration since college, but it is too late for me now. I will do my darndest to make this learning experience easier for everyone who is already conducting science, but as a community we really have to think more strategically in the long term. So for the sake of (climate) science, lets teach proper software engineering to students early...or at the very least lets stop arguing about whether climate scientists are software engineers 😉
