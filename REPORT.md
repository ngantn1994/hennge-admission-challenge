# My process of completing the challenge

Hello, my name is Ngan and this is my process of completing this interesting challenge.

## 1. VueJS

I've been working with vanilla JS (and jQuery) for a long time, and I learned VueJS just recently, but I fell in love with the feeling of using it and I think it's suitable to use for this challenge.

## 2. Project structure

Because the list of mails should be fetched from the server, for now, I decided to put the sample emails in a js file (an object which is similar to the JSON can be received from the server-side) called "mail.js". I thought about putting it on my server and then calling the API to get it too, but since I don't know the back-end structure, leaving it simple might be better.

![](https://ntuyetngan.com/public/hennge-admission-challenge/sample-2.PNG)

Based on the given design, I decided to divide the parts into child components and approach the mobile-UI first.

![](https://ntuyetngan.com/public/hennge-admission-challenge/sample-1.PNG)

Thanks to Vue, it's easy to build the parts each by each, so it does not take long to build up the codebase. Because the MailContent is a separate component, it's not hard to add the body boxes to display the body of the emails, so I can complete mission 2 quickly.

## 3. Sorting function and filter by date

This is the part I spent the most time on, to validate the input and format the date correctly. I did not realize I should make the column chosen by sort type bold at first, so I made the sender bold by default (silly me). Or I only realized that the month + day format is only applied to emails of this year after looking at the PC UI (because the sp UI does not have an email from last year). I hope that I did not miss any other small details, but if I do, I hope that I can find it out later.

## 4. Others small details

And the part to custom the small details here and there cost me a little more time, too. Like at first when hiding the email body, I did not give it a "font-size" of 0px, so an unwanted scroll appears when it should not. Or to trigger the search when pressing enter after typing in. I also added a 'resize' event to make the component changes on responsive testing (but unfortunately it does not work while changing the size of the developer box only, without choosing the "Responsive" mode).

I also changed the code to not hard code the JSON properties but to read it from const instead (in case of the JSON changes and the properties changes). There might be better ways to not hard code the current responsive values too but I could not think of it right now, so I'll continue to think about it.

## 5. Mission 4 - submission

It took me many tries to finally success in submitting it. I modified the given Java file from the RFC document, but the result was wrong.

I can finally do it after modify two things:
- get the first 10 digits from the hash instead of the last 10 like the example.
- use the original hexa String instead of trying to repeat it until it has 64 bytes like the example (the given example string for SHA-512 was 64-bytes string).

With the right TOTP, submitting it using Postman was easy.

**It was really fun coding it, and I would love to join in more challenges in the future.**
**Thank you for the time to read my application, I really appreciate it.**