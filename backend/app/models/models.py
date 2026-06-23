from sqlalchemy import Column, Integer, String, Float, Date, JSON, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    user_id = Column(Integer, primary_key=True, index=True)
    height_cm = Column(Float)
    weight_kg = Column(Float)
    age = Column(Integer)
    gender = Column(String)
    bmr = Column(Float)
    tdee = Column(Float)

    telemetry_logs = relationship("DailyTelemetryLog", back_populates="user")

class DailyTelemetryLog(Base):
    __tablename__ = "daily_telemetry_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user_profiles.user_id"))
    log_date = Column(Date)
    steps_walked = Column(Integer)
    calories_consumed = Column(Float)
    calories_burned_active = Column(Float)
    workout_completed = Column(Integer) # Boolean-like or count
    complexity = Column(Integer, default=1) # 1: Daily, 2: Weekly, 3: Milestone
    is_milestone = Column(Integer, default=0) # 0: False, 1: True
    bottlenecks = Column(JSON) # e.g., {"fatigue": true, "time_constraint": false}

    user = relationship("UserProfile", back_populates="telemetry_logs")

class GoalAdaptationRecord(Base):
    __tablename__ = "goal_adaptation_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user_profiles.user_id"))
    goal_name = Column(String)
    old_strategy = Column(JSON)
    new_strategy = Column(JSON)
