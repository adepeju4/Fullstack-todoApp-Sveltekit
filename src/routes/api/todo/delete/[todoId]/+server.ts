import type { RequestHandler } from "@sveltejs/kit";
import { catchAsync } from "../../../../../hooks.server";
import { Todo } from "../../../../../sequelize/models/todo.model";
import { UserError } from "../../../../../utils/ErrorHandler";
import { sendSvelteKitResponse } from "../../../../../utils/sendResponse";


export const DELETE: RequestHandler = catchAsync( async ({ params }) => {
    const { todoId } = params;

    if (typeof todoId !== "string" || !todoId) throw new UserError("No todoId or Invalid todoId");

    const todo = await Todo.findByPk(todoId);
    if (!todo) throw new Error("Not Found");

    await todo.destroy();

   return sendSvelteKitResponse({
    statusCode: 200,
    message: "Success"
   })
  });