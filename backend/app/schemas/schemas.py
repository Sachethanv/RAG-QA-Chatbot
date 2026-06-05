from pydantic import BaseModel, ConfigDict
from datetime import date
from typing import Optional, Dict, Any, List

class UserProfileBase(BaseModel):
    height_cm: float
    weight_kg: float
    age: int
    gender: str

class UserProfileCreate(UserProfileBase):
    pass

class UserProfile(UserProfileBase):
    user_id: int
    bmr: float
    tdee: float

    model_config = ConfigDict(from_attributes=True)

class DailyTelemetryLogBase(BaseModel):
    log_date: date
    steps_walked: int
    calories_consumed: float
    calories_burned_active: float
    workout_completed: int
    complexity: int = 1
    is_milestone: int = 0
    bottlenecks: Dict[str, Any]

class DailyTelemetryLogCreate(DailyTelemetryLogBase):
    user_id: int

class DailyTelemetryLog(DailyTelemetryLogBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)

class GoalAdaptationRecordBase(BaseModel):
    goal_name: str
    old_strategy: Dict[str, Any]
    new_strategy: Dict[str, Any]

class GoalAdaptationRecordCreate(GoalAdaptationRecordBase):
    user_id: int

class GoalAdaptationRecord(GoalAdaptationRecordBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)
