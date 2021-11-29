.PHONY: docker
docker:
	docker build . -t postgraphile-multiserver_graphql:latest
