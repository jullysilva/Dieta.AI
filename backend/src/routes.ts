import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "Fastify";
import { CreateNutritionController } from "./controllers/CreateNutritionController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      '```json\n{\n  "nome": "Mateus",\n  "sexo": "masculino",\n  "idade": 28,\n  "altura": 158,\n  "peso": 84,\n  "objetivo": "emagrecer",\n  "refeicoes": [\n    {\n      "horario": "7:00",\n      "nome": "Cafe da manha",\n      "alimentos": [\n        "1 copo (200ml) de leite desnatado",\n        "1/2 grao de cereais integrais",\n        "1 fruta (maça, pera ou banana)"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da manha",\n      "alimentos": [\n        "1 iogurte desnatado",\n        "1 punhado de castanhas"\n      ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoco",\n      "alimentos": [\n        "150g de carne grelhada (frango, peixe ou carne magra)",\n        "1 concha (150g) de salada variada",\n        "1/2 concha (75g) de arroz integral",\n        "1/2 concha (75g) de feijao"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "nome": "Lanche da tarde",\n      "alimentos": [\n        "1 fatia de torrada integral",\n        "1 fatia de queijo magro",\n        "1 fruta (laranja ou morango)"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de salada variada",\n        "1 omelete com 2 ovos e legumes",\n        "1 fatia de pão integral"\n\n      ]\n    }\n  ],\n  "suplementos": [\n    "Proteina do soro do leite (whey protein)",\n    "Creatina (opcional, consultar profissional)"\n  ]\n}\n```\n';

    try {
      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/n```/g, "")
        .trim();

      let jsonObject = JSON.parse(jsonString);
      return reply.send({ data: jsonObject });
    } catch (error) {
      console.log(error);
    }

    reply.send({ ok: true });
  });

  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply);
    }
  );
}
