from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import models
from ..schemas import schemas
from ..services.ai_engine import check_trigger_condition, get_ai_improvisation

router = APIRouter(prefix="/telemetry", tags=["telemetry"])

@router.post("/", response_model=schemas.DailyTelemetryLog)
async def log_telemetry(log: schemas.DailyTelemetryLogCreate, db: Session = Depends(get_db)):
    db_log = models.DailyTelemetryLog(**log.model_dump())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)

    # Check for AI trigger
    user_logs = db.query(models.DailyTelemetryLog).filter(models.DailyTelemetryLog.user_id == log.user_id).order_by(models.DailyTelemetryLog.log_date.desc()).limit(7).all()
    if check_trigger_condition(user_logs[::-1]):
        # In a real app, this might trigger a notification or set a flag
        print(f"AI Adaptation Triggered for user {log.user_id}")

    return db_log

@router.get("/{user_id}", response_model=List[schemas.DailyTelemetryLog])
def get_user_telemetry(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.DailyTelemetryLog).filter(models.DailyTelemetryLog.user_id == user_id).all()
