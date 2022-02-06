init:
	npm i
	gcloud config set project zkdoor
	gcloud auth configure-docker
	gcloud config set run/platform managed
	gcloud config set run/region us-west1

build:
	docker build --platform linux/amd64 -t zkdoor .

tag:
	docker tag zkdoor:latest gcr.io/zkdoor/api

push:
	docker push gcr.io/zkdoor/api

init-deploy:
	gcloud run deploy api --image gcr.io/zkdoor/api --platform managed --region us-west1

deploy:
	gcloud run deploy api --image gcr.io/zkdoor/api --platform managed

go:
	make build
	make tag
	make push
	make deploy
