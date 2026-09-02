import { describe, it, expect } from "vitest";
import { isValidCardNumber } from "../src/services/card-validation.service.js";


describe("isValidcardNumber", () => {
  it("returns true for a valid card number", () => {
    const result = isValidCardNumber("4111111111111111");
    expect(result.isValid).toBe(true);
  });

  it("rejects a number shorter than 13 digits", () => {
    const result = isValidCardNumber("12345");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("outside bound");
  });

  it("rejects a number longer than 19 digits", () => {
    const result = isValidCardNumber("12345678901234567890");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("outside bound");
  });

  it("rejects non-numeric characters", () => {
    const result = isValidCardNumber("4111abcd11111111");
    expect(result.isValid).toBe(false);
  });

  it("rejects all-repeated digits", () => {
    const result = isValidCardNumber("1111111111111");
    expect(result.isValid).toBe(false);
    expect(result.message).toContain("repetitive");
  });

  it("rejects a number that fails the Luhn check", () => {
    const result = isValidCardNumber("4111111111111112");
    expect(result.isValid).toBe(false);
  });

  it("trims leading/trailing whitespace before validating", () => {
    const result = isValidCardNumber("  4111111111111111  ");
    expect(result.isValid).toBe(true);
  });
});