import { expect } from "chai";
import fetch from "isomorphic-fetch";

const url = `${process.env.npm_config_url
  ? process.env.npm_config_url
  : "http://localhost:3000/messages"}`;

describe("Integration Tests#Messages", () => {
  it("create", () => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({ id: "1", message: "test message" })
    })
      .then(response => response.json())
      .then(result => {
        expect(result.message.message).to.be.equal("test message");
      });
  });
  it("update", () => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({ message: "test message" })
    })
      .then(response => response.json())
      .then(result =>
        fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            ...result.message,
            message: "updated test message"
          })
        })
      )
      .then(response => response.json())
      .then(result => {
        expect(result.message.message).to.be.equal("updated test message");
      });
  });
  it("get", () => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({ message: "test message" })
    })
      .then(response => response.json())
      .then(result =>
        fetch(`${url}/${result.message.id}`)
          .then(response => response.json())
          .then(result => {
            expect(result.message).to.be.equal("test message");
          })
      );
  });
  it("delete", () => {
    let messageId;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({ message: "test message" })
    })
      .then(response => response.json())
      .then(result => {
        messageId = result.message.id;
        return fetch(`${url}/${result.message.id}`, { method: "DELETE" })
          .then(response => response.json())
          .then(result => {
            expect(result.message).to.be.undefined;
            fetch(`${url}/${messageId}`)
              .then(response => response.json())
              .then(result => {
                expect(result.message).to.be.undefined;
              });
          });
      });
  });
});
