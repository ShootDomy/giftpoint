import { describe, it, expect, jest } from "@jest/globals";

const mockFunctions = {
  crearGift: jest.fn(),
  getAllGiftcardsByUser: jest.fn(),
  getGiftByIdAndUser: jest.fn(),
  actualizarGift: jest.fn(),
  eliminarGift: jest.fn(),
  transferirAmountGift: jest.fn(),
  getGiftById: jest.fn(),
};

await jest.unstable_mockModule(
  "../../src/services/giftcard.service.js",
  () => mockFunctions
);

const { crearGiftcard, getGiftcardsByUser } = await import(
  "../../src/controllers/giftcard.controller.js"
);
// const giftcardService = await import("../../src/services/giftcard.service.js");

describe("GiftcardsController", () => {
  // LIMPIEZA DE MOCKS
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});

    mockFunctions.crearGift.mockReset();
    mockFunctions.getAllGiftcardsByUser.mockReset();
  });

  afterAll(() => {
    // RESTAURAR CONSOLE.LOG DESPUES DE TODOS LOS TESTS
    console.log.mockRestore();
  });

  describe("crearGiftcard", () => {
    it("debería responder con 201 y la giftcard creada", async () => {
      const mockGiftcard = {
        id: "1b7b93a9-b07c-4d94-bbf1-7c4768d51d30",
        name: "Card 1",
        amount: 10.5,
        currency: "USD",
        expiration_date: "2025-12-02",
        user_id: "b4a9e632-869f-4702-bf4c-cdf7562eeb58",
      };

      // Usa el mock correctamente
      mockFunctions.crearGift.mockResolvedValue(mockGiftcard);

      const mockReq = {
        body: { ...mockGiftcard },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearGiftcard(mockReq, mockRes);

      expect(mockFunctions.crearGift).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockGiftcard);
    });

    it("debería validar el formato del body antes de crear", async () => {
      const mockReq = {
        body: {
          // Body incompleto (faltan campos requeridos)
          name: "Card Incompleta",
          amount: 10.5,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearGiftcard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("faltan campos requeridos"),
      });
    });

    it("debería rechazar montos negativos", async () => {
      const mockReq = {
        body: {
          name: "Card Inválida",
          amount: -10.5,
          currency: "USD",
          expiration_date: "2025-12-02",
          user_id: "b4a9e632-869f-4702-bf4c-cdf7562eeb58",
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearGiftcard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("El monto debe ser positivo"),
      });
    });

    it("debería validar el formato de fecha", async () => {
      const mockReq = {
        body: {
          name: "Card Fecha Inválida",
          amount: 10.5,
          currency: "USD",
          expiration_date: "02-12-2025", // Formato incorrecto
          user_id: "b4a9e632-869f-4702-bf4c-cdf7562eeb58",
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearGiftcard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Formato de fecha inválido"),
      });
    });

    it("debería validar el código de moneda", async () => {
      const mockReq = {
        body: {
          name: "Card Moneda Inválida",
          amount: 10.5,
          currency: "US", // Código inválido
          expiration_date: "2025-12-02",
          user_id: "b4a9e632-869f-4702-bf4c-cdf7562eeb58",
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearGiftcard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Código de moneda inválido"),
      });
    });

    it("debería validar que user_id sea un UUID válido", async () => {
      const mockReq = {
        body: {
          name: "Card UUID Inválido",
          amount: 10.5,
          currency: "USD",
          expiration_date: "2025-12-02",
          user_id: "no-es-un-uuid", // ID inválido
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearGiftcard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("user_id debe ser un UUID válido"),
      });
    });

    it("debería manejar errores del servicio al crear giftcard", async () => {
      const errorMessage = "Error de base de datos";
      mockFunctions.crearGift.mockRejectedValue(new Error(errorMessage));

      const mockReq = {
        body: {
          name: "Card Error",
          amount: 10.5,
          currency: "USD",
          expiration_date: "2025-12-02",
          user_id: "b4a9e632-869f-4702-bf4c-cdf7562eeb58",
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearGiftcard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: errorMessage,
      });
      expect(console.log).toHaveBeenCalledWith("error", expect.any(Error));
    });
  });

  describe("getGiftcardsByUser", () => {
    it("debería responder con las giftcards del usuario", async () => {
      const mockGiftcards = [
        {
          id: "1b7b93a9-b07c-4d94-bbf1-7c4768d51d30",
          name: "Card 1",
          amount: 10.5,
          currency: "USD",
          expiration_date: "2025-12-02",
          user_id: "b4a9e632-869f-4702-bf4c-cdf7562eeb58",
        },
      ];

      mockFunctions.getAllGiftcardsByUser.mockResolvedValue(mockGiftcards);

      const mockReq = {
        params: { id: "b4a9e632-869f-4702-bf4c-cdf7562eeb58" },
        query: { idSource: "b4a9e632-869f-4702-bf4c-cdf7562eeb58" },
      };
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getGiftcardsByUser(mockReq, mockRes);

      expect(mockFunctions.getAllGiftcardsByUser).toHaveBeenCalledWith(
        mockReq.params.id,
        mockReq.query.idSource
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockGiftcards);
    });

    it("debería validar que el user_id sea un UUID válido", async () => {
      const mockReq = {
        params: { id: "no-es-un-uuid" }, // ID inválido
        query: { idSource: "b4a9e632-869f-4702-bf4c-cdf7562eeb58" },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getGiftcardsByUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("user_id debe ser un UUID válido"),
      });
    });

    it("debería responder con array vacío si no hay giftcards", async () => {
      mockFunctions.getAllGiftcardsByUser.mockResolvedValue([]);

      const mockReq = {
        params: { id: "b4a9e632-869f-4702-bf4c-cdf7562eeb58" },
        query: { idSource: "b4a9e632-869f-4702-bf4c-cdf7562eeb58" },
      };
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getGiftcardsByUser(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith([]);
    });

    it("debería manejar errores del servicio al obtener giftcards", async () => {
      const errorMessage = "Error al consultar la base de datos";
      mockFunctions.getAllGiftcardsByUser.mockRejectedValue(
        new Error(errorMessage)
      );

      const mockReq = {
        params: { id: "b4a9e632-869f-4702-bf4c-cdf7562eeb58" },
        query: { idSource: "b4a9e632-869f-4702-bf4c-cdf7562eeb58" },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getGiftcardsByUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: errorMessage,
      });
      expect(console.log).toHaveBeenCalledWith("error", expect.any(Error));
    });
  });
});
