from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import employees, attendance

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import Request

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
async def startup():
    from app.database import create_indexes
    await create_indexes()




@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    message = exc.errors()[0]["msg"]
    return JSONResponse(
        status_code=422,
        content={"detail": message},
    )

app.include_router(employees.router, prefix="/employees", tags=["Employees"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])

