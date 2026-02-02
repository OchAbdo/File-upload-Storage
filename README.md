# File upload + Storage
This project was generated using NestJS CLI version 11.0.10

## Description
A NestJS application demonstrating a robust file upload and storage service, with proper validation, metadata handling, and a clean architecture approach.
The application supports local and S3-compatible storage using MinIO, fully containerized with Docker Compose.

This project includes:

- File upload service with size and type constraints
- Metadata extraction and storage (filename, size, mimetype)
- Local file storage support
- MinIO (S3-compatible) integration for object storage
- Unit test and e2e test
- Docker Compose setup for NestJS + MinIO
- Error handling for invalid uploads
- Ready-to-run containerized development environment



### Development server
To start a local development server, run:
``` bash
$ npm install
$ npm run start:dev
```
API available at: http://localhost:3000


### Optional: Docker
Production (docker-compose.yml)

```
# Used for production-ready builds.
$ docker-compose -f docker-compose.yml up -d --build

# Stop containers.
$ docker-compose -f docker-compose.yml down

```



### Available endpoints
Task endpoints : 

```
# Add (local)
POST /files/upload

# Body Example :
Form-data
```
```
# Add (minIO)
POST /files/uploads3

# Body Example :
Form-data
```

### Additional Resources
For more information on using the NestJs, including detailed command references, visit the https://docs.nestjs.com page.

The project can also be run using Docker, for more details, see the https://docs.docker.com page.