# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc
mocha := node_modules/.bin/mocha

# Docker
image_name := library
image_tag := library
image_repo := brontosaurus/library

.IGNORE: clean-linux kill stop

main: run

dev:
	@echo "[INFO] Building for development"
	@NODE_ENV=development $(tsc) --p $(dev)

build: clean-linux
	@echo "[INFO] Building for production"
	@NODE_ENV=production $(tsc) --p $(build)

run: dev
	@NODE_ENV=development \
	BRONTOSAURUS_LIBRARY_CONFIG="./example/config.json" \
	BRONTOSAURUS_LIBRARY_PATH="http://localhost:9000" \
	PORTAL_PATH=$(PP) \
	node dist/index.js

p-run: dev
	@NODE_ENV=production \
	node dist/index.js

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test $(mocha)

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha)

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

clean: clean-linux
	@echo "[INFO] Cleaning release files"
	@NODE_ENV=development $(ts_node) script/clean-app.ts

clean-linux:
	@echo "[INFO] Cleaning dist files"
	@rm -rf app
	@rm -rf .nyc_output
	@rm -rf coverage

docker: build
	@echo "[INFO] Create docker image"
	@docker build -t $(image_name) -f Dockerfile ./

kill:
	@echo "[INFO] Killing docker image"
	@docker kill $(image_tag)

stop: kill
	@echo "[INFO] Stopping docker image"
	@docker rm $(image_tag)

tag:
	@echo "[INFO] Mark docker tag"
	@docker tag $(image_name) $(image_repo):0.2.0

publish: stop tag
	@echo "[INFO] Publish docker image"
	@docker push $(image_repo):0.2.0
