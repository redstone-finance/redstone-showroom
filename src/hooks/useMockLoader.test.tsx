import { renderHook, act } from "@testing-library/react";
import { useMockLoader } from "./useMockLoader";

jest.useFakeTimers();

describe("useMockLoader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an object with text, isMockLoading, setIsMockLoading, and startMockLoader", () => {
    const { result } = renderHook(() => useMockLoader());
    expect(result.current.text).toBeDefined();
    expect(result.current.isMockLoading).toBe(false);
    expect(result.current.setIsMockLoading).toBeDefined();
    expect(result.current.startMockLoader).toBeDefined();
  });

  it("should start loading when startMockLoader is called", () => {
    const { result } = renderHook(() => useMockLoader());
    act(() => {
      result.current.startMockLoader();
    });
    expect(result.current.isMockLoading).toBe(true);
  });

  it("should set isMockLoading to false when setIsMockLoading is called", () => {
    const { result } = renderHook(() => useMockLoader());
    act(() => {
      result.current.setIsMockLoading(true);
    });
    expect(result.current.isMockLoading).toBe(true);
    act(() => {
      result.current.setIsMockLoading(false);
    });
    expect(result.current.isMockLoading).toBe(false);
  });

  it("should cycle through loader texts", async () => {
    const { result } = renderHook(() => useMockLoader());
    act(() => {
      result.current.startMockLoader();
    });

    expect(result.current.text).toBe("Fetching price data");

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1000);
    });
    expect(result.current.text).toBe("Sending transaction with fetched price data");

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1000);
    });
    expect(result.current.text).toBe("Receiving price from smart contract");
  });
});
