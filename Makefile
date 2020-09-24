app:
	docker-compose down
	sleep 1
	docker-compose build
	sleep 3
	docker-compose up