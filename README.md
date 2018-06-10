Currently a "hello world" level speech transcription application using Google Cloud's API.


Prerequisites:

* NodeJs - version 6.14.2 or newer is recommended

* Google Cloud Platform account - you may create an account at https://cloud.google.com


Installation & setup steps:

1. Clone this repository

2. Set up a Google Cloud Platform Console project -

    2a. Create or select a project

    2b. Enable the Google Cloud Speech-to-Text API for your project

    2c. Create a service account

    2d. Download a private key as JSON

3. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the file path of the JSON file containing your account key (from step 2d above)

    Example for Linux: `export GOOGLE_APPLICATION_CREDENTIALS="/home/user/service-account-file.json"`

4. Install and initialize Google Cloud SDK - steps here: https://cloud.google.com/sdk/docs

5. Run `npm install && npm run start`

6. Enjoy! Press CTRL-C anytime to quit
