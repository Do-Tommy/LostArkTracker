import mongoose from "mongoose";
import { User } from "../mongoose/schemas/user";
import { register } from "../handlers/auth";

jest.mock("../mongoose/schemas/user.js");
jest.mock("bcrypt", () => ({
  hash: (password, salt) => `${password}_hashed`
}))

const mockRequest = {
  body: {
    username: "hello",
    password: "test"
  }
}


const mockResponse = {
  status: jest.fn(() => mockResponse),
  send: jest.fn(),
  sendStatus: jest.fn()
};

describe("Testing Auth", () => {
  it("Creates user and stores a hashed password", async () => {
    const saveMethod = jest.spyOn(User.prototype, 'save').mockResolvedValueOnce({
      id: 1,
      username: "hello",
      password: "test_hashed"
    });

    await register(mockRequest, mockResponse);

    expect(User).toHaveBeenCalledWith({
      username: "hello",
      password: "test_hashed"
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(saveMethod).toHaveBeenCalled();
  });

  it("Sends 400 error when there is an error", async () => {
    const saveMethod = jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.reject('Failed to create user'));

    await register(mockRequest, mockResponse);

    expect(saveMethod).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
  });
});