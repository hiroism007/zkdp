init:
	npm i
	gcloud config set project road2web3
	gcloud auth configure-docker
	gcloud config set run/platform managed
	gcloud config set run/region us-west1

local:
	docker compose up

build:
	docker build --platform linux/amd64 -t road2web3 .

tag:
	docker tag road2web3:latest gcr.io/road2web3/api

push:
	docker push gcr.io/road2web3/api

init-deploy:
	gcloud run deploy api --image gcr.io/road2web3/api --platform managed --region us-west1 --update-secrets INFURA_PROJECT_ID=infura-project-id:latest,INFURA_PROJECT_SECRET=infura-project-secret:latest,OPENSEA_API_KEY=opensea-apikey:latest,API_KEY=api-key:latest

deploy:
	gcloud run deploy api --image gcr.io/road2web3/api --platform managed

go:
	make build
	make tag
	make push
	make deploy

build-remote-deploy:
	gcloud builds submit --project road2web3 --tag gcr.io/road2web3/api
	gcloud run deploy --image gcr.io/road2web3/api --platform managed
