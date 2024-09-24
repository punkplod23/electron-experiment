install:
	npm install
	./node_modules/.bin/eslint --init
	
update:
	npm update

rebuild:
	npm rebuild

generate-test-csv:
	echo "This will take some time make a coffee"
	python ./generate-csv.py

lint:	
	npm run lint

test:	
	exit()

build:
	exit()
	gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""

build-add-paths:


run:
	npm run start