import { NextResponse } from "next/server";
import {
  validatePostRequest,
} from '../../../utils/validation';
import StorageManager from '../../../storage/StorageManager';


export async function POST(request) {
  let body = null;

  // Validation
  try {
    body = await request.json();
    if (!validatePostRequest(body))
      throw new Error();
  } catch (e) {
    return NextResponse.json({
      error: "Invalid request",
    }, {
      status: 400,
    });
  }

  // Generate new ID and save
  const storageManager = new StorageManager();
  const newInvoiceId = await storageManager.getNextId();
  
  await storageManager.appendInvoice({
    id: newInvoiceId,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    data: body.data,
  });

  return NextResponse.json({
    id: newInvoiceId,
  }, {
    status: 200,
  });

}
