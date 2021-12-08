# FIDS Frontend - A sample frontend for FlightAware Data APIs

## QuickStart
Head on over to [FlightAware Firestarter](https://github.com/flightaware/firestarter) and follow the quickstart guide there. The documented commands will pull this FIDS Frontend as a ready to use Docker container that will present flight data from the Firestarter backend.

## fids-frontend
FlightAware FIDS is a small webapp powered by a backend like the fids-backend service in FlightAware Firestarter. You can use it to browse flight data by airport, presenting flights similarly to how you'd see them on a flight information display system (FIDS). Detailed information for individual flights can also be viewed.

This service is intended to be run in the context of a service like Firestarter. The nginx proxy configuration assumes there will be a locally available service at the "fids-backend" hostname. If running the fids-frontend as a stand-alone service the nginx proxy_pass configuration will need to be changed to point to the location of your backend service.

Once running, the service is accessible at http://localhost:8080 in your web browser (if not running Docker locally, use the Docker host's address).