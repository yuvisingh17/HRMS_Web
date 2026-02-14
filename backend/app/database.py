from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
db = client.hrms

async def create_indexes():
    await db.employees.create_index("employee_id", unique=True)

    await db.attendance.create_index(
        [("employee_id", 1), ("date", 1)],
        unique=True
    )
