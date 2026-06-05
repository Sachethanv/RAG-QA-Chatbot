from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import models
from ..schemas import schemas
from ..services.ai_engine import get_ai_improvisation

router = APIRouter(prefix="/goals", tags=["goals"])

@router.get("/adapt/{user_id}/{goal_name}")
async def adapt_goal(user_id: int, goal_name: str, db: Session = Depends(get_db)):
    user = db.query(models.UserProfile).filter(models.UserProfile.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    logs = db.query(models.DailyTelemetryLog).filter(models.DailyTelemetryLog.user_id == user_id).order_by(models.DailyTelemetryLog.log_date.desc()).limit(7).all()

    bio_profile = {"age": user.age, "weight": user.weight_kg, "height": user.height_cm, "gender": user.gender}
    telemetry_trend = [{"date": str(l.log_date), "workout": l.workout_completed} for l in logs]
    bottlenecks = logs[0].bottlenecks if logs else {}

    adaptation = await get_ai_improvisation(goal_name, bio_profile, telemetry_trend, bottlenecks)

    # Optionally log the adaptation record
    # ...

    return adaptation
