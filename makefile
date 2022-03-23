install:
	./scripts/install.sh

up:
	./vendor/bin/sail up -d

down:
	./vendor/bin/sail down

destroy:
	./vendor/bin/sail destroy

sh:
	./vendor/bin/sail root-shell

test:
	./vendor/bin/sail test --testdox

migrate:
	./vendor/bin/sail artisan migrate:fresh
