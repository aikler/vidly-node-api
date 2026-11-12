const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.insertMany([{ name: "genre1" }, { name: "genre2" }]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe(" GET /:id", () => {
    it("should return 404 if !genre", async () => {
      const res = await request(server).get("/api/genres/12345");
      expect(res.status).toBe(404);

      /*  await Genre.insertMany([{ name: "genre1" }, { name: "genre2" }]);
      const res = await request(server).get(
        "/api/genres/6ae38c9f8af10a70e5ad2fa4",
      );
      expect(res.status).toBe(404); */
    });

    it("should return genre if exist", async () => {
      const genre = new Genre({ name: "genre5" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      //expect(res.body).MatchObject(genre);// false because _id as object not a string
      expect(res.body).toHaveProperty("name", genre.name);

      /* await Genre.insertMany([{ name: "genre3" }, { name: "genre4" }]);
    const res = await request(server).get(
      "/api/genres/6ae38fbeb6aed37edf41434f",
    );
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("genre3"); */
    });
  });

  describe("POST /", () => {
    it("should return 401 if client is not logged in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is invalid. Name is at least 5 character ", async () => {
      const token = new User().getAuthToken();
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "1234" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if Name is more than 50 character ", async () => {
      const token = new User().getAuthToken();
      const name = new Array(52).join("a");
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid ", async () => {
      const token = new User().getAuthToken();
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "genre1" });

      const genre = await Genre.find({ name: "lol" });
      expect(genre).not.toBeNull();
    });

    it("should return the genre if it is valid ", async () => {
      const token = new User().getAuthToken();
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "genre1" });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
