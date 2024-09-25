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
	npm run app:dist
	
run:
	npm run start