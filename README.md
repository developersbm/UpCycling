# Upcycling App

## Overview

The Upcycling App empowers users to transform everyday materials into new and creative items. By inputting various materials (like tape, paper, and cardboard), users can discover innovative project ideas such as building a boat from those materials.

## Key Features

* **Promotes Recycling**: Encourages users to recycle and repurpose materials, reducing waste and saving money.
* **Creative Projects**: Users can create projects by specifying a list of materials ("ingredients") and receive suggestions for new items or projects they can make.
* **AI Assistance**:
    * Users can ask AI for additional material suggestions or generate images of potential creations using OpenAI’s DALLE.
    * They can also browse online for inspiration based on specific topics like clothes or cars.
* **Built-in Social Media**: Share your upcycling projects with a community of creators directly within the app.

## What You Can Do

* **Create a Project**: Start by inputting images of your materials to create something new.
* **Explore AI Features**: Enhance your project with AI-generated ideas or images.
* **Share With Others**: Showcase your project and discover other creations through the app's social media platform.

## Technical Infrastructure

* **AWS Cognito**: Manages user authentication.
* **AWS Amplify**: Handles backend operations and connects with Amazon Lex for chatbot functionality and AWS Lambda.
* **AWS Rekognition**: Recognizes and categorizes materials in user-uploaded files.
* **AWS S3**: Stores user-uploaded images securely.
* **AWS DynamoDB**: Maintains user data, including usernames, emails, posts, likes, and chat information.
* **Amazon Lex**: Provides intelligent chatbot interaction.
* **OpenAI's DALLE**: Generates images from AI models, enhancing creativity within the app.

## Monetization Strategies

* **Targeted Ads**: Display ads based on user behavior and project types.
* **Subscriptions**: Offer premium features, including advanced AI tools.
* **Token System**: Allow users to purchase tokens to use generative AI features like creating images with DALLE.
