# CLOUD RESUME CHALLENGE

It's a [16-step challenge](https://cloudresumechallenge.dev/instructions/) that requires the creation of a website to show my resume with a visitor counter that shows how many people have accessed the site. API Gateway and DynamoDB are used to operate the view counter, the site is hosted and delivered over HTTPS using S3 bucket and CloudFront distribution respectively. The resources needed were defined in an AWS Serverless Application Model (SAM) also know as Infrastructure as Code, this saves you some time. Here I describe how I developed and deploy my portfolio website. Hopefully this will help someone to build a website of their own. Now there are many ways to achieve the same result. This post is my method of the Dev and Deploy process.

I accomplished this by doing the following:

- To expose the website, I bought a custom domain from namecheap.com and configured the same via Route 53. CNAME records are added to the Route 53 hosted zone for the custom domain. The CNAME records point to the Cloudfront distribution. To serve the website over https, I also generated a certificate from ACM.
- Domain was chigozirimeke.me, subdomain was \*.chigozirimeke.me
- Set up a domain to have name servers of AWS account
- Stored static resume page on an S3 bucket
- Created an Origin Access Identity and associated it with my cloudfront distribution
- Configured S3 permissions to allow users access the website using the OAI
- Provisioned resources using the Serverless Application Model with Cloud formation templates(identation was a big problem here so pay close attention)
- SAM lets you choose the runtime environment for your applications and you can use templates from existing applications.

## Overall Architecture

### Front-end

The Front-end is built with startbootstrap-resume [startbootstrap-resume](https://github.com/StartBootstrap/startbootstrap-resume). The front-end communicates with the backend by calling API endpoints. The components used in the frontend architecture are outlined below:

- _S3 bucket - have to turn on web hosting_  
  This stores the static files, index.html and css files and made private. Permissions were given to an Origin Access Identity so that users can only access the website through the OAI
- _CloudFront Distribution_
  This is the Content Delivery Network which is displaying the website hosted in the bucket. An Origin Access Identity was created and permissision

- _Route 53 and Hosted Zone:_
  Once the both of the deployments are done, I still have to expose the website over my custom domain. To expose the Cloudfront endpoint via the custom domain, I added two Alias records in the Route 53 hosted zone for my custom domain. The two records are to cover the two domain records:  
  I also had to provision a certificate in ACM so the website endpoint can be served over https.

## Features

- Import a HTML file and watch it magically convert to Markdown
- Drag and drop images (requires your Dropbox account be linked)
- Import and save files from GitHub, Dropbox, Google Drive and One Drive
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is \*actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Tech

Dillinger uses a number of open source projects to work properly:

- [AngularJS] - HTML enhanced for web apps!
- [Ace Editor] - awesome web-based text editor
- [markdown-it] - Markdown parser done right. Fast and easy to extend.
- [Twitter Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Gulp] - the streaming build system
- [Breakdance](https://breakdance.github.io/breakdance/) - HTML
  to Markdown converter
- [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
on GitHub.
