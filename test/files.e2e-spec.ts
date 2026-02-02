import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import path from "path";
import request from "supertest";

describe("Files Upload (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /files/upload (local) success', async () => {
        const filePath = path.join(__dirname, 'test-file.png');
        //console.log(filePath);


        return request(app.getHttpServer())
            .post('/files/upload')
            .attach('file', filePath)
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('filename');
                expect(res.body.mimetype).toBe('image/png');
            });
    });

    it('POST /files/upload invalid type', async () => {
        const filePath = path.join(__dirname, 'test-file.txt');

        return request(app.getHttpServer())
            .post('/files/upload')
            .attach('file', filePath)
            .expect(400); // BadRequestException du fileFilter
    });

    it('POST /files/uploads3 (S3) success', async () => {
        const filePath = path.join(__dirname, 'test-file.png');

        return request(app.getHttpServer())
            .post('/files/uploads3')
            .attach('file', filePath)
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('fileName');
                expect(res.body.type).toBe('image/png');
            });
    });


});