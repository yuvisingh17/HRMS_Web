from fastapi import APIRouter, HTTPException
from app.database import db
from app.schemas import AttendanceCreate
from datetime import datetime
from pymongo.errors import DuplicateKeyError

router = APIRouter()

@router.post("/")
async def mark_attendance(data: AttendanceCreate):
    # check employee exists
    emp = await db.employees.find_one({"employee_id": data.employee_id})
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    doc = data.dict()
    doc["date"] = datetime.combine(doc["date"], datetime.min.time())

    try:
        await db.attendance.insert_one(doc)
        return {"message": "Attendance marked"}
    except DuplicateKeyError:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this date"
        )


@router.get("/{employee_id}")
async def get_attendance(employee_id: str):
    records = []

    # sort newest first → better UX
    async for r in db.attendance.find(
        {"employee_id": employee_id}
    ).sort("date", -1):

        r["_id"] = str(r["_id"])
        records.append(r)

    return records
