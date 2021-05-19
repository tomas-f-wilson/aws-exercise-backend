To install the dependencies

```
yarn
```

Then add your mysql password to an `.env` file and run

```
export $(cat .env | xargs)
```

To run this project in serverless offline:

```
yarn sls:offline
```
