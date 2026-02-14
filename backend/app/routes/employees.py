from fastapi import APIRouter, HTTPException
from app.database import db
from app.schemas import EmployeeCreate
from pymongo.errors import DuplicateKeyError

router = APIRouter()

@router.post("/")
async def create_employee(emp: EmployeeCreate):
    try:
        await db.employees.insert_one(emp.dict())
        return {"message": "Employee created"}
    except DuplicateKeyError:
        raise HTTPException(
            status_code=400,
            detail="Employee ID already exists"
        )


@router.get("/")
async def list_employees():
    employees = []

    async for e in db.employees.find().sort("employee_id", 1):
        e["_id"] = str(e["_id"])
        employees.append(e)

    return employees


@router.delete("/{employee_id}")
async def delete_employee(employee_id: str):
    result = await db.employees.delete_one({"employee_id": employee_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Deleted"}
