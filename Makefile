COMPOSE_PROJECT_NAME ?= academic-homepage
IMAGE_NAME ?= academic-homepage
IMAGE_TAG ?= latest
CONTAINER_NAME ?= academic-homepage
HOST_PORT ?= 8080
COMPOSE ?= docker compose

.PHONY: help docker-build docker-run docker-up docker-down docker-restart docker-logs docker-check

help:
	@printf "Available targets:\n"
	@printf "  make docker-build   Build the image\n"
	@printf "  make docker-run     Run the container directly\n"
	@printf "  make docker-up      Start with docker compose\n"
	@printf "  make docker-down    Stop compose services\n"
	@printf "  make docker-restart Restart compose services\n"
	@printf "  make docker-logs    Tail compose logs\n"
	@printf "  make docker-check   Check the deployed homepage endpoint\n"

docker-build:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

docker-run:
	docker run --rm --name $(CONTAINER_NAME) -p $(HOST_PORT):80 $(IMAGE_NAME):$(IMAGE_TAG)

docker-up:
	COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) IMAGE_NAME=$(IMAGE_NAME) IMAGE_TAG=$(IMAGE_TAG) CONTAINER_NAME=$(CONTAINER_NAME) HOST_PORT=$(HOST_PORT) $(COMPOSE) up -d --build

docker-down:
	COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) IMAGE_NAME=$(IMAGE_NAME) IMAGE_TAG=$(IMAGE_TAG) CONTAINER_NAME=$(CONTAINER_NAME) HOST_PORT=$(HOST_PORT) $(COMPOSE) down

docker-restart:
	COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) IMAGE_NAME=$(IMAGE_NAME) IMAGE_TAG=$(IMAGE_TAG) CONTAINER_NAME=$(CONTAINER_NAME) HOST_PORT=$(HOST_PORT) $(COMPOSE) down
	COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) IMAGE_NAME=$(IMAGE_NAME) IMAGE_TAG=$(IMAGE_TAG) CONTAINER_NAME=$(CONTAINER_NAME) HOST_PORT=$(HOST_PORT) $(COMPOSE) up -d --build

docker-logs:
	COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) IMAGE_NAME=$(IMAGE_NAME) IMAGE_TAG=$(IMAGE_TAG) CONTAINER_NAME=$(CONTAINER_NAME) HOST_PORT=$(HOST_PORT) $(COMPOSE) logs -f homepage

docker-check:
	curl -I http://127.0.0.1:$(HOST_PORT)
