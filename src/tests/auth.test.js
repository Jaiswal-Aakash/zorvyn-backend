const request = require("supertest");

const app = require("../app");

describe("Auth API", () => {
    let token;

    const testUser = {
        email: `test${Date.now()}@example.com`,
        password: "password123",
    };

    it("should register a user", async () => {
        const res = await request(app).post("/api/auth/register").send(testUser);
        expect(res.status).toBe(201);
        expect(res.body.email).toBe(testUser.email);
    });

    it("should login user", async () => {
        const res = await request(app)
          .post("/api/auth/login")
          .send(testUser);
    
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        
        token = res.body.token;
      });

      it("should fail with wrong password", async () => {
        const res = await request(app)
          .post("/api/auth/login")
          .send({
            email: testUser.email,
            password: "wrongpass",
          });
    
        expect(res.statusCode).toBe(401);
      });

      it("should access protected route", async () => {
        const res = await request(app)
          .get("/api/dashboard/summary")
          .set("Authorization", `Bearer ${token}`);
      
        expect(res.statusCode).toBe(200);
      });
    
})