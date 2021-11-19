.PHONY: docker
docker:
	docker build . -t postgraphile-multisource:latest
